// 📁 File: src/components/reviews/ReviewForm.tsx
// 🎯 Tujuan: Form untuk customer submit review dan rating setelah menghadiri event
// 📚 Pembelajaran: React forms, File upload, State management, Form validation

"use client";

import { useState, useRef } from 'react';
import RatingStars from './rating-stars';
import { canLeaveReview } from '@/lib/data/review';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface ReviewFormProps {
  eventId: string;
  eventTitle: string;
  eventDate: string;
  organizerId: string;
  organizerName: string;
  onSubmit: (reviewData: ReviewFormData) => void;
  onCancel: () => void;
  className?: string;
}

export interface ReviewFormData {
  eventId: string;
  organizerId: string;
  rating: number;
  review: string;
  photos: File[];
  customerName: string;
  customerEmail: string;
}

export default function ReviewForm({
  eventId,
  eventTitle,
  eventDate,
  organizerId,
  organizerName,
  onSubmit,
  onCancel,
  className = ''
}: ReviewFormProps) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Validasi form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (rating === 0) {
      newErrors.rating = 'Pilih rating bintang';
    }

    if (!review.trim()) {
      newErrors.review = 'Tulis review Anda';
    } else if (review.trim().length < 10) {
      newErrors.review = 'Review minimal 10 karakter';
    }

    if (!customerName.trim()) {
      newErrors.customerName = 'Masukkan nama Anda';
    }

    if (!customerEmail.trim()) {
      newErrors.customerEmail = 'Masukkan email Anda';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      newErrors.customerEmail = 'Format email tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const reviewData: ReviewFormData = {
        eventId,
        organizerId,
        rating,
        review: review.trim(),
        photos,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim()
      };

      await onSubmit(reviewData);
      
      // Reset form setelah berhasil
      setRating(0);
      setReview('');
      setPhotos([]);
      setCustomerName('');
      setCustomerEmail('');
      setErrors({});
      
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isValidType = ['image/jpeg', 'image/png', 'image/gif'].includes(file.type);
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB max
      
      if (!isValidType) {
        alert(`File ${file.name} bukan format gambar yang valid`);
      }
      if (!isValidSize) {
        alert(`File ${file.name} terlalu besar (max 5MB)`);
      }
      
      return isValidType && isValidSize;
    });

    setPhotos(prev => [...prev, ...validFiles].slice(0, 5)); // Max 5 foto
  };

  // Remove photo
  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  // Check apakah bisa submit review
  const canSubmit = canLeaveReview(eventDate);

  if (!canSubmit) {
    return (
      <div className={`bg-yellow-50 border border-yellow-200 rounded-xl p-6 text-center ${className}`}>
        <div className="text-yellow-600 text-4xl mb-3">⏰</div>
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">
          Belum Bisa Submit Review
        </h3>
        <p className="text-yellow-700 mb-4">
          Anda hanya bisa submit review setelah event selesai. Event ini akan berlangsung pada{' '}
          <span className="font-semibold">{new Date(eventDate).toLocaleDateString('id-ID')}</span>
        </p>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
        >
          Kembali
        </button>
      </div>
    );
  }

  return (
    <Card className={`border-0 shadow-xl bg-gradient-to-br from-white to-gray-50 ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
          <span className="text-3xl">✍️</span>
          Tulis Review Anda
        </CardTitle>
        <p className="text-gray-600 text-lg">
          Bagikan pengalaman Anda setelah menghadiri event ini
        </p>
        
        {/* Event Info */}
        <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <h4 className="font-semibold text-gray-800 text-lg">{eventTitle}</h4>
          <p className="text-sm text-gray-600">
            🗓️ Event selesai: {new Date(eventDate).toLocaleDateString('id-ID')}
          </p>
          <p className="text-sm text-gray-600">
            🏢 Organizer: {organizerName}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Rating Selection */}
        <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border border-yellow-100">
          <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-2xl">⭐</span>
            Berikan Rating
          </label>
          <RatingStars
            rating={rating}
            interactive
            onRatingChange={setRating}
            size="lg"
            showNumber
          />
          {errors.rating && (
            <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
              <span>⚠️</span>
              {errors.rating}
            </p>
          )}
        </div>

        {/* Review Text */}
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border border-green-100">
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-2xl">📝</span>
            Review Anda *
          </label>
          <textarea
            id="review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            rows={5}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 resize-none bg-white/80 backdrop-blur-sm"
            placeholder="Bagikan pengalaman Anda tentang event ini. Apa yang Anda suka? Apa yang bisa diperbaiki?"
            maxLength={1000}
          />
          <div className="flex justify-between items-center mt-1">
            {errors.review && (
              <p className="text-red-600 text-sm flex items-center gap-1">
                <span>⚠️</span>
                {errors.review}
              </p>
            )}
            <span className="text-sm text-gray-500 ml-auto">
              {review.length}/1000 karakter
            </span>
          </div>
        </div>

        {/* Photo Upload */}
        <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <span className="text-2xl">📸</span>
            Upload Foto (Opsional)
          </label>
          <div className="space-y-3">
            {/* File Input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            {/* Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={photos.length >= 5}
              className="w-full py-3 px-4 border-2 border-dashed border-purple-300 rounded-xl text-gray-600 hover:border-purple-400 hover:text-purple-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-white/80 backdrop-blur-sm"
            >
              <div className="text-center">
                <span className="text-2xl mb-2 block">📸</span>
                <span className="font-medium">
                  {photos.length >= 5 ? 'Maksimal 5 foto' : 'Klik untuk upload foto'}
                </span>
                <p className="text-sm text-gray-500 mt-1">
                  Format: JPG, PNG, GIF (max 5MB per foto)
                </p>
              </div>
            </button>

            {/* Photo Preview */}
            {photos.length > 0 && (
              <div className="grid grid-cols-2 gap-3">
                {photos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => removePhoto(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-sm hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Customer Information */}
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-cyan-50 rounded-xl border border-indigo-100">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <span className="text-2xl">👤</span>
            Informasi Customer
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Anda *
              </label>
              <input
                id="customerName"
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="Masukkan nama lengkap"
              />
              {errors.customerName && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.customerName}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-2">
                Email *
              </label>
              <input
                id="customerEmail"
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300 bg-white/80 backdrop-blur-sm"
                placeholder="email@example.com"
              />
              {errors.customerEmail && (
                <p className="text-red-600 text-sm mt-1 flex items-center gap-1">
                  <span>⚠️</span>
                  {errors.customerEmail}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="submit"
            disabled={isSubmitting || rating === 0}
            className="flex-1 bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Mengirim Review...</span>
              </div>
            ) : (
              'Kirim Review'
            )}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 border-2 border-gray-300 text-gray-600 rounded-xl font-semibold hover:border-purple-400 hover:text-purple-600 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Batal
          </button>
        </div>

        {/* Info */}
        <div className="text-xs text-gray-500 text-center p-3 bg-gray-50 rounded-lg">
          <span className="text-blue-600">ℹ️</span> Review Anda akan diverifikasi terlebih dahulu sebelum ditampilkan. 
          Hanya customer yang benar-benar menghadiri event yang bisa submit review.
        </div>
      </CardContent>
    </Card>
  );
}

// Contoh penggunaan:
// <ReviewForm
//   eventId="event-123"
//   eventTitle="Konser Musik Jakarta"
//   eventDate="2024-12-15"
//   organizerId="org-001"
//   organizerName="Jakarta Music Festival"
//   onSubmit={handleReviewSubmit}
//   onCancel={handleCancel}
// />