const express = require("express");
const { Login } = require("../controllers/login");
const { CreateUser } = require("../controllers/register");
const { Rpassword } = require("../controllers/rpassword");



const router = express.Router();


router.route("/login").post(Login);
router.route("/register").post(CreateUser);
router.route("/rpassword").post(Rpassword);




router.get("/", function (req, res, next) {
  if (req.session && req.session.login) {
    req.session.error = "Vous ne pouvez plus aller sur cette page";
    res.redirect("routes/error");
  } else {
    res.render("index", { title: "Express" });
  }
});

module.exports = router;
