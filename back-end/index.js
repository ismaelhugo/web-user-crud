const express = require('express');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json);

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "BDe:1RcS:uMG"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})