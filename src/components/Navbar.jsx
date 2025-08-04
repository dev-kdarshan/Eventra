import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/navbar.css';

/**
 * Navbar Component
 * Responsive navigation header with logo, menu items, and mobile menu
 * Includes active state tracking and smooth animations
 */
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Check if current path matches link
  const isActiveLink = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Left Section - Navigation Links */}
        <div className="nav-left">
          <div className="nav-links">
            <Link 
              to="/clubs" 
              className={`nav-link ${isActiveLink('/clubs') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Clubs
            </Link>
            <Link 
              to="/events" 
              className={`nav-link ${isActiveLink('/events') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link 
              to="/about" 
              className={`nav-link ${isActiveLink('/about') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </div>
        </div>

        {/* Center Section - Logo */}
        <div className="nav-center">
          <Link to="/" className="nav-logo" onClick={closeMobileMenu}>
            <span className="logo-text">EVENTRA</span>
            <span className="logo-subtitle">Campus Events</span>
          </Link>
        </div>

        {/* Right Section - User Actions */}
        <div className="nav-right">
          <div className="nav-actions">
            <Link 
              to="/my-events" 
              className={`nav-link ${isActiveLink('/my-events') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              My Events
            </Link>
            <button className="profile-btn" aria-label="User Profile">
              <span className="profile-icon">👤</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            <Link 
              to="/clubs" 
              className={`mobile-nav-link ${isActiveLink('/clubs') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Clubs
            </Link>
            <Link 
              to="/events" 
              className={`mobile-nav-link ${isActiveLink('/events') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              Events
            </Link>
            <Link 
              to="/my-events" 
              className={`mobile-nav-link ${isActiveLink('/my-events') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              My Events
            </Link>
            <Link 
              to="/about" 
              className={`mobile-nav-link ${isActiveLink('/about') ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              About
            </Link>
            <div className="mobile-profile">
              <button className="mobile-profile-btn">
                <span className="profile-icon">👤</span>
                Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
