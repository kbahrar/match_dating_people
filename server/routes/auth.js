const express = require("express");
// const { Login } = require("../controllers/login");
// const { CreateUser } = require("../controllers/register");
// const { Rpassword } = require("../controllers/rpassword");
const authCtrl = require("../controllers/auth")



const router = express.Router();

router.post("/login", authCtrl.Login);
router.post("/register", authCtrl.CreateUser);
router.post("/rpassword", authCtrl.Rpassword);


module.exports = router;
