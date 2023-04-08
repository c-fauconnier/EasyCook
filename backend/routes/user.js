require("dotenv").config();
const router = require("express").Router();
const userController = require("../controllers/profile");
const authController = require("../controllers/authentification");
var { expressjwt: jwt } = require("express-jwt");

const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

router.get("/all", auth, userController.allUsers);
router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
