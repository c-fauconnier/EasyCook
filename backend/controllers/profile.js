const User = require("../models/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// module.exports.allUsers = function (req, res) {
//   try {
//     User.find({}, { password: 0 }).then(function (users) {
//       res.status(200).json(users);
//     });
//   } catch (err) {
//     return res.statuts(500).json({ msg: "Error 500 occurred." });
//   }
// };

module.exports.profileRead = async function (req, res) {
  // If no user ID exists in the JWT return a 401
  if (!req.auth._id) {
    res.status(401).json({
      message: "UnauthorizedError: private profile",
    });
  } else {
    try {
      // Otherwise continue
      const id = new ObjectId(req.auth._id);
      //console.log(id);
      const result = await User.aggregate([
        {
          $match: {
            _id: id,
          },
        },
        {
          $lookup: {
            from: "recipes",
            localField: "savedRecipes",
            foreignField: "_id",
            as: "savedRecipes",
          },
        },
        {
          $lookup: {
            from: "recipes",
            localField: "myRecipes",
            foreignField: "_id",
            as: "myRecipes",
          },
        },
      ]);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.status(404).json({
        message: "User does not exist",
      });
    }
  }
};
