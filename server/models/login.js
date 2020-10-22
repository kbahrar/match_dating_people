const connection = require("../config/database");
const config = require("../config/config");
var jwt = require('jsonwebtoken');
var crypto = require("crypto");

function jwtSignUser (user) {
  const ONE_WEEk = 60 * 60 * 24 * 7
  const token = jwt.sign(JSON.parse(user), config.authentication.jwtSecret, {
    expiresIn: ONE_WEEk
  })
  return token
}

const login = async function (req, res) {
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


module.exports = login;