// src/app/admin/api-management/page.tsx
// Halaman khusus admin untuk mengelola API dan mock data

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useEvents } from '@/hooks/useEvents';

export default function ApiManagementPage() {
  const [mounted, setMounted] = useState(false);
  const [testResults, setTestResults] = useState<any>({});

  // Check authentication and admin role
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const isAdmin = isAuthenticated && user?.role === 'organizer';

  // Test Events
  const { 
    events, 
    loading: eventsLoading, 
    error: eventsError, 
    fetchEvents,
    fetchPopularEvents 
  } = useEvents({ immediate: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Redirect if not admin
  if (!mounted) {
    return <div style={{ padding: '20px' }}>Loading...</div>;
  }

  if (authLoading) {
    return <div style={{ padding: '20px' }}>Checking authentication...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>You need to be logged in to access this page.</p>
        <a href="/auth/login" style={{ color: 'blue' }}>Login here</a>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h1>Access Denied</h1>
        <p>You need admin privileges to access this page.</p>
        <p>Your role: {user?.role}</p>
        <a href="/" style={{ color: 'blue' }}>Go back to home</a>
      </div>
    );
  }

  const testEventsAPI = async () => {
    setTestResults(prev => ({ ...prev, events: { status: 'testing', message: 'Testing events API...' } }));
    
    try {
      await fetchEvents();
      setTestResults(prev => ({ 
        ...prev, 
        events: { 
          status: 'success', 
          message: `Success! Found ${events.length} events`,
          data: events
        } 
      }));
    } catch (error: any) {
      setTestResults(prev => ({ 
        ...prev, 
        events: { 
          status: 'error', 
          message: error.message || 'Events API failed',
          error: error.response?.status || 'Unknown error'
        } 
      }));
    }
  };

  const testPopularEventsAPI = async () => {
    setTestResults(prev => ({ ...prev, popularEvents: { status: 'testing', message: 'Testing popular events API...' } }));
    
    try {
      await fetchPopularEvents();
      setTestResults(prev => ({ 
        ...prev, 
        popularEvents: { 
          status: 'success', 
          message: `Success! Found ${events.length} popular events`,
          data: events
        } 
      }));
    } catch (error: any) {
      setTestResults(prev => ({ 
        ...prev, 
        popularEvents: { 
          status: 'error', 
          message: error.message || 'Popular events API failed',
          error: error.response?.status || 'Unknown error'
        } 
      }));
    }
  };

  const clearResults = () => {
    setTestResults({});
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '20px',
        border: '1px solid #dee2e6'
      }}>
        <h1>🔧 API Management Dashboard</h1>
        <p><strong>Admin:</strong> {user?.name} ({user?.email})</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Access Level:</strong> Full API Management</p>
      </div>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        <button 
          onClick={testEventsAPI} 
          disabled={eventsLoading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: eventsLoading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: eventsLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test Events API
        </button>
        
        <button 
          onClick={testPopularEventsAPI} 
          disabled={eventsLoading}
          style={{ 
            padding: '10px 20px',
            backgroundColor: eventsLoading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: eventsLoading ? 'not-allowed' : 'pointer'
          }}
        >
          Test Popular Events API
        </button>
        
        <button 
          onClick={clearResults}
          style={{ 
            padding: '10px 20px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Clear Results
        </button>
      </div>

      {/* Test Results */}
      <div style={{ marginTop: '20px' }}>
        <h3>API Test Results:</h3>
        
        {Object.entries(testResults).map(([key, result]: [string, any]) => (
          <div key={key} style={{ 
            margin: '10px 0', 
            padding: '15px', 
            border: '1px solid #dee2e6',
            borderRadius: '4px',
            backgroundColor: result.status === 'success' ? '#d4edda' : 
                           result.status === 'error' ? '#f8d7da' : '#fff3cd'
          }}>
            <h4 style={{ margin: '0 0 10px 0', textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1')} API
            </h4>
            <p style={{ margin: '5px 0' }}>
              <strong>Status:</strong> 
              <span style={{ 
                color: result.status === 'success' ? 'green' : 
                       result.status === 'error' ? 'red' : 'orange',
                fontWeight: 'bold',
                marginLeft: '5px'
              }}>
                {result.status?.toUpperCase()}
              </span>
            </p>
            <p style={{ margin: '5px 0' }}><strong>Message:</strong> {result.message}</p>
            {result.error && (
              <p style={{ margin: '5px 0' }}><strong>Error Code:</strong> {result.error}</p>
            )}
            {result.data && (
              <details style={{ marginTop: '10px' }}>
                <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>View Data</summary>
                <pre style={{ 
                  marginTop: '10px', 
                  padding: '10px', 
                  backgroundColor: '#f8f9fa', 
                  border: '1px solid #e9ecef',
                  borderRadius: '4px',
                  overflow: 'auto',
                  fontSize: '12px'
                }}>
                  {JSON.stringify(result.data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        ))}
      </div>

      {/* Current State */}
      <div style={{ marginTop: '30px' }}>
        <h3>Current API State:</h3>
        <div style={{ 
          padding: '15px', 
          backgroundColor: '#e2e3e5', 
          border: '1px solid #d6d8db',
          borderRadius: '4px'
        }}>
          <p><strong>Events Loading:</strong> {eventsLoading ? 'Yes' : 'No'}</p>
          <p><strong>Events Error:</strong> {eventsError || 'None'}</p>
          <p><strong>Events Count:</strong> {events.length}</p>
          <p><strong>API Base URL:</strong> {process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api'}</p>
          <p><strong>Environment:</strong> {process.env.NODE_ENV}</p>
        </div>
      </div>

      {/* Admin Instructions */}
      <div style={{ 
        marginTop: '30px',
        padding: '15px', 
        backgroundColor: '#d1ecf1', 
        border: '1px solid #bee5eb',
        borderRadius: '4px'
      }}>
        <h4>Admin Instructions:</h4>
        <ol>
          <li><strong>Events API:</strong> Test basic events endpoint</li>
          <li><strong>Popular Events API:</strong> Test popular events endpoint</li>
          <li><strong>Monitor Status:</strong> Check API health and response times</li>
          <li><strong>Debug Issues:</strong> Use this dashboard to troubleshoot API problems</li>
        </ol>
        
        <h4>Expected Results:</h4>
        <ul>
          <li><strong>404 Error:</strong> Backend not running or endpoint doesn't exist</li>
          <li><strong>401 Error:</strong> Authentication required (expected for auth endpoints)</li>
          <li><strong>500 Error:</strong> Backend server error</li>
          <li><strong>Success:</strong> API is working correctly</li>
        </ul>
      </div>
    </div>
  );
}
