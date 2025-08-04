import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/layout.css';

/**
 * Layout Component
 * Provides consistent page structure across the application
 * Includes navbar, main content area, and footer
 * 
 * Props:
 * - children: Page content to be wrapped
 * - className: Additional CSS classes for the main content
 * - showFooter: Boolean to show/hide footer (default: true)
 * - containerType: 'default', 'fluid', 'narrow' (default: 'default')
 */
const Layout = ({ 
  children, 
  className = '', 
  showFooter = true, 
  containerType = 'default' 
}) => {
  return (
    <div className="layout">
      {/* Navigation Header */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className={`main-content ${containerType} ${className}`}>
        <div className="content-wrapper">
          {children}
        </div>
      </main>
      
      {/* Footer */}
      {showFooter && <Footer />}
    </div>
  );
};

/**
 * Page Container Component
 * Adds consistent page-level spacing and structure
 */
export const PageContainer = ({ children, title, subtitle, className = '' }) => {
  return (
    <div className={`page-container ${className}`}>
      {(title || subtitle) && (
        <div className="page-header">
          {title && <h1 className="page-title">{title}</h1>}
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      )}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};

/**
 * Grid Container Component
 * Provides responsive grid layout for cards/items
 */
export const GridContainer = ({ children, columns = 'auto', gap = 'medium', className = '' }) => {
  const gridClass = `grid-container columns-${columns} gap-${gap} ${className}`;
  
  return (
    <div className={gridClass}>
      {children}
    </div>
  );
};

/**
 * Card Container Component
 * Provides consistent card styling
 */
export const Card = ({ children, className = '', hoverable = true, onClick }) => {
  const cardClass = `card ${hoverable ? 'hoverable' : ''} ${className}`;
  
  return (
    <div className={cardClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default Layout;