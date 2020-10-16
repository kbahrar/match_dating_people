const mysql = require("mysql");
const { promisify } = require('util');

//connection to mysql database
// let connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "root",
//   database: "matcha_db",
// });
var pool = mysql.createPool({
  connectionLimit: 5,
  host: 'localhost',
  user: 'root',
  password: 'root', 
  database: 'matcha_db'
});

//check database connection erreurs
// connection.connect(function (err) {
//   if (err) throw err;
//   console.log("Mysql Database Connected!");
// });
pool.getConnection((err, connection) => {
	if (err) {
		switch (err.code) {
			case 'PROTOCOL_CONNECTION_LOST':
				console.log('Database connection was closed.')
				break
			case 'ER_CON_COUNT_ERROR':
				console.log('Database has too many connections.')
				break
			case 'ECONNREFUSED':
				console.log('Database connection was refused.')
				break
		}
	}
	if (connection) connection.release()
	return
})

pool.query = promisify(pool.query);
module.exports = pool;
