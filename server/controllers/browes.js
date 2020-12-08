const browesModel = require('../models/browes')

exports.getList = async (req, res) => {
    try {
      const users = await browesModel.getList(req.params.id)
      res.status(200).send({users: users});
    }
    catch (err) {
      // console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.like = async (req, res) => {
    try {
      await browesModel.like(req.body)
      res.status(200).send();
    }
    catch (err) {
      // console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.dislike = async (req, res) => {
  try {
    await browesModel.dislike(req.body)
    res.status(200).send();
  }
  catch (err) {
    // console.log(err.message || err)
    res.status(400).send({
      error: err.message || err
    });
  }
};

exports.seen = async (req, res) => {
    try {
      await browesModel.seen(req.body)
      console.log(req.body)
      res.status(200).send();
    }
    catch (err) {
      // console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.checkLike = async (req, res) => {
    try {
      // console.log('hi')
      const response = await browesModel.checkLike(req.params)
      res.status(200).send({check: response});
    }
    catch (err) {
      // console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};