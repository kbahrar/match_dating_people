const express = require("express");
const {
  CreateUser
} = require("../controllers/register");

const router = express.Router();


router.route("/register").post(CreateUser);

module.exports = router;
