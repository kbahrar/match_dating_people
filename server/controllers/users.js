const usersModel = require('../models/users');
const policies = require('../middleware/register');

exports.fillProfile = async (req, res) => {
  try {
    console.log('h')
    var check = policies.checkFillProfile(req.body);
    if (check !== 'OK')
        throw check;
    check = await usersModel.fill(req.body, res);
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

exports.location = async (req, res) => {
  try {
    await usersModel.location(req.body)
  }
  catch (err) {
    res.status(400).send({
      error: err
    })
  }
}