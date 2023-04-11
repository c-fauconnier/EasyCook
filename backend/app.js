const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const passport = require("passport");
const userRoutes = require("./routes/user");
require("./models/db");
require("./config/passport");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use("/api/profile", userRoutes);
// error handlers
// Catch unauthorized errors
app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401);
    res.json({ message: err.name + ": " + err.message });
  }
});
module.exports = app;
