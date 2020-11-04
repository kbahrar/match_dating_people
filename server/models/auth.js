const connection = require("../config/database");
const config = require("../config/config");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
// const { delete } = require("../routes/auth");

function jwtSignUser (user) {
    const ONE_DAY = 60 * 60 * 24
    const token = jwt.sign(JSON.parse(user), config.authentication.jwtSecret, {
        expiresIn: ONE_DAY
    })
    return token
}
  
exports.login = async function (req, res) {
var log = req.log;
var password = crypto.createHash('whirlpool').update(req.password).digest('hex');;
if (log && password) {
    var result = await connection.query(
    "SELECT * FROM users WHERE login = ? AND password = ?",
    [log, password]);
    if (result.length > 0) {
        result = JSON.stringify(result[0]);
        var token = jwtSignUser(result);
        return {user: JSON.parse(result), token};
    }
    else {
        return false;
    }
} else {
    return false;
}
};

exports.register = async function (req, res) {
    var hash = crypto.createHash('whirlpool').update(req.password).digest('hex');
    const query1 = "insert into users(login, firstName, lastName, email, password) Values(?, ?, ?, ?, ?)";
    await connection.query(query1, [req.login, req.firstName, req.lastName, req.email, hash])
}
  
exports.rpassword = async function (req) {
    console.log(Date.now());
    var hash = crypto.createHash('whirlpool').update(Date.now().toString()).digest('hex');
    const query1 =
      "UPDATE users SET hash = ? where email = ?";
    await connection.query(
      query1,
      [hash, req.email],
      function (err, rows, fields) {
        if (err) return console.error(err.message);
      }
    );
};