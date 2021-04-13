const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const mysql = require('mysql');


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "BDe123",
    database: "web1"
  });

  con.query('select * from usuario', function(err, result){
    res.send(result)
    
    if (err) console.log(err);
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})