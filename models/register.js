const connection = require('../config/database');
const crypto = require('crypto');

const checkLogin = async function (log) {
  const query = "select * from users where `login` = ?";
  let following = await connection.query(query, [log]);
  if (following[1].login)
    return false;
  return true;
}

const register = async function (req, res) {
  try {
    var hash = crypto.createHash('whirlpool').update(req.password).digest('hex');
    const query1 = "insert into users(login, firstName, lastName, email, password) Values(?, ?, ?, ?, ?)";
    await connection.query(query1, [req.login, req.firstName, req.lastName, req.email, hash], function (err, rows, fields) {
      if (err)
        return console.error(err.message);
    });
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
}

module.exports = {register, checkLogin};