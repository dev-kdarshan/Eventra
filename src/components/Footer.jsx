import React from 'react';
import '../styles/footer.css';

/**
 * Footer Component
 * Displays platform information, links, and contact details
 * Features responsive design with social media links
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-content">
          {/* Company Info Section */}
          <div className="footer-section">
            <div className="footer-logo">
              <h2>EVENTRA</h2>
              <p>Your gateway to campus events and club activities</p>
            </div>
            <div className="footer-description">
              <p>
                Connecting students with exciting events, clubs, and opportunities 
                across campus. Join the community and never miss an event again!
              </p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/clubs">Browse Clubs</a></li>
              <li><a href="/events">All Events</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/contact">Contact</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>

          {/* Categories Section */}
          <div className="footer-section">
            <h3>Categories</h3>
            <ul className="footer-links">
              <li><a href="/clubs?category=technology">Technology</a></li>
              <li><a href="/clubs?category=arts">Arts & Culture</a></li>
              <li><a href="/clubs?category=sports">Sports</a></li>
              <li><a href="/clubs?category=academic">Academic</a></li>
              <li><a href="/clubs?category=environment">Environment</a></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="footer-section">
            <h3>Get In Touch</h3>
            <div className="contact-info">
              <p><span className="icon">📧</span> hello@eventra.edu</p>
              <p><span className="icon">📞</span> +1 (555) 123-4567</p>
              <p><span className="icon">📍</span> Student Center, Room 201<br/>University Campus</p>
            </div>
          </div>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://instagram.com/eventra" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📷</span>
            </a>
            <a href="https://facebook.com/eventra" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">📘</span>
            </a>
            <a href="https://twitter.com/eventra" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">🐦</span>
            </a>
            <a href="https://linkedin.com/company/eventra" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
              <span className="social-icon">💼</span>
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Eventra. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;