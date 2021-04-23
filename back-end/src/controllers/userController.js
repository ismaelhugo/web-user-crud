const connection = require('../bd');
var bcrypt = require('bcryptjs');
import resources from '../resources';

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
                message: 'Dados incompletos',
                response: null
            })

        } else {
            /* Email */
            const valid_email = await resources.check_valid_email(newUser.email); // validar email
            const email_found = resources.find_email(newUser.email); // verificar se o email é único

            if (!valid_email || email_found == true) {
                console.log(`valid_email: ${valid_email} || email_found: ${email_found} `)
                return res.status(400).send({
                    message: 'Email inválido',
                    response: null
                })
            } else {
                console.log(`else`)
                /* Senha */
                const valid_password = await resources.passwordValidation(info.password) // validar senha
                let hashPassword = '';

                if (!valid_password) {
                    return res.status(400).send({
                        message: 'Senha inválida',
                        response: null
                    })
                } else {
                    // passando a senha para Hash
                    if (info.password !== '') {
                        hashPassword = await bcrypt.hash(info.password, 10)
                    }
                }

                console.log(`hash: ${hashPassword}`);

                /* Telefone */
                const valid_phone = resources.phoneValidation(info.phone) // validar telefone 

                if (!valid_phone) {
                    return res.status(400).send({
                        message: 'Telefone inválido',
                        response: null
                    })
                } else {
                    /* Data de Nascimento */
                    const valid_birthdate = resources.birthdateValidation(info.birthdate) // validar data de nascimento 

                    if (!valid_birthdate) {
                        return res.status(400).send({
                            message: 'Data de Nascimento inválida',
                            response: null
                        })
                    } else {
                        /* CPF */
                        const valid_cpf = resources.cpfValidation(newUser.cpf) // validar cpf
                        const find_cpf = resources.cpfAlreadyExists(newUser.cpf) // verificar se o cpf é único

                        if (!valid_cpf || find_cpf) {
                            return res.status(400).send({
                                message: 'CPF inválido',
                                response: null
                            })

                        } else {
                            // se chegou até aqui, todos os dados são válidos e eu posso criar o usuário
                            connection.query('INSERT INTO usuario (nome, email, senha, fone, data_nasc, cpf ) VALUES (?, ?, ?, ?, ?, ?)',
                                [newUser.name, newUser.email, hashPassword, newUser.phone, newUser.birthdate, newUser.cpf],
                                (err, result) => {
                                    if (err) {
                                        return res.status(500).send({
                                            error: err,
                                            response: null
                                        })
                                    }

                                    return res.status(201).send({
                                        message: 'Criado com sucesso',
                                        response: result
                                    })
                                }
                            )
                        }

                    }
                }
            }
        }
    } catch (error) {
        return res.status(500).send({
            error: error,
            message: 'Erro ao criar usuário',
            response: null
        })
    }
}

// Listar usuários
const list = async function (req, res) {
    const { name } = req.params

    // Se não tem a query, nome = all retorna o Nome e o Email de todos os usuarios
    if (!name || name == 'all') {
        connection.query('SELECT nome, email FROM usuario', function (err, result) {
            if (err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }

            res.json(result)
        })

    } else {
        // se tem query, retorna o Nome e o Email dos usuarios que tem essa query name
        connection.query('SELECT nome, email FROM usuario WHERE nome LIKE ? ORDER BY nome',
            (`%${name}%`),
            function (err, result) {
                if (err) {
                    return res.status(500).send({
                        error: err,
                        response: null
                    })
                }

                if (!result) {
                    return res.status(400).send({
                        message: 'Nenhum usuário encontrado'
                    })
                } else {
                    return res.status(200).json(result)
                }
            }
        )
    }
}

