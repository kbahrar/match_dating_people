const express = require("express")
const usersCtrl = require("../controllers/users")
const auth = require("../middleware/auth")
const router = express.Router()

router.post("/fillprofile", auth, usersCtrl.fillProfile)
router.post("/updateProfile", auth, usersCtrl.updateProfile)
//auth, usersCtrl.updateProfile)
// router.post("/myprofilepage", auth, usersCtrl.myprofilepage)
router.put("/location", auth, usersCtrl.location)
router.put("/uploadImg", auth, usersCtrl.uploadImg)
router.get("/getUser/:id", auth, usersCtrl.getUserInfo)
router.get("/getOtherUser/:id&:login", auth, usersCtrl.getOtherUserInfo)

module.exports = router