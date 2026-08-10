import { useEffect, useState } from "react";
import "./App.css";

interface ScheduleEvent {
  time: string;
  title: string;
  location: string;
  description?: string;
}

interface ScheduleDay {
  day: string;
  events: ScheduleEvent[];
}

function App() {
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [activeDay, setActiveDay] = useState(0);

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
            className={`day-tab ${i === activeDay ? "active" : ""}`}
            onClick={() => setActiveDay(i)}
          >
            {day.day}
          </button>
        ))}
      </nav>

      <main className="schedule">
        {schedule[activeDay] && (
          <div className="day-schedule">
            {schedule[activeDay].events.map((event, i) => (
              <div key={i} className="event-card">
                <div className="event-time">{event.time}</div>
                <div className="event-content">
                  <h3 className="event-title">{event.title}</h3>
                  <span className="event-location">📍 {event.location}</span>
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
