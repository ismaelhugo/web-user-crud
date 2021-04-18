const connection = require('../bd')
import resources from '../resources';

const create = async function (req, res) {
    // falta fazer a verificação dos dados

    const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: req.body.senha,
        fone: req.body.fone,
        data_nasc: req.body.data_nasc,
        cpf: req.body.cpf,
    }

    connection.query('INSERT INTO usuario (nome, email, senha, fone, data_nasc, cpf ) VALUES (?, ?, ?, ?, ?, ?)',
        [usuario.nome, usuario.email, usuario.senha, usuario.fone, usuario.data_nasc, usuario.cpf],
        (err, result) => {
            if (err) {
                return res.status(500).send({
                    error: err,
                    response: null
                })
            }

            res.status(201).send({
                mensagem: 'Criado com sucesso',
                response: result
            })
        })
}

// juntei aqui pra, se não tiver query, retornar todos os usuarios, e se tiver retorna o resultado dela
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

                res.status(200).json(result)
            })
    }
}

const editProfile = async function (req, res) {
    try {
        const info = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            fone: req.body.fone,
            data_nasc: req.body.data_nasc,
            cpf: req.body.cpf,
        }

        let updated = false

        /* *TO-DO* a gente precisa fazer a questão da sessão, pq precisamos saber qual o user que está sendo atualizado,
            ou seja, pegar a ID do usuario. podemos pegar pela url alguma coisa que não seja sensível (acho que a id do usário
            não tem problema)
        */
        // *TO-DO* em todos os ifs colocar a condição de "se for igual à info que já está no user"

        /* Nome */
        if (info.nome && info.nome != ' ') {
            // tirar os caracteres especiais
            let name = info.nome.toString().replace(/\D/g, '')

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

            if(valid_email) {
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
                res.status(400).send({
                    message: 'Email inválido'
                })
            }
        }

        /* Senha */
        if (info.senha && info.senha != ' ') {
            // validação da senha
            const valid_password = resources.passwordValidation(info.senha)
            
            if (valid_password) {
                // *TO-DO* passar para Hash

                connection.query('UPDATE usuario SET senha = (?) WHERE id_usuario = (?)',
                    [info.senha],
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
                res.status(400).send({
                    message: 'Senha inválida'
                })
            }
        }

        /* Telefone */
        if (info.fone && info.fone != ' ') {
            // validação do telefone
            const valid_phone = resources.phoneValidation(info.fone)

            if (valid_phone){
                connection.query('UPDATE usuario SET fone = (?) WHERE id_usuario = (?)',
                    [info.fone],
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
                res.status(400).send({
                    message: 'Telefone inválido'
                })
            }
        }

        /* Data de Nascimento */
        if (info.data_nasc && info.data_nasc != ' ') {
            // validação da data de nascimento
            const valid_birthdate = resources.birthdateValidation(info.data_nasc)

            if (valid_birthdate) {
                connection.query('UPDATE usuario SET data_nasc = (?) WHERE id_usuario = (?)',
                    [info.data_nasc],
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
                res.status(400).send({
                    message: 'Data de Nascimento inválida'
                })
            }
        }

        /* CPF */
        if (info.cpf && info.cpf != ' ') {
            // validação do cpf
            const valid_cpf = resources.cpfValidation(info.cpf)

            // verificar no bd se o cpf já existe (fazer uma função separada e importar aqui)
            const find_cpf = resources.cpfAlreadyExists(info.cpf)

            if (valid_cpf) {
                //se o cpf é válido, eu verifico se ele já existe no bd
                if (!find_cpf) {
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
                    res.status(400).send({
                        message: 'O cpf inserido já existe'
                    })
                }
                
            } else {
                res.status(400).send({
                    message: 'O cpf inserido não é válido'
                })
            }
        }

        // se o usuário foi atualizado, retorna o usuário
        if (updated) {
            res.status(200).send({
                mensagem: 'Atualizado com sucesso',
                /* *TO-DO* -> retornar o usuário atualizado
                    response:
                 */
            })
        }

    } catch (error) {
        return res.status(500).send(error)
    }
}

export { create, list, editProfile }