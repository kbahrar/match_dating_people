const express = require("express");
const browesCtrl = require("../controllers/browes")
const auth = require("../middleware/auth")

const router = express.Router();

router.get('/:id', auth, browesCtrl.getList)
router.post('/like', auth, browesCtrl.like)

module.exports = router;