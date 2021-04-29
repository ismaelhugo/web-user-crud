const connection = require('../bd');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const tokenSecret = process.env.TOKEN_SECRET;

import resources from '../resources';

function vPassword(password, passwordConfirm) {
    if (password.length >= 5 && password === passwordConfirm) {
        return true
    }
}

// Criar Usuário
const createUser = async function (req, res) {
    try {
        const newUser = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            birthdate: req.body.birthdate,
            cpf: req.body.cpf,
        };

        if (!newUser.name || !newUser.email || !newUser.password || !newUser.phone || !newUser.birthdate || !newUser.cpf) {
            return res.status(400).send({
                message: 'Dados incompletos.',
                response: null
            })

        } else {
            /* Senha */
            // validar senha ->  precisa ter pelo menos 5 caracteres
            const valid_password = ((newUser.password).toString().length >= 5);
            let hashPassword = '';

            if (!valid_password) {
                return res.status(400).send({
                    message: 'Senha inválida.',
                    response: null
                })

            }

            // a senha é válida! passar a senha para Hash:
            hashPassword = await bcrypt.hash(newUser.password, 10);
            console.log(`hash: ${hashPassword}`);

            /* Email */
            // validar email
            const valid_email = await resources.emailValidation(newUser.email);
            if (!valid_email) {
                return res.status(400).send({
                    message: 'E-mail inválido.'
                });

            } else {
                // se o email é válido, eu verifico se o email é único

                // por fins de segurança, eu não pego nenhum dado do usuario, a não ser o email
                connection.query('SELECT email FROM usuario WHERE email = (?)',
                    [newUser.email],
                    (err, found_email) => {

                        if (err) {
                            return res.status(500).send({
                                error: err,
                                message: 'Erro ao verificar a exclusividade do e-mail.'
                            });

                        } else {
                            if (found_email.length > 0) {
                                return res.status(400).send({
                                    message: 'O email já está cadastrado no sistema'
                                });
                            } else {
                                // o email é único

                                /* Telefone */
                                const valid_phone = resources.phoneValidation(newUser.phone) // validar telefone

                                if (!valid_phone) {
                                    return res.status(400).send({
                                        message: 'Telefone inválido.',
                                        response: null
                                    })

                                } else {
                                    /* Data de Nascimento */
                                    const valid_birthdate = resources.birthdateValidation(newUser.birthdate) // validar data de nascimento 

                                    if (!valid_birthdate || valid_birthdate == '') {
                                        return res.status(400).send({
                                            message: 'Data de Nascimento inválida.',
                                            response: null
                                        })

                                    } else {
                                        /* CPF */
                                        // tirar outros caracteres, deixa só os números
                                        const cpf = newUser.cpf.toString().replace(/[^\d]+/g, '');

                                        const valid_cpf = resources.cpfValidation(cpf) // validar cpf

                                        if (!valid_cpf) {
                                            return res.status(400).send({
                                                message: 'CPF inválido.',
                                                response: null
                                            })

                                        } else {
                                            // se o cpf é válido, verifico se é único no banco
                                            // por fins de segurança, eu não pego nenhum dado do usuario, a não ser o cpf
                                            connection.query('SELECT cpf FROM usuario WHERE cpf = (?)',
                                                [cpf],
                                                (err, found_cpf) => {
                                                    if (err) {
                                                        return res.status(500).send({
                                                            error: err,
                                                            message: 'Erro ao verificar a exclusividade do cpf.'
                                                        })
                                                    } else {
                                                        if (found_cpf.length > 0) {
                                                            return res.status(400).send({
                                                                message: 'O cpf já está cadastrado no sistema.'
                                                            })
                                                        } else {
                                                            // se chegou até aqui, todos os dados são válidos e eu posso criar o usuário
                                                            connection.query('INSERT INTO usuario (nome, email, senha, fone, data_nasc, cpf) VALUES (?, ?, ?, ?, ?, ?)',
                                                                [newUser.name, newUser.email, hashPassword, newUser.phone, valid_birthdate, cpf],
                                                                (err, result) => {
                                                                    if (err) {
                                                                        return res.status(500).send({
                                                                            error: err
                                                                        })
                                                                    } else {
                                                                        return res.status(201).json({
                                                                            message: 'Criado com sucesso',
                                                                            response: result,
                                                                        })
                                                                    }
                                                                }
                                                            )
                                                        }
                                                    }
                                                }
                                            )
                                        }
                                    }
                                }
                            }
                        };
                    }
                );
            }
        }

    } catch (error) {
        return res.status(500).send({
            error: error,
            message: 'Erro ao criar usuário.',
            response: null
        })
    }
}

