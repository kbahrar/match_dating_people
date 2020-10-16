const login = require("../models/login");

exports.Login = async (req, res, next) => {
  console.log(req.body, res);
  await login(req.body);
  res.status(200).json({ success: true, msg: "User created succefully !" });
};