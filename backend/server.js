import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Import routes
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js"; // comment out if missing
import eventRoutes from "./routes/events.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/events", eventRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// --- Serve Frontend Build ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the frontend build folder
// Serve static files from frontend build
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Handle all other routes
app.use((req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Sports Allocation App running on port ${PORT}`)
);

