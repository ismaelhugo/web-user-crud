const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "toor",
  database: "web"
});

module.exports = connection;