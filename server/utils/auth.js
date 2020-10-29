const connection = require("../config/database");

exports.checkLogin = async function (log) {
    const query = "select * from users where `login` = ?";
    let following = await connection.query(query, [log]);
    if (following.length > 0 && following)
      return false;
    return true;
  }
  
exports.checkEmail = async function (log) {
    const query = "select * from users where `email` = ?";
    let following = await connection.query(query, [log]);
    if (following.length > 0 && following)
        return false;
    return true;
}