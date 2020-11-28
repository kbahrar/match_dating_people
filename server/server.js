const express = require("express");
const authRoutes = require("./routes/auth");
const usersRoutes = require("./routes/users")
const browesRoutes = require("./routes/browes")
const notifRoutes = require("./routes/notifier")
const  bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json({limit: '10mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}));
app.use(cors());

app.use("/", authRoutes);
app.use("/users", usersRoutes);
app.use("/browes", browesRoutes);
app.use("/notifier", notifRoutes);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`Server running on port ${PORT}`)
);
