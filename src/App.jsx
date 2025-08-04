import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import page components
import Welcome from './pages/Welcome';
import ClubGrid from './pages/Club_grid';
import EventGrid from './pages/Event_grid';
import EventDetail from './pages/Event_detail';
import About from './pages/About';

/**
 * Main App Component
 * Sets up routing for the entire Eventra application
 * Uses React Router for navigation between different pages
 */
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Home/Welcome Page */}
          <Route path="/" element={<Welcome />} />
          
          {/* Clubs Routes */}
          <Route path="/clubs" element={<ClubGrid />} />
          <Route path="/clubs/:clubId" element={<EventGrid />} />
          
          {/* Events Routes */}
          <Route path="/events" element={<EventGrid />} />
          <Route path="/events/:eventId" element={<EventDetail />} />
          
          {/* Other Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/my-events" element={<EventGrid />} />
          
          {/* Fallback Route - redirect to home */}
          <Route path="*" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
