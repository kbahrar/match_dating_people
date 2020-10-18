const cr = require("../models/rpassword");
const policies = require("../middleware/register");

exports.Rpassword = async (req, res, next) => {
  try {
    console.log(req.body.email);
    if (!policies.checkMail(req.body.email)) throw "invalid Email !";
    let flag = await cr.checkEmailForReset(req.body.email);
    if (!flag) throw "email Does not exist ! try again";
    console.log('ops');
    await cr.rpassword(req.body, res);
    res
      .status(200)
      .json({ success: true, msg: "Password reset email sent successfully !" });
  } catch (err) {
    res.status(400).send({
      error: err,
    });
  }
};
