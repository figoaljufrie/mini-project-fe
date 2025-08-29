"use client";

import { useState } from "react";
import { debounce } from "lodash";
import { cn } from "@/lib/utils";

type Props = {
  onSearch: (q: string) => void;
  className?: string;
  placeholder?: string;
};

export default function SearchBar({ onSearch, className, placeholder = "Cari event..." }: Props) {
  const [query, setQuery] = useState("");

  const handleSearch = debounce((value: string) => {
    onSearch(value);
  }, 400);

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={query}
      onChange={(e) => {
        setQuery(e.target.value);
        handleSearch(e.target.value);
      }}
      className={cn(
        "w-full rounded-lg border border-gray-300 bg-white py-2 pr-3 text-sm shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500",
        className
      )}
    />
  );
}