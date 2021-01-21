const authModel = require("../models/auth")
const utils = require("../utils/auth")
const policies = require("../middleware/register");
const mail = require("../utils/mail")
const crypto = require("crypto");

exports.activer = async (req, res) => {
  try {
    if (!req.body.tok) throw 'token required !'
    var id = await authModel.getIdFromToken(req.body.tok);
    if (id == 0)
      throw 'invalide Token sent !'
    var token = crypto.createHash('SHA1').update(Date.now().toString()).digest('hex');
    await authModel.activeAccount(id, token)
    res.send({msg: 'your account active now you can log In !'});
  }
  catch (err) {
    res.status(400).send({
      error: err || err.message
    });
  }
};

exports.Login = async (req, res) => {
  try {
    if (!req.body.log || !req.body.password) throw 'fill all fields';
    if (!policies.checkLogin(req.body.log)) throw 'invalid login';
    if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
    var token = await authModel.login(req.body);
    if (!token) throw "login or password incorrect !";
    flag = await authModel.checkAccessValid(req.body)
    if (flag == -1)
      throw 'You can not get to your account any more !'
    if (flag == 0)
      throw 'You have to validate your account first we send you an email !'
    res.send(token);
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
      var token = crypto.createHash('SHA1').update(Date.now().toString()).digest('hex');
      await mail.sendEmail(req.body.email, token, 0)
      await authModel.register(req.body, token);
      res.status(200).json({ success: true, msg: "Account created successfully !" });
    }
    catch (err) {
      console.log(err || err.message)
      res.status(400).send({
        error: err
      });
    }
};

exports.Rpassword = async (req, res) => {
    try {
        if (!req.body.email) throw 'email required !'
        if (!policies.checkMail(req.body.email)) throw "invalid Email !";
        let flag = await utils.checkEmail(req.body.email);
        if (flag) throw "email Does not exist ! try again";
        var token = crypto.createHash('SHA1').update(Date.now().toString()).digest('hex');
        await authModel.setToken(req.body.email, token)
        await mail.sendEmail(req.body.email, token, 1)
        res.status(200).json({ success: true, msg: "Password reset email sent successfully !" });
    } catch (err) {
        res.status(400).send({
          error: err,
        });
    }
};

exports.updatePwd = async (req, res) => {
    try {
        if (!req.body.password || !req.body.token) throw 'info required !' 
        if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
        let flag = await authModel.checkResetPassword(req.body.token)
        if (!flag) throw "invalide token"
        var token = crypto.createHash('SHA1').update(Date.now().toString()).digest('hex');
        await authModel.updatePassword(flag, req.body.password, token)
        res.status(200).json({ success: true, msg: "Password updated successfully !" });
    } catch (err) {
        console.log(err || err.message)
        res.status(400).send({
          error: err,
        });
    }
};