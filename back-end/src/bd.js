const mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "toor",
    database: "web"
  });

module.exports = connection;