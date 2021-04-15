const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')
const connection = require('./bd')
const cors = require('cors')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/listar-usuarios', (req, res) => {

  connection.query('select * from usuario', function(err, result){
    res.json(result)
  })

})

app.listen(port, () => {
  console.log(`Rodando em: http://localhost:${port}`)
})