const express = require("express");

const router = express.Router();

router.get("/", function (req, res, next) {
  if (req.session && req.session.login) {
    req.session.error = "Vous ne pouvez plus aller sur cette page";
    res.redirect("routes/error");
  } else {
    res.render("index", { title: "Express" });
  }
});

module.exports = router;
