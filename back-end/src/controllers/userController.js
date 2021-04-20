const connection = require('../bd')
const bcrypt = require('bcrypt')

const create = async function (req, res) {

    const usuario = {
        nome: req.body.nome,
        email: req.body.email,
        senha: await bcrypt.hash(req.body.senha, 10),
        fone: req.body.fone,
        data_nasc: req.body.data_nasc,
        cpf: req.body.cpf
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
                mensagem: 'Criado com sucesso'
            })
        })
}

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

const list = async function (req, res) {
    connection.query('select * from usuario', function (err, result) {
        res.json(result)
    })
}

export { create, login, list }