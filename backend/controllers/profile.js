const User = require("../models/user");

module.exports.allUsers = async function (req, res) {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    return res.statuts(500).json({ msg: "Error 500 occurred." });
  }
};
