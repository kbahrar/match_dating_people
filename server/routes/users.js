const express = require("express")
const usersCtrl = require("../controllers/users")
const auth = require("../middleware/auth")
const router = express.Router()

router.post("/fillprofile", auth, usersCtrl.fillProfile)
router.put("/location", auth, usersCtrl.location)
router.put("/uploadImg", auth, usersCtrl.uploadImg)
router.get("/getUser/:id", usersCtrl.getUserInfo)

module.exports = router