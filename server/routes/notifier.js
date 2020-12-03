const express = require("express");
const notifCtrl = require("../controllers/notifier")
const auth = require("../middleware/auth")

const router = express.Router();

router.get('/:id', auth, notifCtrl.getNotifs)
router.get('/seen/:id', auth, notifCtrl.seenNotifs)

module.exports = router;