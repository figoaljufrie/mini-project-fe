// src/app/test-fetching/page.tsx
// Halaman test untuk fetching - bisa dihapus setelah testing selesai

'use client';

import React from 'react';
import { useEvents } from '../../hooks/useEvents';
import { useAuth } from '../../hooks/useAuth';

// Test component untuk Events
function EventsTest() {
  const { events, loading, error, fetchEvents, fetchPopularEvents } = useEvents({
    immediate: true,
    limit: 5
  });

  console.log('Events Test:', { events, loading, error });

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Events Test</h3>
      <button onClick={fetchEvents}>Fetch Events</button>
      <button onClick={fetchPopularEvents}>Fetch Popular Events</button>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div>
        <h4>Events ({events.length}):</h4>
        {events.map(event => (
          <div key={event.id} style={{ margin: '10px 0', padding: '10px', background: '#f5f5f5' }}>
            <strong>{event.title}</strong>
            <p>{event.description}</p>
            <p>Date: {event.date} | Location: {event.location}</p>
            <p>Price: Rp {event.price.toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Test component untuk Auth
function AuthTest() {
  const { user, isAuthenticated, loading, error, login, logout, checkAuthStatus } = useAuth();

  console.log('Auth Test:', { user, isAuthenticated, loading, error });

  const handleLogin = async () => {
    try {
      await login({
        email: 'test@example.com',
        password: 'password123'
      });
      console.log('Login berhasil!');
    } catch (error) {
      console.error('Login gagal:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      console.log('Logout berhasil!');
    } catch (error) {
      console.error('Logout gagal:', error);
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '10px' }}>
      <h3>Auth Test</h3>
      <button onClick={handleLogin}>Test Login</button>
      <button onClick={handleLogout}>Test Logout</button>
      <button onClick={checkAuthStatus}>Check Auth Status</button>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      
      <div>
        <h4>Auth Status:</h4>
        <p>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</p>
        {user && (
          <div>
            <p>User: {user.name} ({user.email})</p>
            <p>Role: {user.role}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Main test page
export default function TestFetchingPage() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Fetching Test Page</h1>
      <p>Ini adalah halaman test untuk fetching. Buka console untuk melihat log.</p>
      
      <EventsTest />
      <AuthTest />
      
      <div style={{ marginTop: '20px', padding: '10px', background: '#e8f4fd' }}>
        <h4>Testing Instructions:</h4>
        <ol>
          <li>Buka browser console (F12)</li>
          <li>Klik tombol-tombol test di atas</li>
          <li>Lihat log di console</li>
          <li>Check apakah data muncul atau error</li>
          <li>Jika error, check backend atau network</li>
        </ol>
        
        <h4>Expected Results:</h4>
        <ul>
          <li><strong>Events:</strong> Should fetch events from API or show error</li>
          <li><strong>Auth:</strong> Should handle login/logout or show error</li>
          <li><strong>Console:</strong> Should show detailed logs</li>
        </ul>
        
        <h4>Common Issues:</h4>
        <ul>
          <li><strong>CORS Error:</strong> Backend tidak enable CORS</li>
          <li><strong>404 Error:</strong> API endpoint salah</li>
          <li><strong>Network Error:</strong> Backend tidak running</li>
          <li><strong>Auth Error:</strong> Token invalid atau expired</li>
        </ul>
      </div>
    </div>
  );
}
