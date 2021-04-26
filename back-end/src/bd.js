const mysql = require('mysql');

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "BDe123",
  database: "web1",
});

module.exports = connection;