// Listar usuários
const list = async function (req, res) {
    const { name } = req.params

    // Se não tem a query, nome = all retorna o Nome e o Email de todos os usuarios
    if (!name || name == 'all') {
        connection.query('SELECT nome, email, data_nasc FROM usuario', function (err, result) {
            if (err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }

            if (result.length == 0 || !result) {
                return res.status(400).send({
                    message: 'Nenhum usuário encontrado.'
                })

            } else {
                let i = 0;
                let fullResult = [];
                let date = new Date
                let currentYear = parseInt(date.getFullYear());

                for (i == 0; i < result.length; i++) {
                    let obj;

                    let birth = result[i].data_nasc
                    console.log(`result[i].data_nasc: ${result[i].data_nasc}`)

                    let birthYear = parseInt(birth.getFullYear());

                    console.log(`birthYear: ${birthYear}`)

                    let age = (currentYear - birthYear);

                    console.log(`age: ${age}`)

                    obj = {
                        nome: result[i].nome,
                        email: result[i].email,
                        idade: age,
                    }

                    fullResult.push(obj)
                    console.log(`obj: ${obj}`)
                }

                return res.json(fullResult);

            }
        })

    } else {
        // se tem query, retorna o Nome e o Email dos usuarios que tem essa query name
        connection.query('SELECT nome, email, data_nasc FROM usuario WHERE nome LIKE ? ORDER BY nome',
            (`%${name}%`),
            function (err, result) {
                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }

                console.log(`result: ${result.length}`)

                if (result.length == 0 || !result) {
                    return res.status(400).send({
                        message: 'Nenhum usuário encontrado.'
                    })

                } else {
                    let i = 0;
                    let fullResult = [];
                    let date = new Date
                    let currentYear = parseInt(date.getFullYear());

                    for (i == 0; i < result.length; i++) {
                        let obj;

                        let birth = result[i].data_nasc
                        console.log(`result[i].data_nasc: ${result[i].data_nasc}`)

                        let birthYear = parseInt(birth.getFullYear());

                        console.log(`birthYear: ${birthYear}`)

                        let age = (currentYear - birthYear);

                        console.log(`age: ${age}`)

                        obj = {
                            nome: result[i].nome,
                            email: result[i].email,
                            idade: age,
                        }

                        fullResult.push(obj)
                        console.log(`obj: ${obj}`)
                    }

                    return res.json(fullResult);
                }
            }
        )
    }
}

// Atualizar Usuário (sem senha)
const updateUser = async function (req, res) {
    try {
        const { userID } = req.params;

        const newInfo = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            birthdate: req.body.birthdate,
            cpf: req.body.cpf,
        }

        /* Nome */
        if (newInfo.name && newInfo.name != null && typeof newInfo.name != undefined) {
            console.log(`atualizar nome`);
            connection.query('UPDATE usuario SET nome = (?) WHERE id_usuario = (?)',
                [newInfo.name, userID],
                (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            error: err,
                            message: 'Erro ao atualizar o nome.'
                        })

                    } else {
                        console.log(`atualizou o nome!`)
                    }
                }
            )
        }

        /* Email */
        if (newInfo.email && newInfo.email != null && typeof newInfo.email != undefined) {
            console.log(`atualizar email`);

            // validação do email
            const valid_email = await resources.emailValidation(newInfo.email);
            console.log(`valid_email: ${valid_email}`);

            if (!valid_email) {
                return res.status(400).send({
                    message: 'Email inválido'
                });

            } else {
                // o email é valido. agora, verificar se o email é único
                connection.query('SELECT email FROM usuario WHERE email = (?)',
                    [newInfo.email],
                    (err, found_email) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                message: 'Erro ao verificar a exclusividade do email'
                            })
                        } else {
                            if (found_email.length > 0) {
                                return res.status(400).send({
                                    message: 'O email já está cadastrado no sistema.'
                                })
                            }
                        }
                    }
                )

                // o email é válido e único. Agora, vou atualizar o usuário
                connection.query('UPDATE usuario SET email = (?) WHERE id_usuario = (?)',
                    [newInfo.email, userID],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        } else {
                            console.log(`atualizou o email!`);
                        }
                    }
                )
            }
        }

        /* Telefone */
        if (newInfo.phone && newInfo.phone != null && typeof newInfo.phone != undefined) {
            console.log(`atualizar telefone`);

            // validação do telefone
            const valid_phone = resources.phoneValidation(newInfo.phone);

            if (!valid_phone) {
                return res.status(400).send({
                    message: 'Telefone inválido',
                    response: null
                })

            } else {
                // o telefone é válido! Agora, atualizar o usuário
                connection.query('UPDATE usuario SET fone = (?) WHERE id_usuario = (?)',
                    [newInfo.phone, userID],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        } else {
                            console.log(`atualizou o telefone!`);
                        }
                    }
                )
            }
        }

        /* Data de Nascimento */
        if (newInfo.birthdate && newInfo.birthdate != null && typeof newInfo.birthdate != undefined) {
            console.log(`atualizar data de nascimento`);

            // verifica se a data é válida
            const valid_birthdate = resources.birthdateValidation(newInfo.birthdate);

            if (!valid_birthdate) {
                return res.status(400).send({
                    message: 'Data de Nascimento inválida',
                    response: null
                })
            } else {
                // data de nascimento é válida! Agora, atualizar o usuário
                connection.query('UPDATE usuario SET data_nasc = (?) WHERE id_usuario = (?)',
                    [valid_birthdate, userID],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        } else {
                            console.log(`atualizou a data de nascimento!`);
                        }
                    }
                )
            }
        }

        /* CPF */
        if (newInfo.cpf && newInfo.cpf != null && typeof newInfo.cpf != undefined) {
            console.log(`atualizar cpf`);

            // tirar outros caracteres, deixa só os números
            const cpf = newInfo.cpf.toString().replace(/[^\d]+/g, '');

            // validação do cpf
            const valid_cpf = resources.cpfValidation(cpf);

            if (!valid_cpf) {
                return res.status(400).send({
                    message: 'CPF inválido',
                    response: null
                })
            } else {
                // o cpf é válido! Agora, verificar se o cpf é único
                connection.query('SELECT cpf FROM usuario WHERE cpf = (?)',
                    [cpf],
                    (err, found_cpf) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                message: 'Erro ao verificar a exclusividade do cpf'
                            })
                        } else {
                            if (found_cpf.length > 0) {
                                return res.status(400).send({
                                    message: 'O cpf já está cadastrado no sistema.'
                                })
                            }
                        }
                    }
                )

                // o cpf é válido e único! atualizar usuário
                connection.query('UPDATE usuario SET cpf = (?) WHERE id_usuario = (?)',
                    [cpf, userID],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        } else {
                            console.log(`atualizou o cpf`);
                        }
                    }
                )
            }
        }

        res.status(200).send({
            mesasge: 'atualizado com sucesso'
        })

    } catch (error) {
        return res.status(500).send({
            error: error,
            message: 'Erro ao atualizar usuário.'
        })
    }
}

