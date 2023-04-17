const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  recipeTag: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  total_likes: Number,
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  date: { type: Date, required: true },
});

module.exports = mongoose.model("Post", postSchema);
