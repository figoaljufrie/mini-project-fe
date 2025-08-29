interface CategoryCardProps {
  title: string;
  icon?: React.ReactNode;
}

export default function CategoryCard({ title, icon }: CategoryCardProps) {
  return (
    <div className="category-card">
      <div className="category-card-icon-container">
        <div className="category-card-icon">
          {icon}
        </div>
        <div className="category-card-icon-bg"></div>
      </div>
      <h3 className="category-card-title">{title}</h3>
      <div className="category-card-arrow">
        <svg className="category-card-arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  );
}