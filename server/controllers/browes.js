const browesModel = require('../models/browes')

exports.getList = async (req, res) => {
    try {
      await browesModel.getList(req.params.id)
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};