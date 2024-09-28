const express = require("express");
const multer = require("multer");
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getRelatedPosts,
  getMyPosts,
} = require("../controllers/postController");
const auth = require("../middleware/auth");

const router = express.Router();

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // directory to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Define routes
router.post("/", auth, upload.single("image"), createPost);
router.get("/blogs", getAllPosts);
router.get("/:id", getPostById);
router.get("/related/:category", getRelatedPosts);
router.put("/:id", upload.single("image"), updatePost);
router.delete("/:id", deletePost);
router.get("/", auth, getMyPosts);

module.exports = router;
