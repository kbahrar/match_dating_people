const cr = require('../models/register');
const policies = require('../middleware/register');

exports.CreateUser = async (req, res, next) => {
  try {
    if (!policies.checkNull(req.body)) throw 'Please fix all the errors before proceeding!';
    if (!policies.checkMail(req.body.email)) throw 'invalid password';
    if (!policies.checkPwd(req.body.password)) throw 'invalid password !';
    let flag = await cr.checkLogin(req.body.login);
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