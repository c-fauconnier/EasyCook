var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var User = mongoose.model("User");

passport.use(
  new LocalStrategy(function (username, password, done) {
    User.findOne({ username: username }).then((res) => {
      // Return if user not found in database
      if (!res) {
        return done(null, false, {
          message: "User not found",
        });
      }
      // Return if password is wrong
      if (!res.validPassword(password)) {
        return done(null, false, {
          message: "Password is wrong",
        });
      }
      // If credentials are correct, return the user object
      return done(null, res);
    });
  })
);
