const express = require("express")
const usersCtrl = require("../controllers/users")

const router = express.Router()

router.post("/fillprofile", usersCtrl.fillProfile)
router.put("/location", usersCtrl.location)
router.put("/uploadImg", usersCtrl.uploadImg)

module.exports = router