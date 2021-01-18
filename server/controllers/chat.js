const chatModel = require('../models/chat')

exports.getList = async (req, res) => {
    try {
      if (!req.params.login)
        throw 'invalide informations'
      const users = await chatModel.getMatched(req.params.login)
      res.status(200).send({users: users});
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.sendMsg = async (req, res) => {
    try {
      if (!req.body.login || !req.body.user || !req.body.message)
        throw 'invalide informations'
      var check = await chatModel.checkMatched(req.body.login, req.body.user)
      if (!check)
        throw 'You do not matched yet !'
      await chatModel.sendMsg(req.body.login, req.body.user, req.body.message)
      res.status(200).send();
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.getMsg = async (req, res) => {
    try {
      if (!req.body.login || !req.body.user)
        throw 'invalide informations'
      var check = await chatModel.checkMatched(req.body.login, req.body.user)
      if (!check)
        throw 'You do not matched yet !'
      var msgs = await chatModel.getMsgs(req.body.login, req.body.user, req.body.message)
      res.status(200).send({msgs: msgs});
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.seenMsgs = async (req, res) => {
    try {
      if (!req.body.login || !req.body.user)
        throw 'invalide informations'
      var check = await chatModel.checkMatched(req.body.login, req.body.user)
      if (!check)
        throw 'You do not matched yet !'
      var msgs = await chatModel.seenMsgs(req.body.login, req.body.user)
      res.status(200).send({msgs: msgs});
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};