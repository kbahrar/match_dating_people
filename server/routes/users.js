const express = require("express")
const { fillProfile } = require("../controllers/users")
// const  {location} = require("../controllers/location")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/fillprofile", fillProfile)
// router.post("/location", auth, location)

module.exports = router