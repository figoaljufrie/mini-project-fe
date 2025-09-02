"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Brand */}
        <Link href="/" className="navbar-brand">
          EventFinder
        </Link>

        {/* Search + Category */}
        <div className="navbar-search-section">
          <div className="search-container">
            <div className="search-icon">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Cari event..."
              className="search-input"
            />
          </div>

          <select className="category-select">
            <option value="All">Semua Kategori</option>
            <option value="Festival">Festival/Bazaar</option>
            <option value="Theater">Seni & Teater</option>
            <option value="Exhibition">Pameran</option>
            <option value="Sports">Olahraga</option>
          </select>
        </div>

        {/* Actions */}
        <div className="navbar-actions">
          <Link href="/buat-event" className="btn-primary">
            <svg className="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Buat Event
          </Link>
          <Link href="auth/login" className="btn-secondary">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}