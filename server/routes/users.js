const express = require("express")
const usersCtrl = require("../controllers/users")
// const  {location} = require("../controllers/location")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/fillprofile", usersCtrl.fillProfile)
router.put("/location", auth, usersCtrl.location)

module.exports = router