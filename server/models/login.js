const connection = require("../config/database");
const config = require("../config/config");
// var express = require("express");
// var session = require("express-session");
var jwt = require('jsonwebtoken');
// var bodyParser = require("body-parser");
var crypto = require("crypto");
const { json } = require("express");
// var app = express();


// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

function jwtSignUser (user) {
  const ONE_WEEk = 60 * 60 * 24 * 7
  // console.log(user);
  const token = jwt.sign(JSON.parse(user), config.authentication.jwtSecret, {
    expiresIn: ONE_WEEk
  })
  // console.log(token)
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
        // console.log(result);
        var token = jwtSignUser(result);
        // console.log(result, token);
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