const connection = require('../bd')

const list = async function (req, res) {
    connection.query('select * from usuario', function(err, result){
        res.json(result)
    })
}

const create = async function (req, res) {

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
        if(err){
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

export { list, create }