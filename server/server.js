const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/postRoutes");
const dashboardRoutes = require("./routes/dashboard");
const commentRoutes = require("./routes/commentRoutes");

// Connect to MongoDB
connectDB();

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Enable CORS for frontend-backend communication
app.use(cors());

// API Routes
app.use("/api/user", profileRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/comments", commentRoutes);

// Serve a basic welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Blog Website API");
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Start server and connect to DB
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
