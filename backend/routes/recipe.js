require("dotenv").config();
const router = require("express").Router();
const recipeController = require("../controllers/recipe");
var { expressjwt: jwt } = require("express-jwt");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  //userProperty: "payload",
  algorithms: ["HS256"],
});

router.get("", recipeController.getAll);
router.get("/:id", recipeController.getRecipe);
router.post("/create", auth, recipeController.createRecipe);

module.exports = router;
