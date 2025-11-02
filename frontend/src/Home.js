import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

function Home() {
  // States
  const [showModal, setShowModal] = useState(false);
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
        axios.get("https://sports-allocation-using-mern-4.onrender.com/api/bookings"),
        axios.get("https://sports-allocation-using-mern-4.onrender.com/api/events"),
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

  // Fetch reports on page load
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
      await axios.post("https://sports-allocation-using-mern-4.onrender.com/api/bookings", {
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
      await axios.post("https://sports-allocation-using-mern-4.onrender.com/api/events/add", {
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
      {/* Floating Background Icons */}
      <div className="floating-bg">
        <span>⚽</span>
        <span>🏀</span>
        <span>🏸</span>
        <span>🎾</span>
      </div>

      {/* Header */}
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

      {/* Welcome Title */}
      <div className="site-title">
        Welcome, <span>{username}</span> 👋<br />
        to the <span>Sports Allocation System</span>
      </div>

      {/* Sports Animation Row */}
      <div className="sports-animation">
        <span>⚽</span><span>🏀</span><span>🏏</span>
        <span>🏸</span><span>🎾</span><span>🏐</span>
      </div>

      {/* Hero Section */}
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

      {/* Sports Section */}
      <section id="sports" className="section fade-up">
        <h2>Available Sports</h2>
        <div className="sports-grid">
          {[
            { name: "Football", img: "https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Basketball", img: "https://images.pexels.com/photos/1103829/pexels-photo-1103829.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Badminton", img: "https://images.pexels.com/photos/114296/pexels-photo-114296.jpeg?auto=compress&cs=tinysrgb&w=800" },
            { name: "Tennis", img: "https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=800" },
          ].map((sport, i) => (
            <div className="card zoom" key={i}>
              <img src={sport.img} alt={sport.name} />
              <h3>{sport.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Slot Booking */}
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

      {/* Events Section */}
      <section id="events" className="section fade-up">
        <h2>Upcoming Events</h2>
        <div className="events-slider">
          <div className="event-slide">
            {[
              { title: "Intercollege Football Tournament", date: "25th Dec 2025 | Main Ground" },
              { title: "Badminton Championship", date: "30th Dec 2025 | Indoor Court" },
              { title: "Tennis League Finals", date: "5th Jan 2026 | Tennis Court" },
              { title: "Athletics Meet 2026", date: "15th Jan 2026 | Track Field" },
              { title: "Cricket Trophy", date: "20th Jan 2026 | College Ground" },
              { title: "Table Tennis Open", date: "25th Jan 2026 | Sports Hall" },
              { title: "Swimming Gala", date: "30th Jan 2026 | Aquatic Centre" },
              { title: "Volleyball Invitational Cup", date: "5th Feb 2026 | East Court" },
              { title: "Basketball State Cup", date: "10th Feb 2026 | Indoor Stadium" },
            ].map((event, i) => (
              <div className="event-card" key={i}>
                <h3>{event.title}</h3>
                <p>{event.date}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 style={{ marginTop: "30px", color: "#ffdd57" }}>Register for Upcoming Events</h2>
        <form className="event-register-form" onSubmit={handleEventRegister}>
          <select required>
            <option value="">Select Event</option>
            <option>Intercollege Football Tournament</option>
            <option>Badminton Championship</option>
            <option>Tennis League Finals</option>
            <option>Basketball State Cup</option>
            <option>Athletics Meet 2026</option>
            <option>Cricket Trophy</option>
            <option>Table Tennis Open</option>
            <option>Swimming Gala</option>
            <option>Volleyball Invitational Cup</option>
          </select>
          <input type="text" placeholder="Full Name" required />
          <input type="email" placeholder="Email Address" required />
          <input type="tel" placeholder="Contact Number" pattern="[0-9]{10}" required />
          <button type="submit">Register</button>
        </form>
      </section>

      {/* Reports Section */}
      <section id="reports" className="section fade-up">
        <h2>Reports & Statistics</h2>
        <div className="reports-grid">
          <div className="report-card"><h3>🏆 Total Events</h3><p>{reports.totalEvents}</p></div>
          <div className="report-card"><h3>👥 Total Participants</h3><p>{reports.totalParticipants}</p></div>
          <div className="report-card"><h3>📅 Slots Booked</h3><p>{reports.slotsBooked}</p></div>
          <div className="report-card"><h3>🎯 Most Popular Sport</h3><p>{reports.mostPopular}</p></div>
        </div>
        <button id="view-detailed-reports" onClick={() => setShowModal(true)}>
          View Detailed Reports
        </button>

        {/* Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h2>📊 Detailed Reports</h2>
              <ul>
                <li>✅ Total Sports Offered: <strong>8</strong></li>
                <li>📅 Upcoming Events: <strong>{reports.totalEvents}</strong></li>
                <li>🕒 Avg. Bookings/Day: <strong>{(reports.slotsBooked / 7).toFixed(1)}</strong></li>
                <li>🏆 Events Conducted This Year: <strong>{reports.totalEvents}</strong></li>
                <li>👥 Participants: <strong>{reports.totalParticipants}</strong></li>
                <li>🔥 Most Popular Sport: <strong>{reports.mostPopular}</strong></li>
                <li>💰 Est. Revenue: <strong>₹{reports.slotsBooked * 150}</strong></li>
                <li>📍 Active Venues: <strong>6</strong></li>
              </ul>
              <button onClick={() => setShowModal(false)}>Close</button>
            </div>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer>
        <p>© 2025 Sports Allocation System | Designed by <strong>BATCH - 5</strong></p>
      </footer>
    </div>
  );
}

export default Home;
