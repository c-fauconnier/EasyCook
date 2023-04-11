const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.register = async function (req, res) {
  var user = new User();
  console.log(req.body);

  user.username = req.body.username;
  user.email = req.body.email;

  await user.setPassword(req.body.password);

  user
    .save()
    .then(function (err) {
      var token;
      token = user.generateJwt();
      console.log("user: " + user.username + " created");
      res.status(200);
      res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      if (err.keyValue) {
        invalidField = Object.keys(err.keyValue)[0];
        msg = invalidField + " is already taken";
      } else if (err.errors) {
        msg = "invalid field name";
      }

      res.status(400).json({ error: msg });
    });
};

module.exports.login = async function (req, res) {
  passport.authenticate("local", function (err, user, info) {
    let token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if (user) {
      token = user.generateJwt();
      res.status(200);
      res.json({
        token: token,
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
};
