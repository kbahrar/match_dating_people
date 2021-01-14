const express = require("express");
const authCtrl = require("../controllers/auth")

const router = express.Router();

router.post("/login", authCtrl.Login);
router.post("/register", authCtrl.CreateUser);
router.post("/rpassword", authCtrl.Rpassword);
router.post("/reset", authCtrl.updatePwd);
router.post("/activer", authCtrl.activer);

module.exports = router;
