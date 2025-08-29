import CategoryCard from "./category-card";
import { Music, Theater, GalleryVerticalEnd, Dumbbell } from "lucide-react";

const categories = [
  { id: 1, title: "Festival / Bazaar", icon: <Music /> },
  { id: 2, title: "Seni & Theater", icon: <Theater /> },
  { id: 3, title: "Exhibition / Pameran", icon: <GalleryVerticalEnd /> },
  { id: 4, title: "Olahraga", icon: <Dumbbell /> },
];

export default function CategoryList() {
  return (
    <section className="category-list-section">
      <div className="category-list-container">
        <div className="category-list-header">
          <h2 className="category-list-title">Select a Category</h2>
          <p className="category-list-subtitle">Pilih kategori event yang sesuai dengan minatmu</p>
        </div>
        <div className="category-list-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} title={cat.title} icon={cat.icon} />
          ))}
        </div>
      </div>
    </section>
  );
}