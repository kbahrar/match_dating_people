const express = require("express");
const { Rpassword } = require("../controllers/rpassword");

const router = express.Router();
router.route("/rpassword").post(Rpassword);

module.exports = router;
