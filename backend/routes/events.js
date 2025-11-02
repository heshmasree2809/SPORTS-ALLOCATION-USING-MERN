import express from "express";
import Event from "../models/Event.js";

const router = express.Router();

// ✅ Add Event
router.post("/add", async (req, res) => {
  try {
    const { eventName, eventDate, location, sportType } = req.body;

    if (!eventName || !eventDate || !location || !sportType) {
      return res.status(400).json({ error: "All fields are required ❌" });
    }

    const newEvent = new Event({ eventName, eventDate, location, sportType });
    await newEvent.save();

    res.status(201).json({ message: "✅ Event Registered Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "❌ Failed to Register Event" });
  }
});

// ✅ Get Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: "❌ Failed to fetch events" });
  }
});

export default router;
