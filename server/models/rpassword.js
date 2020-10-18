const connection = require("../config/database");
const crypto = require("crypto");

const checkEmailForReset = async function (log) {
  const query = "select * from users where `email` = ?";
  let following = await connection.query(query, [log]);
  if (following.length > 0 && following) return true;
  return false;
};

const rpassword = async function (req, res) {
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

module.exports = { rpassword, checkEmailForReset };