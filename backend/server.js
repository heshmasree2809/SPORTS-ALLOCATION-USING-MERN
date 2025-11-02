import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Your routes should start like this:
import authRoutes from "./routes/auth.js";
import bookingRoutes from "./routes/bookings.js";
import eventRoutes from "./routes/events.js";

app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/events", eventRoutes);

// ✅ PORT setup for Render
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
