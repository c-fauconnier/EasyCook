const Recipe = require("../models/recipe");
const User = require("../models/user");
module.exports.createRecipe = async function (req, res) {
  try {
    console.log(req.body, req.auth);
    let data = req.body;
    data.author = req.auth._id;

    var recipe = new Recipe(data);
    let recipeId = await recipe
      .save()
      .then(function (recipe) {
        console.log(recipe);
        return recipe._id;
        //res.status(200).json({ msg: "recipe created!" });
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ msg: err });
        }
      });
    console.log(recipeId);
    await User.findOneAndUpdate(
      { _id: req.auth._id },
      {
        $push: { myRecipes: recipeId },
      }
    ).then(function (data) {
      res.status(200).json("Recipe created and user modified");
    });
  } catch (err) {}
};

module.exports.getAll = async function (req, res) {
  try {
    //const all = await Recipe.find();
    const allWithId = await Recipe.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
    ]);
    //console.log(all);
    res.status(200).json(allWithId);
  } catch (error) {
    console.log(error);
  }
};
