const mongoose = require("mongoose");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  savedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
  myRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
    },
  ],
});

userSchema.methods.setPassword = async function (password) {
  hash = await argon2.hash(password);
  this.password = hash;
};

userSchema.methods.validPassword = async function (password) {
  if (await argon2.verify(this.password, password)) {
    return true;
  } else {
    return false;
  }
};

userSchema.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      firstName: this.firstName,
      lastName: this.lastName,
      role: this.role,
      savedRecipes: this.savedRecipes,
      myRecipes: this.myRecipes,
      exp: parseInt(expiry.getTime() / 1000),
    },
    process.env.JWT_SECRET
  ); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

module.exports = mongoose.model("User", userSchema);
