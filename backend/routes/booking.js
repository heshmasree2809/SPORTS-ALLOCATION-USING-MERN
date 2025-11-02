import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// ✅ Create Booking
router.post("/", async (req, res) => {
  try {
    const { sport, date, time, user } = req.body;

    if (!sport || !date || !time || !user) {
      return res.status(400).json({ error: "All fields are required ❌" });
    }

    const booking = new Booking({ sport, date, time, user });
    await booking.save();
    res.json({ message: "✅ Booking confirmed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error ❌" });
  }
});

// ✅ Get all bookings
router.get("/", async (req, res) => {
  try {
    const all = await Booking.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings ❌" });
  }
});

export default router;
