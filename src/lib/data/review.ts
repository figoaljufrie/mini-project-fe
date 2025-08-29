// Menyimpan data reviews dan ratings dari customer yang sudah menghadiri event

export interface Review {
  id: string;
  eventId: string;
  eventTitle: string;
  organizerId: string;
  organizerName: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  rating: number; // 1-5 bintang
  review: string;
  reviewDate: string;
  isVerified: boolean; // Verifikasi bahwa customer benar-benar hadir
  eventDate: string; // Tanggal event untuk validasi
  photos?: string[]; // Foto dari event (opsional)
  helpfulCount: number; // Jumlah yang menandai review ini membantu
  reportCount: number; // Jumlah report untuk review ini
}

export interface ReviewStats {
  totalReviews: number;
  averageRating: number;
  ratingDistribution: {
    "5": number;
    "4": number;
    "3": number;
    "2": number;
    "1": number;
  };
  verifiedReviews: number;
  totalPhotos: number;
}

// Sample data reviews untuk testing
export const reviews: Review[] = [
  {
    id: "rev-001",
    eventId: "konser-musik-jakarta",
    eventTitle: "Konser Musik Jakarta",
    organizerId: "org-001",
    organizerName: "Jakarta Music Festival",
    customerId: "cust-001",
    customerName: "Budi Santoso",
    customerEmail: "budi@email.com",
    rating: 5,
    review:
      "Event yang luar biasa! Sound system bagus, line up artis top, dan venue yang nyaman. Worth it banget untuk harga tiketnya. Akan datang lagi tahun depan!",
    reviewDate: "2024-12-16",
    isVerified: true,
    eventDate: "2024-12-15",
    photos: ["/photos/review-001-1.jpg", "/photos/review-001-2.jpg"],
    helpfulCount: 12,
    reportCount: 0,
  },
  {
    id: "rev-002",
    eventId: "konser-musik-jakarta",
    eventTitle: "Konser Musik Jakarta",
    organizerId: "org-001",
    organizerName: "Jakarta Music Festival",
    customerId: "cust-002",
    customerName: "Sari Indah",
    customerEmail: "sari@email.com",
    rating: 4,
    review:
      "Overall bagus, tapi ada beberapa hal yang bisa diperbaiki. Parking area agak sempit dan antrian toilet panjang. Tapi untuk musik dan atmosphere sangat memuaskan!",
    reviewDate: "2024-12-16",
    isVerified: true,
    eventDate: "2024-12-15",
    photos: ["/photos/review-002-1.jpg"],
    helpfulCount: 8,
    reportCount: 0,
  },
  {
    id: "rev-003",
    eventId: "festival-seni-bandung",
    eventTitle: "Festival Seni Bandung",
    organizerId: "org-002",
    organizerName: "Bandung Art Collective",
    customerId: "cust-003",
    customerName: "Ahmad Rahman",
    customerEmail: "ahmad@email.com",
    rating: 5,
    review:
      "Festival seni yang sangat inspiratif! Karya-karya yang ditampilkan luar biasa dan artist yang diundang sangat berkualitas. Venue di Gedung Merdeka sangat cocok untuk event seperti ini.",
    reviewDate: "2024-12-21",
    isVerified: true,
    eventDate: "2024-12-20",
    photos: [
      "/photos/review-003-1.jpg",
      "/photos/review-003-2.jpg",
      "/photos/review-003-3.jpg",
    ],
    helpfulCount: 15,
    reportCount: 0,
  },
  {
    id: "rev-004",
    eventId: "workshop-kuliner",
    eventTitle: "Workshop Kuliner Nusantara",
    organizerId: "org-003",
    organizerName: "Nusantara Culinary School",
    customerId: "cust-004",
    customerName: "Dewi Lestari",
    customerEmail: "dewi@email.com",
    rating: 3,
    review:
      "Workshop cukup informatif, tapi durasi terlalu singkat untuk praktik yang memadai. Chef yang mengajar sangat ramah dan sabar. Bahan-bahan yang disediakan fresh dan berkualitas.",
    reviewDate: "2024-12-18",
    isVerified: true,
    eventDate: "2024-12-17",
    photos: [],
    helpfulCount: 5,
    reportCount: 0,
  },
  {
    id: "rev-005",
    eventId: "workshop-kuliner",
    eventTitle: "Workshop Kuliner Nusantara",
    organizerId: "org-003",
    organizerName: "Nusantara Culinary School",
    customerId: "cust-005",
    customerName: "Rudi Hermawan",
    customerEmail: "rudi@email.com",
    rating: 4,
    review:
      "Pengalaman belajar memasak yang menyenangkan! Chef memberikan tips dan trik yang sangat berguna. Resep yang diajarkan mudah diikuti dan hasilnya enak. Recommended!",
    reviewDate: "2024-12-18",
    isVerified: true,
    eventDate: "2024-12-17",
    photos: ["/photos/review-005-1.jpg"],
    helpfulCount: 9,
    reportCount: 0,
  },
];

// Fungsi helper untuk mendapatkan reviews berdasarkan event
export function getReviewsByEvent(eventId: string): Review[] {
  return reviews.filter((review) => review.eventId === eventId);
}

// Fungsi helper untuk mendapatkan reviews berdasarkan organizer
export function getReviewsByOrganizer(organizerId: string): Review[] {
  return reviews.filter((review) => review.organizerId === organizerId);
}

// Fungsi helper untuk menghitung stats reviews
export function getReviewStats(reviews: Review[]): ReviewStats {
  if (reviews.length === 0) {
    return {
      totalReviews: 0,
      averageRating: 0,
      ratingDistribution: { "5": 0, "4": 0, "3": 0, "2": 0, "1": 0 },
      verifiedReviews: 0,
      totalPhotos: 0,
    };
  }

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = totalRating / reviews.length;

  const ratingDistribution = {
    "5": reviews.filter((r) => r.rating === 5).length,
    "4": reviews.filter((r) => r.rating === 4).length,
    "3": reviews.filter((r) => r.rating === 3).length,
    "2": reviews.filter((r) => r.rating === 2).length,
    "1": reviews.filter((r) => r.rating === 1).length,
  };

  const verifiedReviews = reviews.filter((r) => r.isVerified).length;
  const totalPhotos = reviews.reduce(
    (sum, r) => sum + (r.photos?.length || 0),
    0
  );

  return {
    totalReviews: reviews.length,
    averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal
    ratingDistribution,
    verifiedReviews,
    totalPhotos,
  };
}

// Fungsi untuk validasi review (hanya bisa review setelah event selesai)
export function canLeaveReview(eventDate: string): boolean {
  const eventDateTime = new Date(eventDate);
  const currentDate = new Date();
  return currentDate > eventDateTime;
}

// Fungsi untuk format tanggal review
export function formatReviewDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
