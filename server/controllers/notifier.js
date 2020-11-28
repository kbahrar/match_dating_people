const browesNotif = require('../models/notifier')

exports.getNotifs = async (req, res) => {
    try {
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
