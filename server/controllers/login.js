const log = require("../models/login");
const policies = require("../middleware/register");

exports.Login = async (req, res, next) => {
  try {
    if (!req.body.log || !req.body.password) throw 'full all fields';
    if (!policies.checkLogin(req.body.login)) throw 'invalid login';
    if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
    var flag = await log(req.body);
    console.log(flag);
    if (!flag) throw "login or password incorrect !";
    res.send(flag);
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
};