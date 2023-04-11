const User = require("../models/user");
const mongoose = require("mongoose");

module.exports.allUsers = function (req, res) {
  try {
    User.find({}, { password: 0 }).then(function (users) {
      res.status(200).json(users);
    });
  } catch (err) {
    return res.statuts(500).json({ msg: "Error 500 occurred." });
  }
};

module.exports.profileRead = function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.auth._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile",
    });
  } else {
    try {
      // Otherwise continue
      User.findById(req.auth._id).then(function (user) {
        res.status(200).json(user);
      });
    } catch (error) {
      res.status(404).json({
        message: "User does not exist",
      });
    }
  }
};
