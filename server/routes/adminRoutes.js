// /routes/adminRoutes.js
const express = require("express");
const { isAdmin } = require("../middleware/auth");
const {
  getAllUsers,
  deleteUser,
  getAllBlogs,
  deleteBlog,
  getAllComments,
  deleteComment,
} = require("../controllers/adminController");

const router = express.Router();

// User management
router.get("/users", isAdmin, getAllUsers);
router.delete("/user/:id", isAdmin, deleteUser);

// Blog management
router.get("/blogs", isAdmin, getAllBlogs);
router.delete("/blog/:id", isAdmin, deleteBlog);

// Comment management
router.get("/comments", isAdmin, getAllComments);
router.delete("/comment/:id", isAdmin, deleteComment);

module.exports = router;
