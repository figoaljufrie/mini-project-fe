"use client";

import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  organizer: string;
  compact?: boolean;
}

export default function EventCard({
  title,
  date,
  location,
  price,
  image,
  compact = false,
}: EventCardProps) {
  return (
    <div className="event-list-card">
      <div className={compact ? "event-list-image-container event-list-image-container--sm" : "event-list-image-container"}>
        <Image src={image} alt={title} fill className="event-list-image" />
      </div>
      <div className={compact ? "event-list-content event-list-content--sm" : "event-list-content"}>
        <h3 className={compact ? "event-list-event-title event-list-event-title--sm" : "event-list-event-title"}>{title}</h3>
        <div className={compact ? "event-list-meta event-list-meta--sm" : "event-list-meta"}>
          <span className="event-list-date">📅 {date}</span>
          <span className="event-list-location">📍 {location}</span>
        </div>
        <div className="event-list-footer">
          <span className="event-list-price">{price}</span>
          <Link href={`/events/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`} className={compact ? "event-list-button event-list-button--sm" : "event-list-button"}>View Details</Link>
        </div>
      </div>
    </div>
  );
}