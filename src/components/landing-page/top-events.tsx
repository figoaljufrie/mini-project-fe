import Image from "next/image";
import { events } from "@/lib/data";

export default function TopEvents() {
  const topEvents = events.slice(0, 3);

  return (
    <section className="top-events-section">
      <div className="top-events-container">
        {/* Header */}
        <div className="top-events-header">
          <h2 className="top-events-title">Top Events</h2>
          <div className="top-events-subtitle">Event Terpopuler Saat Ini</div>
        </div>

        {/* Event List */}
        <div className="top-events-grid">
          {topEvents.map((event, index) => (
            <div
              key={event.id}
              className="top-event-card"
            >
              {/* Nomor Ranking */}
              <span className="top-event-rank">{index + 1}</span>

              {/* Gambar Event */}
              <div className="top-event-image-container">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="top-event-image"
                />
                <div className="top-event-overlay">
                  <div className="top-event-badge">
                    #{index + 1} Top Event
                  </div>
                </div>
              </div>

              {/* Event Info */}
              <div className="top-event-info">
                <h3 className="top-event-title">{event.title}</h3>
                <p className="top-event-location">{event.location}</p>
                <div className="top-event-meta">
                  <span className="top-event-date">{event.date}</span>
                  <span className="top-event-price">{event.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}