import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/booking.js";
import eventRoutes from "./routes/events.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ API Routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);

// ✅ Serve Frontend (Production)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.resolve(__dirname, "../frontend/build");
app.use(express.static(frontendPath));

// ✅ Catch-all for React Router (important fix for Express v5)
app.get("/*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
