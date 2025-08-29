// Menyimpan data organizer event dengan profile, stats, dan ratings

export interface Organizer {
  id: string;
  name: string;
  slug: string;
  description: string;
  logo: string;
  coverImage: string;
  website?: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  establishedDate: string;
  totalEvents: number;
  totalAttendees: number;
  averageRating: number;
  totalReviews: number;
  socialMedia: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  categories: string[]; // Kategori event yang diorganisir
  verified: boolean; // Status verifikasi organizer
  featured: boolean; // Status featured organizer
}

export interface OrganizerStats {
  totalEvents: number;
  totalAttendees: number;
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    "5": number;
    "4": number;
    "3": number;
    "2": number;
    "1": number;
  };
  monthlyEvents: {
    [key: string]: number; // Format: "2024-12": 5
  };
  topEventCategories: {
    category: string;
    count: number;
  }[];
}

// Sample data organizers untuk testing
export const organizers: Organizer[] = [
  {
    id: "org-001",
    name: "Jakarta Music Festival",
    slug: "jakarta-music-festival",
    description:
      "Organizer terkemuka untuk event musik di Jakarta. Spesialisasi dalam konser musik, festival, dan event entertainment berkualitas tinggi dengan line-up artis lokal dan internasional.",
    logo: "/logos/jakarta-music-festival.png",
    coverImage: "/covers/jakarta-music-festival-cover.jpg",
    website: "https://jakartamusicfestival.com",
    email: "info@jakartamusicfestival.com",
    phone: "+62-21-555-0123",
    address: "Jl. Sudirman No. 123, Jakarta Pusat",
    city: "Jakarta",
    establishedDate: "2018-03-15",
    totalEvents: 45,
    totalAttendees: 125000,
    averageRating: 4.6,
    totalReviews: 89,
    socialMedia: {
      instagram: "@jakartamusicfest",
      facebook: "JakartaMusicFestival",
      twitter: "@JakartaMusicFest",
    },
    categories: ["Music", "Entertainment", "Festival", "Concert"],
    verified: true,
    featured: true,
  },
  {
    id: "org-002",
    name: "Bandung Art Collective",
    slug: "bandung-art-collective",
    description:
      "Komunitas seni yang berdedikasi untuk mempromosikan seni kontemporer Indonesia. Mengadakan pameran, workshop, dan festival seni yang inovatif dan inspiratif.",
    logo: "/logos/bandung-art-collective.png",
    coverImage: "/covers/bandung-art-collective-cover.jpg",
    website: "https://bandungartcollective.org",
    email: "hello@bandungartcollective.org",
    phone: "+62-22-555-0456",
    address: "Jl. Asia Afrika No. 67, Bandung",
    city: "Bandung",
    establishedDate: "2019-07-22",
    totalEvents: 28,
    totalAttendees: 42000,
    averageRating: 4.8,
    totalReviews: 56,
    socialMedia: {
      instagram: "@bandungartcollective",
      facebook: "BandungArtCollective",
    },
    categories: ["Art", "Culture", "Exhibition", "Workshop"],
    verified: true,
    featured: false,
  },
  {
    id: "org-003",
    name: "Nusantara Culinary School",
    slug: "nusantara-culinary-school",
    description:
      "Sekolah kuliner yang mengajarkan masakan tradisional dan modern Indonesia. Menyelenggarakan workshop, cooking class, dan event kuliner untuk semua level.",
    logo: "/logos/nusantara-culinary.png",
    coverImage: "/covers/nusantara-culinary-cover.jpg",
    website: "https://nusantaraculinary.com",
    email: "info@nusantaraculinary.com",
    phone: "+62-31-555-0789",
    address: "Jl. Tunjungan No. 45, Surabaya",
    city: "Surabaya",
    establishedDate: "2020-01-10",
    totalEvents: 67,
    totalAttendees: 8900,
    averageRating: 4.3,
    totalReviews: 123,
    socialMedia: {
      instagram: "@nusantaraculinary",
      facebook: "NusantaraCulinarySchool",
      youtube: "NusantaraCulinary",
    },
    categories: ["Culinary", "Education", "Workshop", "Cooking Class"],
    verified: true,
    featured: false,
  },
  {
    id: "org-004",
    name: "Surabaya Tech Meetup",
    slug: "surabaya-tech-meetup",
    description:
      "Komunitas teknologi yang mengadakan meetup, workshop, dan konferensi untuk developer, designer, dan tech enthusiast di Surabaya dan sekitarnya.",
    logo: "/logos/surabaya-tech-meetup.png",
    coverImage: "/covers/surabaya-tech-meetup-cover.jpg",
    email: "team@surabayatechmeetup.com",
    phone: "+62-31-555-0321",
    address: "Jl. Basuki Rahmat No. 89, Surabaya",
    city: "Surabaya",
    establishedDate: "2021-05-18",
    totalEvents: 34,
    totalAttendees: 15600,
    averageRating: 4.5,
    totalReviews: 78,
    socialMedia: {
      instagram: "@surabayatechmeetup",
      twitter: "@SurabayaTech",
      linkedin: "surabaya-tech-meetup",
    },
    categories: ["Technology", "Education", "Meetup", "Workshop"],
    verified: true,
    featured: false,
  },
  {
    id: "org-005",
    name: "Yogyakarta Cultural Center",
    slug: "yogyakarta-cultural-center",
    description:
      "Pusat budaya yang mempromosikan seni dan budaya tradisional Jawa. Mengadakan pertunjukan wayang, tari tradisional, dan workshop budaya.",
    logo: "/logos/yogyakarta-cultural.png",
    coverImage: "/covers/yogyakarta-cultural-cover.jpg",
    website: "https://yogyakartacultural.org",
    email: "info@yogyakartacultural.org",
    phone: "+62-27-555-0654",
    address: "Jl. Malioboro No. 12, Yogyakarta",
    city: "Yogyakarta",
    establishedDate: "2017-11-30",
    totalEvents: 52,
    totalAttendees: 68000,
    averageRating: 4.7,
    totalReviews: 94,
    socialMedia: {
      instagram: "@yogyakartacultural",
      facebook: "YogyakartaCulturalCenter",
    },
    categories: ["Culture", "Traditional", "Performance", "Workshop"],
    verified: true,
    featured: true,
  },
];

