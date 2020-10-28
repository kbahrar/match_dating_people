const express = require("express");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users")
const  bodyParser = require("body-parser");
const cors = require("cors");
const auth = require("./middleware/auth")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/", authRoutes);
app.use("/users", auth, usersRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
