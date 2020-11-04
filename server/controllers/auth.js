const authModel = require("../models/auth")
const utils = require("../utils/auth")
const policies = require("../middleware/register");

exports.Login = async (req, res) => {
  try {
    if (!req.body.log || !req.body.password) throw 'fill all fields';
    if (!policies.checkLogin(req.body.login)) throw 'invalid login';
    if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
    var flag = await authModel.login(req.body);
    if (!flag) throw "login or password incorrect !";
    res.send(flag);
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
};

exports.CreateUser = async (req, res) => {
    try {
      if (!policies.checkNull(req.body)) throw 'full all fields !';
      if (!policies.checkLogin(req.body.login)) throw 'invalid login';
      if (!policies.checkFirstName(req.body.firstName)) throw 'invalid first name';
      if (!policies.checkLastName(req.body.lastName)) throw 'invalid last name';
      if (!policies.checkMail(req.body.email)) throw 'invalid email';
      if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
      let flag = await utils.checkLogin(req.body.login);
      let flag1 = await utils.checkEmail(req.body.email);
      if (!flag1) throw 'email allready exists ! Choose another one';
      if (!flag) throw 'login allready exists ! Choose another one';
      await authModel.register(req.body, res);
      res.status(200).json({ success: true, msg: "Account created successfully !" });
    }
    catch (err) {
      res.status(400).send({
      error: err
      });
    }
};

exports.Rpassword = async (req, res) => {
    try {
        if (!policies.checkMail(req.body.email)) throw "invalid Email !";
        let flag = await utils.checkEmail(req.body.email);
        if (flag) throw "email Does not exist ! try again";
        await authModel.rpassword(req.body, res);
        res.status(200).json({ success: true, msg: "Password reset email sent successfully !" });
    } catch (err) {
        res.status(400).send({
          error: err,
        });
    }
};