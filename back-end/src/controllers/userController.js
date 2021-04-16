const connection = require('../bd')

const list = async function (req, res) {
    connection.query('select * from usuario', function(err, result){
        res.json(result)
    })
}

export { list }