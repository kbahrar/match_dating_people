const express = require("express");
const searchCtrl = require("../controllers/search")
const auth = require("../middleware/auth")

const router = express.Router();

router.post('/', auth, searchCtrl.search)

module.exports = router;