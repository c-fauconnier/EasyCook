const passport = require("passport");
const mongoose = require("mongoose");
const User = require("../models/user");

module.exports.register = async function (req, res) {
  let data = {
    personalInfos: req.body,
  };
  console.log(data);
  var user = new User(data);
  await user.setPassword(data.personalInfos.password);

  user
    .save()
    .then(function (err) {
      var token;
      token = user.generateJwt();
      console.log("user: " + user.personalInfos.username + " created");
      res.status(200);
      res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
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
      res.status(404).json(info);
    }
  })(req, res);
};
