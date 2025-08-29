"use client";

import Image from "next/image";

type EventCardProps = {
  title: string;
  date: string;
  location: string;
  image: string;
  price: string;
};

export default function EventCard({
  title,
  date,
  location,
  image,
  price,
}: EventCardProps) {
  return (
    <div className="event-card">
      <div className="event-card-image-container">
        <Image
          src={image}
          alt={title}
          fill
          className="event-card-image"
        />
        <div className="event-card-overlay">
          <div className="event-card-price-badge">
            {price}
          </div>
        </div>
      </div>

      <div className="event-card-content">
        <h3 className="event-card-title">{title}</h3>
        
        <div className="event-card-meta">
          <div className="event-card-meta-item">
            <span className="event-card-meta-icon">📅</span>
            <span className="event-card-meta-text">{date}</span>
          </div>
          <div className="event-card-meta-item">
            <span className="event-card-meta-icon">📍</span>
            <span className="event-card-meta-text">{location}</span>
          </div>
        </div>

        <div className="event-card-actions">
          <button
            className="event-card-button"
            onClick={() => alert(`Beli tiket untuk: ${title}`)}
          >
            <span className="event-card-button-icon">🎟️</span>
            <span className="event-card-button-text">Beli Tiket</span>
          </button>
        </div>
      </div>
    </div>
  );
}