const mysql = require("mysql");
const { promisify } = require('util');
const config = require("../config/config");
// connection to mysql database
let connection = mysql.createConnection({
  host: config.db.host,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
});

// check database connection erreurs
connection.connect(function (err) {
  if (err) console.log('something went wrong in database !');
  else console.log("Mysql Database Connected!");
});

connection.query = promisify(connection.query);
module.exports = connection;