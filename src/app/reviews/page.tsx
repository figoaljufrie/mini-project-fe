// Halaman utama untuk menampilkan semua reviews dengan fitur filter dan search

"use client";

import { useState, useEffect } from 'react';
import { reviews, getReviewStats, ReviewStats } from '@/lib/data/review';
import { organizers } from '@/lib/data/organizer';
import { paymentMethods, bankOptions, getPopularPaymentMethods } from '@/lib/data/payment-method';
import ReviewCard from '@/components/reviews/review-card';
import RatingStars from '@/components/reviews/rating-stars';
import Navbar from '@/components/event-browsing/navbar';
import Footer from '@/components/event-browsing/footer';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function ReviewsPage() {
  const [filteredReviews, setFilteredReviews] = useState(reviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedOrganizer, setSelectedOrganizer] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'helpful'>('date');
  const [showStats, setShowStats] = useState(true);
  const [showPaymentMethods, setShowPaymentMethods] = useState(true);

  // Get stats untuk semua reviews
  const stats: ReviewStats = getReviewStats(reviews);

  // Get popular payment methods
  const popularPaymentMethods = getPopularPaymentMethods();

  // Filter dan search reviews
  useEffect(() => {
    let filtered = [...reviews];

    // Search by text
    if (searchQuery) {
      filtered = filtered.filter(review =>
        review.review.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.organizerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by rating
    if (selectedRating !== null) {
      filtered = filtered.filter(review => review.rating === selectedRating);
    }

    // Filter by organizer
    if (selectedOrganizer !== 'all') {
      filtered = filtered.filter(review => review.organizerId === selectedOrganizer);
    }

    // Sort reviews
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'helpful':
          return b.helpfulCount - a.helpfulCount;
        default:
          return 0;
      }
    });

    setFilteredReviews(filtered);
  }, [searchQuery, selectedRating, selectedOrganizer, sortBy]);

  // Handle helpful click
  const handleHelpfulClick = (reviewId: string) => {
    // Di sini bisa implementasi untuk update helpful count
    console.log('Review helpful:', reviewId);
  };

  // Handle report click
  const handleReportClick = (reviewId: string) => {
    // Di sini bisa implementasi untuk report review
    console.log('Report review:', reviewId);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📝 Reviews & Ratings EventFinder
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Lihat pengalaman customer yang sudah menghadiri event. 
            Temukan event terbaik berdasarkan review dan rating dari komunitas.
          </p>
        </div>

        {/* Stats Overview */}
        {showStats && (
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  Statistik Reviews
                </CardTitle>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ✕
                </button>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                {/* Total Reviews */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">
                    {stats.totalReviews}
                  </div>
                  <div className="text-sm text-gray-600">Total Reviews</div>
                </div>

                {/* Average Rating */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-600 mb-2">
                    {stats.averageRating}
                  </div>
                  <div className="text-sm text-gray-600">Rating Rata-rata</div>
                  <RatingStars rating={stats.averageRating} size="sm" />
                </div>

                {/* Verified Reviews */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">
                    {stats.verifiedReviews}
                  </div>
                  <div className="text-sm text-gray-600">Reviews Terverifikasi</div>
                </div>

                {/* Total Photos */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {stats.totalPhotos}
                  </div>
                  <div className="text-sm text-gray-600">Total Foto</div>
                </div>

                {/* Rating Distribution */}
                <div className="text-center">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">
                    {stats.ratingDistribution["5"]}
                  </div>
                  <div className="text-sm text-gray-600">5 ⭐ Reviews</div>
                </div>
              </div>

              {/* Rating Distribution Chart */}
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Distribusi Rating</h3>
                <div className="space-y-2">
                  {Object.entries(stats.ratingDistribution).reverse().map(([rating, count]) => (
                    <div key={rating} className="flex items-center gap-3">
                      <div className="w-8 text-sm font-medium text-gray-600">
                        {rating} ⭐
                      </div>
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div
                          className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                          style={{
                            width: `${(count / stats.totalReviews) * 100}%`
                          }}
                        ></div>
                      </div>
                      <div className="w-12 text-sm text-gray-600 text-right">
                        {count}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Payment Methods Section - Sinkron dengan halaman Payment */}
        {showPaymentMethods && (
          <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-green-50 to-emerald-50">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-green-800 flex items-center gap-3">
                  <span className="text-3xl">💳</span>
                  Metode Pembayaran yang Tersedia
                </CardTitle>
                <button
                  onClick={() => setShowPaymentMethods(false)}
                  className="text-green-500 hover:text-green-700 transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-green-700 text-sm">
                Informasi metode pembayaran yang konsisten dengan halaman Checkout & Payment
              </p>
            </CardHeader>
            
            <CardContent>
              {/* Popular Payment Methods */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-green-800 mb-4">Metode Pembayaran Populer</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {popularPaymentMethods.map((method) => (
                    <div key={method.id} className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{method.icon}</div>
                        <div>
                          <h4 className="font-semibold text-gray-800">{method.name}</h4>
                          <p className="text-sm text-gray-600">{method.description}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs text-green-600">Biaya: Rp {method.fee.toLocaleString("id-ID")}</span>
                            <span className="text-xs text-green-600">{method.processingTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bank Transfer Options */}
              <div>
                <h3 className="text-lg font-semibold text-green-800 mb-4">Opsi Bank Transfer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {bankOptions.map((bank) => (
                    <div key={bank.id} className="p-4 bg-white rounded-xl border border-green-200 shadow-sm">
                      <div className="text-center">
                        <div className="text-2xl mb-2">{bank.logo}</div>
                        <h4 className="font-semibold text-gray-800 text-sm">{bank.name}</h4>
                        <p className="text-xs text-gray-600 mt-1">{bank.accountNumber}</p>
                        <p className="text-xs text-green-600 mt-1 font-medium">{bank.accountName}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Integration Notice */}
              <div className="mt-6 p-4 bg-green-100 rounded-xl border border-green-200">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🔗</span>
                  <div>
                    <p className="font-semibold text-green-800">Terintegrasi dengan Checkout & Payment</p>
                    <p className="text-sm text-green-700">
                      Metode pembayaran ini tersedia saat Anda melakukan checkout dan pembayaran event.
                      Data yang ditampilkan konsisten di seluruh aplikasi.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Filters & Search */}
        <Card className="mb-8 border-0 shadow-xl bg-gradient-to-br from-white to-gray-50">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🔍 Cari Reviews
                </label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari berdasarkan event, organizer, atau review..."
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                />
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ⭐ Filter Rating
                </label>
                <select
                  value={selectedRating || ''}
                  onChange={(e) => setSelectedRating(e.target.value ? parseInt(e.target.value) : null)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                >
                  <option value="">Semua Rating</option>
                  <option value="5">5 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="1">1 ⭐</option>
                </select>
              </div>

              {/* Organizer Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  🏢 Filter Organizer
                </label>
                <select
                  value={selectedOrganizer}
                  onChange={(e) => setSelectedOrganizer(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                >
                  <option value="all">Semua Organizer</option>
                  {organizers.map(org => (
                    <option key={org.id} value={org.id}>
                      {org.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700">Urutkan berdasarkan:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'date' | 'rating' | 'helpful')}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="date">Tanggal Terbaru</option>
                  <option value="rating">Rating Tertinggi</option>
                  <option value="helpful">Paling Membantu</option>
                </select>
              </div>

              <div className="text-sm text-gray-600">
                Menampilkan {filteredReviews.length} dari {reviews.length} reviews
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <div className="space-y-6">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Tidak ada reviews ditemukan
              </h3>
              <p className="text-gray-600">
                Coba ubah filter atau kata kunci pencarian Anda
              </p>
            </div>
          ) : (
            filteredReviews.map(review => (
              <ReviewCard
                key={review.id}
                review={review}
                showEventInfo
                showOrganizerInfo
                onHelpfulClick={handleHelpfulClick}
                onReportClick={handleReportClick}
              />
            ))
          )}
        </div>

        {/* Show Stats Button */}
        {!showStats && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowStats(true)}
              className="px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
            >
              📊 Tampilkan Statistik
            </button>
          </div>
        )}

        {/* Show Payment Methods Button */}
        {!showPaymentMethods && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowPaymentMethods(true)}
              className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors"
            >
              💳 Tampilkan Metode Pembayaran
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}