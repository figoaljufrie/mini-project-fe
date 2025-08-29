import Image from "next/image";
import { events } from "@/lib/data"
import { useState } from "react";

export default function EventSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const currentEvent = events[currentIndex];

  return (
    <div className="event-slide-container">
      <Image
        src={currentEvent.image}
        alt={currentEvent.title}
        fill
        className="event-slide-image"
        priority
      />
      
      {/* Overlay */}
      <div className="event-slide-overlay">
        <div className="event-slide-content">
          <h2 className="event-slide-title">{currentEvent.title}</h2>
          <div className="event-slide-meta">
            <span className="event-slide-date">📅 {currentEvent.date}</span>
            <span className="event-slide-location">📍 {currentEvent.location}</span>
          </div>
          <div className="event-slide-price">
            Rp {currentEvent.price.toLocaleString()}
          </div>
          <button className="event-slide-cta">
            Book Now
          </button>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="event-slide-nav event-slide-nav-prev"
        aria-label="Previous slide"
      >
        <svg className="event-slide-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="event-slide-nav event-slide-nav-next"
        aria-label="Next slide"
      >
        <svg className="event-slide-nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="event-slide-dots">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`event-slide-dot ${index === currentIndex ? 'event-slide-dot-active' : ''}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}