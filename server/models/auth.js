const connection = require("../config/database");
const config = require("../config/config");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
const { json } = require("express");

function jwtSignUser (user) {
    const ONE_DAY = 60 * 60 * 24
    const token = jwt.sign(JSON.parse(user), config.authentication.jwtSecret, {
        expiresIn: ONE_DAY
    })
    return token
}

exports.checkAccess = async function (id) {
    var qr = 'select * from users where id = ? and access = true'
    var check = await connection.query(qr, [id])
    if (check.length > 0)
        return true
    return false
}

exports.getIdFromToken = async function (token) {
    var qr = "select id from users where token = ?"
    var id = await connection.query(qr, [token])
    if (id.length > 0) {
        id = JSON.stringify(id[0])
        id = JSON.parse(id)
        id = parseInt(id.id)
        return id
    }
    else
        return 0
}

exports.activeAccount = async function (id, newToken) {
    var qr = 'update users set valid = true, token = ? where id = ?'
    await connection.query(qr, [newToken, id])
}

exports.checkAccessValid = async function (body) {
    var qr = "select * from users where login = ? AND access = true"
    var check = await connection.query(qr, [body.log])
    if (check.length <= 0)
        return -1
    qr = "select * from users where login = ? AND valid = true"
    check = await connection.query(qr, [body.log])
    if (check.length <= 0)
        return 0
    return 1
}

exports.login = async function (req, res) {
var log = req.log;
var password = crypto.createHash('whirlpool').update(req.password).digest('hex');;
if (log && password) {
    var result = await connection.query(
    "SELECT * FROM users WHERE login = ? AND password = ? AND access = true",
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

exports.register = async function (req, token) {
    var hash = crypto.createHash('whirlpool').update(req.password).digest('hex');
    const query1 = "insert into users(login, firstName, lastName, email, password, token) Values(?, ?, ?, ?, ?, ?)";
    await connection.query(query1, [req.login, req.firstName, req.lastName, req.email, hash, token])
}
  
exports.setToken = async function (email, token) {
    const query1 = "update users set hash = ? where email = ?";
    await connection.query(
      query1,
      [token, email],
    );
};

exports.checkResetPassword = async function (token) {
    const qr = "select id from users where hash = ?"
    var res = await connection.query(qr, [token])
    if (res.length > 0) {
        res = JSON.stringify(res[0])
        res = JSON.parse(res)
        return parseInt(res.id)
    }
    return false
}

exports.updatePassword = async function (id, password, newToken) {
    var hash = crypto.createHash('whirlpool').update(password).digest('hex');
    const query1 = "update users set password = ?, hash = ? where id = ?";
    await connection.query(
      query1,
      [hash, newToken, id],
    );
};