// Fungsi helper untuk mendapatkan organizer berdasarkan slug
export function getOrganizerBySlug(slug: string): Organizer | undefined {
  return organizers.find((org) => org.slug === slug);
}

// Fungsi helper untuk mendapatkan organizer berdasarkan ID
export function getOrganizerById(id: string): Organizer | undefined {
  return organizers.find((org) => org.id === id);
}

// Fungsi helper untuk mendapatkan semua organizer
export function getAllOrganizers(): Organizer[] {
  return organizers;
}

// Fungsi helper untuk mendapatkan featured organizers
export function getFeaturedOrganizers(): Organizer[] {
  return organizers.filter((org) => org.featured);
}

// Fungsi helper untuk mendapatkan organizer berdasarkan kategori
export function getOrganizersByCategory(category: string): Organizer[] {
  return organizers.filter((org) =>
    org.categories.some((cat) =>
      cat.toLowerCase().includes(category.toLowerCase())
    )
  );
}

// Fungsi helper untuk mendapatkan organizer berdasarkan kota
export function getOrganizersByCity(city: string): Organizer[] {
  return organizers.filter(
    (org) => org.city.toLowerCase() === city.toLowerCase()
  );
}

// Fungsi helper untuk search organizer
export function searchOrganizers(query: string): Organizer[] {
  const lowercaseQuery = query.toLowerCase();
  return organizers.filter(
    (org) =>
      org.name.toLowerCase().includes(lowercaseQuery) ||
      org.description.toLowerCase().includes(lowercaseQuery) ||
      org.categories.some((cat) => cat.toLowerCase().includes(lowercaseQuery))
  );
}
