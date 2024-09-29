// server/models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true, // Removes extra spaces
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
    required: true, // Ensure every comment is associated with a blog post
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true, // Ensure every comment is associated with a user
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the comment is created
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Automatically set the date when the comment is updated
  },
});

// Update the updatedAt field on each comment update
commentSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
