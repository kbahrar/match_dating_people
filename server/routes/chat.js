const express = require("express");
const chatCtrl = require("../controllers/chat")
const auth = require("../middleware/auth")

const router = express.Router();

router.get('/:id&:login', auth, chatCtrl.getList)
router.post('/sendMsg', auth, chatCtrl.sendMsg)
router.post('/getMsg', auth, chatCtrl.getMsg)
router.put('/seenMsg', auth, chatCtrl.seenMsgs)

module.exports = router;