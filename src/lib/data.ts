export type Event = {
  id: string;
  title: string;
  location: string;
  category: string;
  date: string;
  image: string;
  price: number;
};

export const events = [
  {
    id: 1,
    title: "Konser Musik Jakarta",
    date: "2025-09-15",
    location: "Jakarta Convention Center",
    image: "https://source.unsplash.com/random/400x300?concert",
    category: "Musik",
    price: 150000,
  },
  {
    id: 2,
    title: "Tech Expo 2025",
    date: "2025-10-02",
    location: "ICE BSD, Tangerang",
    image: "https://source.unsplash.com/random/400x300?technology",
    category: "Teknologi",
    price: 100000,
  },
  {
    id: 3,
    title: "Stand Up Comedy Night",
    date: "2025-11-12",
    location: "Balai Sarbini, Jakarta",
    image: "https://source.unsplash.com/random/400x300?comedy",
    category: "Hiburan",
    price: 50000,
  },
  {
    id: 4,
    title: "Pameran Seni Rupa",
    date: "2025-09-30",
    location: "Museum Nasional, Jakarta",
    image: "https://source.unsplash.com/random/400x300?art",
    category: "Seni",
    price: 80000,
  },
];
