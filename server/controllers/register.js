const cr = require('../models/register');
const policies = require('../middleware/register');

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