const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe",
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  username: { type: String, required: true },
  comment: String,
  date: Date,
  rating: Number,
});

module.exports = mongoose.model("Comments", commentSchema);
