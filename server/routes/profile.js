const express = require("express");
const auth = require("../middleware/auth");
const User = require("../models/User");
const router = express.Router();

// Get User Profile (Protected Route)
router.get("/", auth, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id).select("-password");
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

router.put("/", auth, async (req, res) => {
  try {
    const updatedData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      bio: req.body.bio,
    };
    const user = await User.findByIdAndUpdate(req.user.id, updatedData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user); // Return the updated user
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
});

module.exports = router;
