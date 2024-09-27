const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Import routes
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Initialize express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for frontend-backend communication
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // Example of a protected route

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
