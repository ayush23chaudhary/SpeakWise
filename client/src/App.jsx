import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import AuthPage from './components/auth/AuthPage';
import MainApp from './components/layout/MainApp';
import GuestMainApp from './components/layout/GuestMainApp';
import GuestMode from './components/auth/GuestMode';

function App() {
  const { isAuthenticated, checkAuth, isLoading } = useAuthStore();
  const [showGuestMode, setShowGuestMode] = useState(false);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading SpeakWise...</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Guest Mode Routes */}
          <Route 
            path="/guest" 
            element={<GuestMainApp />} 
          />
          
          {/* Auth Routes */}
          <Route 
            path="/login" 
            element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/register" 
            element={!isAuthenticated ? <AuthPage /> : <Navigate to="/" replace />} 
          />
          
          {/* Main App Routes */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? (
                <MainApp />
              ) : (
                <GuestMode 
                  onLogin={() => window.location.href = '/login'}
                  onRegister={() => window.location.href = '/register'}
                />
              )
            } 
          />
          
          {/* Catch all route */}
          <Route 
            path="*" 
            element={<Navigate to="/" replace />} 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