// Editar Perfil
const updateProfile = async function (req, res) {
    try {
        const info = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone,
            birthdate: req.body.birthdate,
            cpf: req.body.cpf,
        }

        let updated = false

        /* *TO-DO* a gente precisa fazer a questão da sessão, pq precisamos saber qual o user que está sendo atualizado,
            ou seja, pegar a ID do usuario. podemos pegar pela url alguma coisa que não seja sensível (acho que a id do usário
            não tem problema)
        */

        /* Nome */
        if (info.name && info.name != ' ') {
            // tirar os caracteres especiais
            let name = info.name.toString().replace(/\D/g, '')

            connection.query('UPDATE usuario SET nome = (?) WHERE id_usuario = (?)',
                [name],
                (err, result) => {
                    if (err) {
                        return res.status(500).send({
                            error: err,
                            response: null
                        })
                    }

                    // se chegou até aqui, atualizou o usuário!
                    updated = true
                }
            )
        }

        /* Email */
        if (info.email && info.email != ' ') {
            // validação do email
            const valid_email = resources.emailValidation(info.email)

            const find_email = resources.emailAlreadyExists(info.email)

            if (valid_email || !find_email) {
                connection.query('UPDATE usuario SET email = (?) WHERE id_usuario = (?)',
                    [info.email],
                    // [ID do usuario],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        }

                        // se chegou até aqui, atualizou o usuário!
                        updated = true
                    }
                )

            } else {
                return res.status(400).send({
                    message: 'Email inválido'
                })
            }
        }

        /* Senha */
        if (info.password && info.password != ' ') {
            // validação da senha
            const valid_password = resources.passwordValidation(info.password)

            if (valid_password) {
                // passar a senha para Hash
                let hashPassword;
                if (info.password !== '') {
                    hashPassword = await bcrypt.hash(info.password, 10)
                }

                connection.query('UPDATE usuario SET senha = (?) WHERE id_usuario = (?)',
                    [hashPassword],
                    // [ID do usuario],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        }

                        // se chegou até aqui, atualizou o usuário!
                        updated = true
                    }
                )

            } else {
                return res.status(400).send({
                    message: 'Senha inválida'
                })
            }
        }

        /* Telefone */
        if (info.phone && info.phone != ' ') {
            // validação do telefone
            const valid_phone = resources.phoneValidation(info.phone)

            if (valid_phone) {
                connection.query('UPDATE usuario SET fone = (?) WHERE id_usuario = (?)',
                    [info.phone],
                    // [ID do usuario],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        }

                        // se chegou até aqui, atualizou o usuário!
                        updated = true
                    }
                )

            } else {
                return res.status(400).send({
                    message: 'Telefone inválido'
                })
            }
        }

        /* Data de Nascimento */
        if (info.birthdate && info.birthdate != ' ') {
            // validação da data de nascimento
            const valid_birthdate = resources.birthdateValidation(info.birthdate)

            if (valid_birthdate) {
                connection.query('UPDATE usuario SET data_nasc = (?) WHERE id_usuario = (?)',
                    [info.birthdate],
                    // [ID do usuario],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        }

                        // se chegou até aqui, atualizou o usuário!
                        updated = true
                    }
                )

            } else {
                return res.status(400).send({
                    message: 'Data de Nascimento inválida'
                })
            }
        }

        /* CPF */
        if (info.cpf && info.cpf != ' ') {
            // validação do cpf
            const valid_cpf = resources.cpfValidation(info.cpf)

            // verificar no bd se o cpf já existe no bd
            const find_cpf = resources.cpfAlreadyExists(info.cpf)

            if (valid_cpf && !find_cpf) {
                // cpf é válido e não existe no bd
                connection.query('UPDATE usuario SET cpf = (?) WHERE id_usuario = (?)',
                    [info.cpf],
                    // [ID do usuario],
                    (err, result) => {
                        if (err) {
                            return res.status(500).send({
                                error: err,
                                response: null
                            })
                        }

                        // se chegou até aqui, atualizou o usuário!
                        updated = true
                    }
                )

            } else {
                return res.status(400).send({
                    message: 'O cpf inserido não é válido'
                })
            }
        }


        if (updated) {
            return res.status(200).send({
                error: null,
                message: 'Atualizado com sucesso',
                response: null
            })
        }

    } catch (error) {
        return res.status(500).send({
            error: error,
            message: 'Erro ao atulaizar usuário'
        })
    }
}

// Login
const login = async function (req, res) {

    var email = req.body.email
    var senha = req.body.senha

    if (email && senha) {
        connection.query('SELECT * FROM usuario WHERE email = ?', [email], function (err, results, fields) {
            console.log(results)
            if (results[0].senha) {
                bcrypt.compare(senha, results[0].senha, function (error, result) {
                    if (result) {
                        return res.send(results[0]);
                    }
                    else {
                        return res.status(400).send({
                            "mensagem": "Nenhum usuario encontrado com essas credenciais"
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

export { list, updateProfile, createUser, login }
