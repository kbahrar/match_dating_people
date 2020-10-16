const connection = require("../config/database");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var app = express();


app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const login = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  if (email && password) {
    connection.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password],
      function (error, results, fields) {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.email = email;
          res.redirect("/index");
        } else {
        console.log("Incorrect email and/or Password!");
        }
        res.end();
      }
    );
  } else {
    console.log("Please enter email and Password!");
    res.end();
  }
};


module.exports = login;