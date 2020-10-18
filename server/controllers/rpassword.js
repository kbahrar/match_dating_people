const cr = require("../models/rpassword");

exports.Rpassword = async (req, res, next) => {
  try {
    if (!policies.checkNull(req.body)) throw "full all fields !";
    if (!policies.checkMail(req.body.email)) throw "invalid password";
    let flag = await cr.checkEmailForReset(req.body.email);
    if (!flag) throw "email Does not exist ! try again";
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
