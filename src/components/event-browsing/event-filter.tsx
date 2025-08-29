"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
  categories: string[];
  className?: string;
};

export default function EventFilter({ value, onChange, categories, className }: Props) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className ?? "category-select"}
    >
      <option value="All">Semua Kategori</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
}