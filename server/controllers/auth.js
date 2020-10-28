const log = require("../models/login");
const cr = require('../models/register');
const rp = require("../models/rpassword");
const policies = require("../middleware/register");

exports.Login = async (req, res, next) => {
  try {
    if (!req.body.log || !req.body.password) throw 'fill all fields';
    if (!policies.checkLogin(req.body.login)) throw 'invalid login';
    if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
    var flag = await log(req.body);
    // console.log(flag);
    if (!flag) throw "login or password incorrect !";
    res.send(flag);
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
};

exports.CreateUser = async (req, res, next) => {
    try {
        if (!policies.checkNull(req.body)) throw 'full all fields !';
        if (!policies.checkLogin(req.body.login)) throw 'invalid login';
        if (!policies.checkFirstName(req.body.firstName)) throw 'invalid first name';
        if (!policies.checkLastName(req.body.lastName)) throw 'invalid last name';
        if (!policies.checkMail(req.body.email)) throw 'invalid email';
        if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
        let flag = await cr.checkLogin(req.body.login);
        let flag1 = await cr.checkEmail(req.body.email);
        if (!flag1) throw 'email allready exists ! Choose another one';
        if (!flag) throw 'login allready exists ! Choose another one';
        await cr.register(req.body, res);
        res.status(200).json({ success: true, msg: "Account created successfully !" });
    }
    catch (err) {
        res.status(400).send({
        error: err
        });
    }
};

exports.Rpassword = async (req, res, next) => {
    try {
        console.log(req.body.email);
        if (!policies.checkMail(req.body.email)) throw "invalid Email !";
        let flag = await rp.checkEmailForReset(req.body.email);
        if (!flag) throw "email Does not exist ! try again";
        console.log('ops');
        await rp.rpassword(req.body, res);
        res
        .status(200)
        .json({ success: true, msg: "Password reset email sent successfully !" });
    } catch (err) {
        res.status(400).send({
        error: err,
        });
    }
};
