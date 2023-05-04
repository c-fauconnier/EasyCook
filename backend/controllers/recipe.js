const Recipe = require("../models/recipe");
const User = require("../models/user");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

module.exports.createRecipe = async function (req, res) {
  try {
    //console.log(req.body, req.auth);
    let data = req.body;
    // retrieving authors id and username with auth token
    data.author = {};
    data.author._id = req.auth._id;
    data.author.username = req.auth.username;

    //saving recipe to Mongo
    var recipe = new Recipe(data);
    let recipeId = await recipe
      .save()
      .then(function (recipe) {
        return recipe._id;
      })
      .catch((err) => {
        if (err) {
          res.status(400).json({ msg: err });
        }
      });
    // linking newly created recipe to its author
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

// get all recipes with resumes infos
module.exports.getAll = async function (req, res) {
  try {
    // Getting recipes infos and mapping them to their author
    const all = await Recipe.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "author",
        },
      },
      { $unwind: "$author" },
      { $unset: ["paragraphs", "comments", "ingredients"] },
    ]);

    // filling author's field with only the username
    for (const recipe of all) {
      if (recipe.author) {
        const username = recipe.author.personalInfos.username;
        recipe.author = username;
      }
    }

    res.status(200).json(all);
  } catch (error) {
    console.log(error);
  }
};

module.exports.getRecipe = async function (req, res) {
  const id = new ObjectId(req.params.id);
  try {
    const recipe = await Recipe.aggregate([
      {
        $match: {
          _id: id,
        },
      },
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

    let dtoRecipe = {};
    // if recipe has an element then we populate our dto
    if (recipe.length > 0) {
      dtoRecipe = recipe[0];
      const username = dtoRecipe.author.personalInfos.username;
      dtoRecipe.author = username;
      res.status(200).json(dtoRecipe);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
};
