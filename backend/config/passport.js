var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var mongoose = require("mongoose");
var User = mongoose.model("User");
const argon2 = require("argon2");

passport.use(
  new LocalStrategy(async function (username, password, done) {
    await User.findOne({ "personalInfos.username": username }).then(
      async (res) => {
        // Return if user not found in database
        if (!res) {
          return done(null, false, {
            message: "User not found",
          });
        }

        if (await argon2.verify(res.personalInfos.password, password)) {
          return done(null, res);
        } else {
          return done(null, false, {
            message: "Password is wrong",
          });
        }
      }
    );
  })
);

// If credentials are correct, return the user object
