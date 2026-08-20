import { useEffect, useState } from "react";
import "./App.css";

interface ScheduleEvent {
  time: string;
  title: string;
  location?: string;
  description?: string;
  category?: "meal" | "mass";
  onDuty?: string[];
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

export default function CommsTeam() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [activeDay, setActiveDay] = useState(0);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    fetch("/comms-schedule.json")
      .then((res) => res.json())
      .then((data) => setSchedule(data));
  }, []);

  return (
    <div className="app">
      <header className="header">
        <div className="logo" style={{ fontSize: "4rem", display: "flex", alignItems: "center", justifyContent: "center" }}>📷</div>
        <div className="header-info">
          <h1>ACAMPS USA 2k26 Comms Team Schedule</h1>
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
                {event.onDuty && (
                  <div className="event-on-duty">
                    <span className="on-duty-label">On duty</span>
                    {event.onDuty.map((name) => (
                      <span key={name} className="on-duty-name">{name}</span>
                    ))}
                  </div>
                )}
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

