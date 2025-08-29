"use client";
import { events } from "@/lib/data"; 
import Image from "next/image";
import Link from "next/link";

interface EventListProps {
  searchQuery?: string;
  category?: string;
  limit?: number; // batasi jumlah item untuk landing
  showSeeAll?: boolean; // tampilkan tombol see all
}

export default function EventList({ searchQuery = "", category = "All", limit = 6, showSeeAll = true }: EventListProps) {
  const filteredEvents = events.filter((event) => {
    const matchCategory = category === "All" || event.category === category;
    
    const safeSearchQuery = searchQuery?.toLowerCase() || "";
    const matchSearch = event.title.toLowerCase().includes(safeSearchQuery);
    
    return matchCategory && matchSearch;
  });

  return (
    <section className="event-list-section">
      <div className="event-list-container">
        <div className="event-list-header">
          <div>
            <h2 className="event-list-title">Discover Events</h2>
            <p className="event-list-subtitle">Temukan event menarik yang sesuai dengan minatmu</p>
          </div>
          {showSeeAll && (
            <Link href="/event-browsing" className="see-all-button" aria-label="See all">
              →
            </Link>
          )}
        </div>
        
        {filteredEvents.length > 0 ? (
          <div className="event-list-grid">
            {filteredEvents.slice(0, limit).map((event) => (
              <div
                key={event.id}
                className="event-list-card"
              >
                <div className="event-list-image-container">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="event-list-image"
                  />
                  <div className="event-list-category-badge">
                    {event.category}
                  </div>
                </div>
                
                <div className="event-list-content">
                  <h3 className="event-list-event-title">{event.title}</h3>
                  <div className="event-list-meta">
                    <span className="event-list-date">📅 {event.date}</span>
                    <span className="event-list-location">📍 {event.location}</span>
                  </div>
                  <div className="event-list-footer">
                    <span className="event-list-price">Rp {event.price.toLocaleString()}</span>
                    <Link href={`/events/${encodeURIComponent(event.title.toLowerCase().replace(/\s+/g, "-"))}`} className="event-list-button">View Details</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="event-list-empty">
            <div className="event-list-empty-icon">🔍</div>
            <h3 className="event-list-empty-title">Tidak ada event ditemukan</h3>
            <p className="event-list-empty-subtitle">Coba ubah filter pencarian atau kategori</p>
          </div>
        )}
      </div>
    </section>
  );
}