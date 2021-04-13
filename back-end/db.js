module.exports = function(app) {
  var mysql = require('mysql');

  var con = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'BDe:1RcS:uMG',
    database: 'web1'
  });

  
}