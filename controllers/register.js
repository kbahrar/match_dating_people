const cr = require('../models/register');
const policies = require('../middleware/register');

exports.CreateUser = async (req, res) => {
  try {
    if (!policies.checkNull(req.body)) throw 'full all fields !';
    if (!policies.checkMail(req.body.email)) throw 'invalide email';
    if (!policies.checkPwd(req.body.password)) throw 'invalide password !';
    // console.log('hi');
    let flag = await cr.checkLogin(req.body.login);
    if (!flag) throw 'login exist ! Choose another one';
    await cr.register(req.body, res);
    res.status(200).send();
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
};