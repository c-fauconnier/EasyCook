const { default: mongoose } = require("mongoose");

const ingredientSchema = {};
module.exports = mongoose.model("Ingredient", ingredientSchema);
