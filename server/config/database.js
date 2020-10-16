const mysql = require("mysql");
const { promisify } = require('util');

// connection to mysql database
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "matcha_db",
});

// check database connection erreurs
connection.connect(function (err) {
  if (err) console.log('something went wrong in database !');
  else console.log("Mysql Database Connected!");
});

connection.query = promisify(connection.query);
module.exports = connection;