// Atualizar Senha
const updatePassword = async function (req, res) {
    try {
        const { userID } = req.params;

        const newPassword = req.body.pw
        const confirmPw = req.body.pwConfirm

        console.log(`new: ${newPassword}, conf: ${confirmPw}`);

        if (
            (newPassword && newPassword != null && typeof newPassword != undefined && newPassword != '')
            &&
            (confirmPw && confirmPw != null && typeof confirmPw != undefined && confirmPw != '')
        ) {
            const validPassword = vPassword(newPassword, confirmPw);

            if (!validPassword) {
                return alert('Senha inválda');

            } else {
                // senha válida
                let hashPassword = '';
                hashPassword = await bcrypt.hash(newPassword, 10);
                console.log(`hash: ${hashPassword}`);

                // atualizar o usuário
                connection.query('UPDATE usuario SET senha = (?) WHERE id_usuario = (?)',
                    [hashPassword, userID],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                message: 'Erro ao atualizar a senha.'
                            })

                        } else {
                            return res.status(200).send({
                                message: 'Atualizado com sucesso'
                            })
                        }
                    }
                )
            }

        } else {
            return res.status(400).send({
                message: "Todos os campos devem ser preenchidos"
            })
        }

    } catch (error) {
        return res.status(500).send({
            error: error,
            message: 'Erro ao atualizar a senha.'
        })
    }
}

// Login
const login = async function (req, res) {
    var email = req.body.email
    var password = req.body.password

    if (email && password) {
        connection.query('SELECT * FROM usuario WHERE email = ?', [email], function (err, results, fields) {
            if (results[0].senha) {
                bcrypt.compare(password, results[0].senha, function (error, result) {
                    if (result) {
                        jwt.sign({ userSecret: req.body.email }, tokenSecret, { expiresIn: '1800s' }, (err, generatedToken) => {
                            if (err) {
                                return res.status(500).send({
                                    error: err
                                })
                            } else {
                                let data = {
                                    nome: results[0].nome,
                                    email: results[0].email,
                                    fone: results[0].fone,
                                    cpf: results[0].cpf,
                                    data_nasc: results[0].data_nasc,
                                    id: results[0].id_usuario,
                                    token: generatedToken
                                }

                                return res.status(200).json(data)
                            }
                        })
                    }
                    else {
                        return res.status(400).send({
                            "mensagem": "Nenhum usuário encontrado com essas credenciais."
                        });
                    }
                })
            }
        });

    } else {
        res.send('Campos vazios');
        res.end();
    }
}

// Deletar Usuario
const deleteUser = async function (req, res) {
    let { id } = req.body

    connection.query('SELECT * FROM usuario WHERE id = ?', [id], function (err, results, fields) {
        console.log(results[0])
    })

}

export {
    list,
    createUser,
    login,
    updateUser,
    updatePassword,
    deleteUser
}
