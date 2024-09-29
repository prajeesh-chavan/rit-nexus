// server/routes/dashboard.js
const express = require("express");
const { getDashboardStats } = require("../controllers/dashboardController");
const auth = require("../middleware/auth");
const router = express.Router();

// Define the endpoint
router.get("/stats", auth, getDashboardStats);

module.exports = router;
