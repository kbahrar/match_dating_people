const express = require("express")
const usersCtrl = require("../controllers/users")
const auth = require("../middleware/auth")
const router = express.Router()

router.post("/fillprofile", auth, usersCtrl.fillProfile)
router.post("/updateProfile", auth, usersCtrl.updateProfile)
router.post("/updateprofileemail", auth, usersCtrl.updateProfileEmail)
router.post("/updateprofiletags", auth, usersCtrl.updateProfileTags)
router.post("/updateprofilebio", auth, usersCtrl.updateProfileBio)
router.post("/updateprofilepassword", auth, usersCtrl.updateProfilePassword)
router.put("/location", auth, usersCtrl.location)
router.put("/uploadImg", auth, usersCtrl.uploadImg)
router.get("/getUser/:id", auth, usersCtrl.getUserInfo)
router.get("/getSeenLiked/:id", auth, usersCtrl.getSeenLiked)
router.get("/getOtherUser/:id&:login", auth, usersCtrl.getOtherUserInfo)

module.exports = router