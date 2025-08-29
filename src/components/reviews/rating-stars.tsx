// 📁 File: src/components/reviews/RatingStars.tsx
// 🎯 Tujuan: Component untuk menampilkan dan memilih rating bintang (1-5)
// 📚 Pembelajaran: React props, Event handling, Conditional rendering, CSS classes

"use client";

import { useState } from "react";

interface RatingStarsProps {
  rating: number; // Rating yang akan ditampilkan (1-5)
  maxRating?: number; // Maksimal rating (default: 5)
  size?: "sm" | "md" | "lg"; // Ukuran bintang
  interactive?: boolean; // Apakah bisa diinteraksi (untuk form)
  onRatingChange?: (rating: number) => void; // Callback ketika rating berubah
  showNumber?: boolean; // Apakah menampilkan angka rating
  className?: string; // Additional CSS classes
}

export default function RatingStars({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onRatingChange,
  showNumber = false,
  className = "",
}: RatingStarsProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(rating);

  // Size classes untuk bintang
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  // Handle hover pada bintang
  const handleMouseEnter = (starRating: number) => {
    if (interactive) {
      setHoverRating(starRating);
    }
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (interactive) {
      setHoverRating(0);
    }
  };

  // Handle click pada bintang
  const handleClick = (starRating: number) => {
    if (interactive && onRatingChange) {
      setSelectedRating(starRating);
      onRatingChange(starRating);
    }
  };

  // Render bintang individual
  const renderStar = (starNumber: number) => {
    const isFilled = interactive
      ? hoverRating >= starNumber || selectedRating >= starNumber
      : rating >= starNumber;

    const isHalf =
      !isFilled && rating >= starNumber - 0.5 && rating < starNumber;

    return (
      <button
        key={starNumber}
        type="button"
        className={`${sizeClasses[size]} transition-all duration-200 ${
          interactive ? "cursor-pointer hover:scale-110" : "cursor-default"
        }`}
        onMouseEnter={() => handleMouseEnter(starNumber)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(starNumber)}
        disabled={!interactive}
      >
        {/* Bintang penuh */}
        {isFilled && (
          <svg
            className="w-full h-full text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}

        {/* Bintang setengah */}
        {isHalf && (
          <div className="relative w-full h-full">
            <svg
              className="w-full h-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <div className="absolute inset-0 overflow-hidden">
              <svg
                className="w-full h-full text-yellow-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        )}

        {/* Bintang kosong */}
        {!isFilled && !isHalf && (
          <svg
            className="w-full h-full text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        )}
      </button>
    );
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Bintang rating */}
      <div className="flex items-center gap-1">
        {Array.from({ length: maxRating }, (_, i) => renderStar(i + 1))}
      </div>

      {/* Angka rating (opsional) */}
      {showNumber && (
        <span className="text-sm font-medium text-gray-700">
          {interactive ? selectedRating : rating}
          <span className="text-gray-400">/{maxRating}</span>
        </span>
      )}

      {/* Label rating (untuk accessibility) */}
      {interactive && (
        <span className="sr-only">
          Rating: {selectedRating} dari {maxRating} bintang
        </span>
      )}
    </div>
  );
}

// Contoh penggunaan:
// <RatingStars rating={4.5} size="lg" showNumber />
// <RatingStars rating={0} interactive onRatingChange={(r) => console.log(r)} />
