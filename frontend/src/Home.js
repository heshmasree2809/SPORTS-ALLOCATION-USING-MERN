import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";
import API_BASE_URL from "./api"; // ✅ Import base URL

function Home() {
  const [reports, setReports] = useState({
    totalEvents: 0,
    totalParticipants: 0,
    slotsBooked: 0,
    mostPopular: "N/A",
  });

  // Get username
  const storedUser = localStorage.getItem("loggedUser") || "Guest";
  const username = storedUser.includes("@")
    ? storedUser.split("@")[0]
    : storedUser;

  // ---------------- 📊 FETCH REPORTS ----------------
  const fetchReports = async () => {
    try {
      const [bookingsRes, eventsRes] = await Promise.all([
        axios.get(`${API_BASE_URL}/bookings`),
        axios.get(`${API_BASE_URL}/events`),
      ]);

      const totalEvents = eventsRes.data.length;
      const slotsBooked = bookingsRes.data.length;

      const sportCount = {};
      bookingsRes.data.forEach((b) => {
        sportCount[b.sport] = (sportCount[b.sport] || 0) + 1;
      });

      const mostPopular = Object.keys(sportCount).length
        ? Object.entries(sportCount).sort((a, b) => b[1] - a[1])[0][0]
        : "N/A";

      setReports({
        totalEvents,
        totalParticipants: totalEvents * 35,
        slotsBooked,
        mostPopular,
      });
    } catch (err) {
      console.error("❌ Error fetching reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ---------------- 🕒 SLOT BOOKING ----------------
  const handleSlotBooking = async (e) => {
    e.preventDefault();
    const sport = e.target[0].value;
    const date = e.target[1].value;
    const time = e.target[2].value;

    try {
      await axios.post(`${API_BASE_URL}/bookings`, {
        sport,
        date,
        time,
        user: username,
      });
      alert("✅ Slot booked successfully!");
      e.target.reset();
      fetchReports();
    } catch (error) {
      console.error(error);
      alert("❌ Booking failed. Check console for details.");
    }
  };

  // ---------------- 🏆 EVENT REGISTRATION ----------------
  const handleEventRegister = async (e) => {
    e.preventDefault();

    const eventName = e.target[0].value;
    const fullName = e.target[1].value;
    const email = e.target[2].value;
    const phone = e.target[3].value;

    try {
      await axios.post(`${API_BASE_URL}/events/add`, {
        eventName,
        eventDate: new Date().toISOString(),
        location: "Main Stadium",
        sportType: "General",
        fullName,
        email,
        phone,
      });
      alert("✅ Event registration saved to MongoDB!");
      e.target.reset();
      fetchReports();
    } catch (error) {
      console.error(error);
      alert("❌ Failed to register event. Check console for details.");
    }
  };

  // ---------------- 🏠 UI ----------------
  return (
    <div className="home">
      <div className="floating-bg">
        <span>⚽</span>
        <span>🏀</span>
        <span>🏸</span>
        <span>🎾</span>
      </div>

      <header>
        <div className="logo">🏆Sports Allocation</div>
        <nav>
          <a href="#home">Home</a>
          <a href="#sports">Sports</a>
          <a href="#slots">Book Slots</a>
          <a href="#events">Events</a>
          <a href="#reports">Reports</a>
          <a href="/" className="btn">Logout</a>
        </nav>
      </header>

      <div className="site-title">
        Welcome, <span>{username}</span> 👋<br />
        to the <span>Sports Allocation System</span>
      </div>

      <div className="sports-animation">
        <span>⚽</span><span>🏀</span><span>🏏</span>
        <span>🏸</span><span>🎾</span><span>🏐</span>
      </div>

      <section id="home" className="hero">
        <h1 className="fade-in">
          Manage Sports, Events & Bookings <span>Effortlessly</span>
        </h1>
        <p className="fade-in">Your one-stop solution for sports scheduling & allocation</p>
        <button
          className="fade-in"
          onClick={() => document.getElementById("sports").scrollIntoView({ behavior: "smooth" })}
        >
          Explore Sports
        </button>
      </section>

      {/* Book Slots */}
      <section id="slots" className="section fade-up">
        <h2>Book Your Slot</h2>
        <form className="booking-form" onSubmit={handleSlotBooking}>
          <select required>
            <option value="">Select Sport</option>
            <option>Football</option>
            <option>Basketball</option>
            <option>Badminton</option>
            <option>Tennis</option>
          </select>
          <input type="date" required />
          <input type="time" required />
          <button type="submit">Book Now</button>
        </form>
      </section>

      {/* Register Events */}
      <section id="events" className="section fade-up">
        <h2>Upcoming Events</h2>
        <form className="event-register-form" onSubmit={handleEventRegister}>
          <select required>
            <option value="">Select Event</option>
            <option>Intercollege Football Tournament</option>
            <option>Badminton Championship</option>
            <option>Tennis League Finals</option>
            <option>Basketball State Cup</option>
          </select>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Contact Number" pattern="[0-9]{10}" required />
          <button type="submit">Register</button>
        </form>
      </section>

      {/* Reports */}
      <section id="reports" className="section fade-up">
        <h2>Reports & Statistics</h2>
        <div className="reports-grid">
          <div className="report-card"><h3>🏆 Total Events</h3><p>{reports.totalEvents}</p></div>
          <div className="report-card"><h3>👥 Total Participants</h3><p>{reports.totalParticipants}</p></div>
          <div className="report-card"><h3>📅 Slots Booked</h3><p>{reports.slotsBooked}</p></div>
          <div className="report-card"><h3>🎯 Most Popular Sport</h3><p>{reports.mostPopular}</p></div>
        </div>
      </section>

      <footer>
        <p>© 2025 Sports Allocation System | Designed by <strong>BATCH - 5</strong></p>
      </footer>
    </div>
  );
}

export default Home;
