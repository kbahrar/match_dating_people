const fp = require('../models/fillProfile');
const policies = require('../middleware/register');

exports.fillProfile = async (req, res, next) => {
  try {
    console.log('h')
    var check = policies.checkFillProfile(req.body);
    if (check !== 'OK')
        throw check;
    check = await fp.fill(req.body, res);
    if (!check)
      throw 'something went wrong'
    res.status(200).json({ success: true, msg: "Account completed successfully !" });
  }
  catch (err) {
    res.status(400).send({
      error: err
    });
  }
};