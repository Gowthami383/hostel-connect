import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import OwnerDashboard from './pages/OwnerDashboard';
import StudentDashboard from './pages/StudentDashboard';
import HostelDetails from './pages/HostelDetails';
import BookingPage from './pages/BookingPage';
import { User } from './types/User';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data
    const storedUser = localStorage.getItem('hostelUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('hostelUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('hostelUser');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onLogin={handleLogin} />} />
          <Route 
            path="/owner-dashboard" 
            element={
              user?.role === 'owner' ? 
              <OwnerDashboard user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route 
            path="/student-dashboard" 
            element={
              user?.role === 'student' ? 
              <StudentDashboard user={user} /> : 
              <Navigate to="/login" />
            } 
          />
          <Route path="/hostel/:id" element={<HostelDetails user={user} />} />
          <Route 
            path="/book/:id" 
            element={
              user?.role === 'student' ? 
              <BookingPage user={user} /> : 
              <Navigate to="/login" />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;