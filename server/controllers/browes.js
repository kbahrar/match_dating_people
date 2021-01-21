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

exports.like = async (req, res) => {
    try {
      await browesModel.like(req.body)
      res.status(200).send();
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.dislike = async (req, res) => {
  try {
    if (!req.body.login || !req.body.liked)
      throw 'incomplet info !'
    await browesModel.dislike(req.body)
    res.status(200).send();
  }
  catch (err) {
    res.status(400).send({
      error: err.message || err
    });
  }
};

exports.checkreport = async (req, res) => {
    try {
      if (!req.body.login || !req.body.reporter)
        throw "incomplete info !"
      var check = await browesModel.checkReport(req.body)
      res.status(200).send({check: check});
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.block = async (req, res) => {
    try {
      if (!req.body.login || !req.body.user)
        throw "incomplete info !"
      var check = await browesModel.checkBlock(req.body)
      if (!check)
        throw "you are actually blocked this user !"
      await browesModel.block(req.body)
      res.status(200).send();
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.report = async (req, res) => {
    try {
      if (!req.body.login || !req.body.reporter)
        throw "incomplete info !"
      var check = await browesModel.checkReport(req.body)
      if (!check)
        throw "you are actually reported this user !"
      await browesModel.report(req.body)
      res.status(200).send();
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.seen = async (req, res) => {
    try {
      await browesModel.seen(req.body)
      res.status(200).send();
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.checkLike = async (req, res) => {
    try {
      const response = await browesModel.checkLike(req.params)
      res.status(200).send({check: response});
    }
    catch (err) {
      res.status(400).send({
        error: err.message || err
      });
    }
};