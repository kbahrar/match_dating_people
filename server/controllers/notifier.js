const browesNotif = require('../models/notifier')

exports.getNotifs = async (req, res) => {
    try {
      req.params.id = parseInt(req.params.id)
      if (!req.params.id)
        throw "invalide id !"
      const notifs = await browesNotif.getNotif(req.params.id)
      res.status(200).send({notifs: notifs});
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};

exports.seenNotifs = async (req, res) => {
    try {
      req.params.id = parseInt(req.params.id)
      if (!req.params.id)
        throw "invalide id !"
      await browesNotif.seenNotif(req.params.id)
      res.status(200).send();
    }
    catch (err) {
      console.log(err.message || err)
      res.status(400).send({
        error: err.message || err
      });
    }
};
