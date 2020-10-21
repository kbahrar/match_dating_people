const fp = require('../models/fillProfile');
const policies = require('../middleware/register');

exports.fillProfile = async (req, res, next) => {
  try {
    // console.log(req.body.user.gender)
    var check = policies.checkFillProfile(req.body);
    if (check !== 'OK')
        throw check;
    await fp.fill(req.body, res);
    // console.log('ops');
    // console.log(respo);
    res.status(200).json({ success: true, msg: "Account completed successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
};