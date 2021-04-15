const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const connection = require('./bd')

const cors = require('cors')

const routes = require('./routes')

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  connection.query('select * from usuario', function(err, result){
    res.send(result)
    
    if (err) console.log(err);
  })

})

app.listen(port, () => {
  console.log(`Rodando em: http://localhost:${port}`)
})