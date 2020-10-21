const express = require("express");
const register = login = rpassword = require("./routes/");
const  bodyParser = require("body-parser");
const cors = require("cors");
//const   morgan = require("morgan");
//const  dotenv = require("dotenv");

// load env vars
//dotenv.config({ path: "./config/config.env" });

//Route files
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// DEv logging middleware
//if (process.env.NODE_ENV === "production") {
//  app.use(morgan("dev"));
//}

// Mount routers

app.use("/", register);
app.use("/", login);
app.use("/", rpassword);
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
