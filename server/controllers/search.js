const searchModel = require('../models/search')

exports.search = async (req, res) => {
    try {
      const users = await searchModel.search(req.body.info.id, req.body.search)
      res.status(200).send({users: users});
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};