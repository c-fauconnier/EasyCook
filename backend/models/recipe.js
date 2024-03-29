const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  paragraphs: [
    {
      text: {
        type: String,
        required: true,
      },
      video: { type: String, required: false },
      image: { type: String, required: false },
      number: { type: Number, default: 1 },
    },
  ],
  difficulty: { type: Number, min: 0, max: 5 },
  rating: {
    type: Number,
    default: 0,
  },
  total_ratings: {
    type: Number,
    default: 0,
  },
  total_comments: {
    type: Number,
    default: 0,
  },
  last_modification: Date,
  estimated_time: String,
  cover: String,
  resume: String,
  category: {
    type: String,
    enum: ["entrée", "plat principal", "dessert"],
    required: true,
  },
  ingredients: [
    {
      ingredient: { type: Schema.Types.ObjectId, ref: "Ingredient" },
      quantity: { type: Number, required: false },
    },
  ],
  comments: [
    {
      //author: { type: Schema.Types.ObjectId, ref: "User" },
      username: String,
      comment: String,
      rating: Number,
      date: Date,
    },
  ], //contains only last 5 comments, others will be send to comment Schema
});

module.exports = mongoose.model("Recipe", recipeSchema);
