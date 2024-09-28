const Post = require("../models/Post");

// Create a new blog post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, tags, status } = req.body; // 'status' field for draft or published
    const post = new Post({
      status: status || "draft", // If no status is provided, default to "draft"
      title,
      content,
      author: req.user.name,
      authorId: req.user.id,
      image: req.file ? req.file.path : null, // If an image is uploaded
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Get all blog posts (excluding drafts)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({ status: "published" }).sort({
      createdAt: -1,
    });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

// Get a single blog post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Get related blog posts by category (excluding drafts)
exports.getRelatedPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      category: req.params.category,
      status: "published",
    }).limit(3);
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching related posts", error });
  }
};

// Update a blog post
exports.updatePost = async (req, res) => {
  try {
    const updatedData = {
      title: req.body.title,
      content: req.body.content,
      image: req.file ? req.file.path : undefined, // If an image is uploaded
      category: req.body.category,
      tags: req.body.tags
        ? req.body.tags.split(",").map((tag) => tag.trim())
        : [],
      status: req.body.status || "draft", // Allow updating status
      updatedAt: Date.now(),
    };

    const post = await Post.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error updating post", error });
  }
};

// Delete a blog post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};

// Get all posts of the logged-in user (include drafts and published posts)
exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ authorId: req.user.id });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
