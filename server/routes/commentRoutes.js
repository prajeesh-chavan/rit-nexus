const express = require("express");
const { getComments, addComment } = require("../controllers/commentController");
const auth = require("../middleware/auth");

const router = express.Router({ mergeParams: true }); // Allows access to post parameters

// Get comments for a specific post
router.get("/", getComments);

// Add a new comment to a specific post
router.post("/", auth, addComment);

module.exports = router;
