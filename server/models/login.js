const connection = require("../config/database");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var app = express();


app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const login = async function (req, res) {
  var log = req.log;
  var password = crypto.createHash('whirlpool').update(req.password).digest('hex');;
  if (log && password) {
    var result = await connection.query(
      "SELECT * FROM users WHERE login = ? AND password = ?",
      [log, password]);
      if (result.length > 0) {
        console.log('ops');
        // req.session.loggedin = true;
        // req.session.login = log;
        return true;
      }
      else {
        return false;
      }
  } else {
    return false;
  }
};


module.exports = login;