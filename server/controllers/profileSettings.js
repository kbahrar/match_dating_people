const fp = require('../models/profileSettings');
const policies = require('../middleware/profileSettings');


exports.updateinformations= async (req, res, next) => {
    try {
      var check = policies.checkUpdateInformations(req.body);
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