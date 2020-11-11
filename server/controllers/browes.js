const browesModel = require('../models/browes')

exports.getList = async (req, res) => {
    try {
      const users = await browesModel.getList(req.params.id)
      res.status(200).send({users: users});
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};