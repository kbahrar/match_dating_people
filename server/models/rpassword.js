const connection = require("../config/database");
const crypto = require("crypto");

const checkEmailForReset = async function (log) {
  const query = "select * from users where `email` = ?";
  let following = await connection.query(query, [log]);
  if (following.length == 1 && following) return true;
  return false;
};

const rpassword = async function (req, res) {
  try {
    const query1 =
      "insert into users(hash) Values(reset password working)";
    await connection.query(
      query1,
      [hash],
      function (err, rows, fields) {
        if (err) return console.error(err.message);
      }
    );
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
};

module.exports = { rpassword, checkEmailForReset };