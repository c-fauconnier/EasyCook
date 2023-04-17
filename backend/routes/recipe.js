require("dotenv").config();
const router = require("express").Router();
const recipeController = require("../controllers/recipe");
var { expressjwt: jwt } = require("express-jwt");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  //userProperty: "payload",
  algorithms: ["HS256"],
});

//router.get("/all", auth, userController.allUsers);
// router.post("/register", authController.register);
// router.post("/login", authController.login);
// router.get("/user", auth, userController.profileRead);
router.post("/create", auth, recipeController.createRecipe);

module.exports = router;
