const express = require("express");
const browesCtrl = require("../controllers/browes")
const auth = require("../middleware/auth")

const router = express.Router();

router.get('/:id', auth, browesCtrl.getList)
router.post('/like', auth, browesCtrl.like)
router.put('/like', auth, browesCtrl.dislike)
router.get('/like/:id&:login&:liked', auth, browesCtrl.checkLike)
router.post('/seen', auth, browesCtrl.seen)
router.post('/report', auth, browesCtrl.report)
router.post('/checkreport', auth, browesCtrl.checkreport)
router.post('/block', auth, browesCtrl.block)

module.exports = router;