import { useEffect, useState } from "react";
import "./App.css";

interface ScheduleEvent {
  time: string;
  title: string;
  location?: string;
  description?: string;
  category?: "meal" | "mass";
}

interface ScheduleDay {
  day: string;
  events: ScheduleEvent[];
}

function locationClass(location?: string): string {
  if (!location) return "";
  if (location.includes("New Life Arena")) return "event-card--arena";
  if (location.includes("Dining Hall")) return "event-card--dining";
  if (location.includes("Arts & Crafts")) return "event-card--arts-crafts";
  if (location.includes("Play House")) return "event-card--play-house";
  if (location.includes("Welcoming Center")) return "event-card--welcoming";
  return "";
}

function App() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [activeDay, setActiveDay] = useState(0);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetch("/schedule.json")
      .then((res) => res.json())
      .then((data) => setSchedule(data));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <img
          src="https://github.com/user-attachments/assets/175d42de-4ec7-43c4-ba60-b60dfd45e218"
          alt="ACAMPS USA 2k26"
          className="logo"
        />
        <div className="header-info">
          <h1>ACAMPS USA 2k26</h1>
          <p className="subtitle">Hearts on Fire, Nothing's Off Limits</p>
          <p className="details">August 20-23 • Camp Schodack, Nassau, NY</p>
        </div>
      </header>

      <nav className="day-tabs">
        {schedule.map((day, i) => (
          <button
            key={day.day}
            className={`day-tab ${!showMap && i === activeDay ? "active" : ""}`}
            onClick={() => { setShowMap(false); setActiveDay(i); }}
          >
            {day.day}
          </button>
        ))}
        <button
          className={`day-tab ${showMap ? "active" : ""}`}
          onClick={() => setShowMap(true)}
        >
          🗺️ Map
        </button>
      </nav>

      <main className="schedule">
        {showMap ? (
          <div className="map-container">
            <img src="/ACAMPS-2026-Camp-Map.jpeg" alt="Camp Schodack Map" className="map-image" />
          </div>
        ) : schedule[activeDay] && (
          <div className="day-schedule">
            {schedule[activeDay].events.map((event, i) => (
              <div key={i} className={`event-card ${locationClass(event.location)}`}>
                <div className="event-time">{event.time}</div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  {event.location && <span className="event-location">📍 {event.location}</span>}
                  {event.description && (
                    <p className="event-description">{event.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Shalom Catholic Community • ACAMPS USA 2k26</p>
      </footer>
    </div>
  );
}

export default App;
