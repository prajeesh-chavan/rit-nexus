const express = require("express");
const auth = require("../middlewares/auth");
const User = require("../models/User");
const router = express.Router();

// Get User Profile (Protected Route)
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
