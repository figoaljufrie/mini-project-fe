"use client";

import EventCard from "./event-card";

export interface BrowsingEventItem {
  title: string;
  date: string;
  location: string;
  price: string;
  image: string;
  organizer: string;
}

export default function EventList({ events, compact = true }: { events: BrowsingEventItem[]; compact?: boolean }) {
  return (
    <div className={compact ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4" : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"}>
      {events.map((event, idx) => (
        <EventCard key={idx} {...event} compact={compact} />
      ))}
    </div>
  );
}