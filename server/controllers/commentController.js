const Comment = require("../models/Comment");
const Post = require("../models/Post");

// Get comments for a specific post
const getComments = async (req, res) => {
  const id = req.query.id;
  try {
    const comments = await Comment.find({ post: id }).populate("post");
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching comments" });
  }
};

// Add a new comment to a specific post
const addComment = async (req, res) => {
  const { content, author, id } = req.body;

  try {
    const newComment = new Comment({
      content,
      author,
      createdAt: new Date(),
      post: id,
      user: req.user.id,
      username: req.user.name,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error adding comment" });
  }
};

module.exports = {
  getComments,
  addComment,
};
