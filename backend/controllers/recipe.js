const Recipe = require("../models/recipe");
const User = require("../models/user");
module.exports.createRecipe = async function (req, res) {
  try {
    console.log(req.body, req.auth);
    let data = req.body;
    data.author = req.auth._id;
    // let paragraphs = data.paragraphs;

    // if (paragraphs.length > 1) {
    //   let order = 1;
    //   for (let paragraph in paragraphs) {
    //     paragraph.number = order;
    //     order++;
    //   }
    // }
    // data.paragraphs = paragraphs;
    // console.log(data);

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
