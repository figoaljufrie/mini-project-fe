// 📁 File: src/components/reviews/ReviewCard.tsx
// 🎯 Tujuan: Component untuk menampilkan card review individual dengan rating, foto, dan informasi customer
// 📚 Pembelajaran: React props, Conditional rendering, Image handling, User interaction

"use client";

import { useState } from "react";
import { Review, formatReviewDate } from "@/lib/data/review";
import RatingStars from "./rating-stars";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

interface ReviewCardProps {
  review: Review;
  showEventInfo?: boolean; // Apakah menampilkan info event
  showOrganizerInfo?: boolean; // Apakah menampilkan info organizer
  compact?: boolean; // Mode compact untuk list
  onHelpfulClick?: (reviewId: string) => void; // Callback untuk helpful button
  onReportClick?: (reviewId: string) => void; // Callback untuk report button
  className?: string; // Additional CSS classes
}

export default function ReviewCard({
  review,
  showEventInfo = false,
  showOrganizerInfo = false,
  compact = false,
  onHelpfulClick,
  onReportClick,
  className = "",
}: ReviewCardProps) {
  const [showFullReview, setShowFullReview] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  // Handle helpful button click
  const handleHelpfulClick = () => {
    if (onHelpfulClick) {
      onHelpfulClick(review.id);
    }
  };

  // Handle report button click
  const handleReportClick = () => {
    if (onReportClick) {
      onReportClick(review.id);
    }
  };

  // Check apakah review panjang dan perlu truncate
  const isLongReview = review.review.length > 200;
  const displayReview =
    showFullReview || !isLongReview
      ? review.review
      : review.review.substring(0, 200) + "...";

  // Render photo gallery
  const renderPhotos = () => {
    if (!review.photos || review.photos.length === 0) return null;

    return (
      <div className="mt-3">
        <button
          onClick={() => setShowPhotos(!showPhotos)}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          📸 Lihat {review.photos.length} foto
        </button>

        {showPhotos && (
          <div className="mt-2 grid grid-cols-2 gap-2">
            {review.photos.map((photo, index) => (
              <div key={index} className="relative group">
                <img
                  src={photo}
                  alt={`Foto review ${index + 1}`}
                  className="w-full h-24 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => window.open(photo, "_blank")}
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 text-xs">
                    Klik untuk lihat
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card
      className={`hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar Customer */}
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-sm">
              {review.customerName.charAt(0).toUpperCase()}
            </div>

            {/* Info Customer */}
            <div>
              <h4 className="font-semibold text-gray-800">
                {review.customerName}
              </h4>
              <p className="text-sm text-gray-500">
                {formatReviewDate(review.reviewDate)}
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <RatingStars rating={review.rating} size="sm" />
            <span className="text-sm font-medium text-gray-700">
              {review.rating}.0
            </span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Event & Organizer Info (opsional) */}
        {showEventInfo && (
          <div className="p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-lg border border-gray-100">
            <h5 className="font-medium text-gray-800 mb-1">
              Event: {review.eventTitle}
            </h5>
            {showOrganizerInfo && (
              <p className="text-sm text-gray-600">
                Organizer: {review.organizerName}
              </p>
            )}
          </div>
        )}

        {/* Review Content */}
        <div>
          <p className="text-gray-700 leading-relaxed">{displayReview}</p>

          {/* Show more/less button untuk review panjang */}
          {isLongReview && (
            <button
              onClick={() => setShowFullReview(!showFullReview)}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium mt-2"
            >
              {showFullReview ? "Tampilkan lebih sedikit" : "Baca selengkapnya"}
            </button>
          )}
        </div>

        {/* Photos */}
        {renderPhotos()}
      </CardContent>

      <CardFooter className="pt-3 border-t border-gray-100">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            {/* Helpful Button */}
            <button
              onClick={handleHelpfulClick}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span>👍</span>
              <span>Membantu ({review.helpfulCount})</span>
            </button>

            {/* Report Button */}
            <button
              onClick={handleReportClick}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-red-600 transition-colors"
            >
              <span>🚨</span>
              <span>Report</span>
            </button>
          </div>

          {/* Verification Badge */}
          {review.isVerified && (
            <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
              <span>✅</span>
              <span>Terverifikasi</span>
            </div>
          )}
        </div>
      </CardFooter>

      {/* Compact Mode - Hide beberapa elemen */}
      {compact && (
        <div className="px-4 pb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>{review.customerName}</span>
            <span>{formatReviewDate(review.reviewDate)}</span>
          </div>
        </div>
      )}
    </Card>
  );
}

// Contoh penggunaan:
// <ReviewCard review={reviewData} showEventInfo showOrganizerInfo />
// <ReviewCard review={reviewData} compact />
