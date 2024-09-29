// server/controllers/dashboardController.js
const Blog = require("../models/Post");
const Comment = require("../models/Comment");
const User = require("../models/User"); // If needed for user stats

// Fetch dashboard statistics
const getDashboardStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.find({
      authorId: req.user.id,
    }).countDocuments();
    const totalComments = await Comment.find({
      authorId: req.user.id,
    }).countDocuments();
    const drafts = await Blog.find({ authorId: req.user.id }).countDocuments({
      status: "draft",
    });
    const recentActivity = await Blog.find({ authorId: req.user.id })
      .sort({ createdAt: -1 })
      .limit(5) // Adjust the limit as needed
      .select("title createdAt");

    // Format recent activity
    const formattedActivity = recentActivity.map(
      (activity) =>
        `Created "${
          activity.title
        }" on ${activity.createdAt.toLocaleDateString()}`
    );

    return res.status(200).json({
      blogs: totalBlogs,
      comments: totalComments,
      drafts: drafts,
      activity: formattedActivity,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getDashboardStats };
