import React from 'react';
import '../styles/loader.css';

/**
 * Loader Component
 * Displays animated loading indicators with optional text
 * Supports different sizes and styles for various use cases
 * 
 * Props:
 * - size: 'small', 'medium', 'large' (default: 'medium')
 * - text: Custom loading text (default: 'Loading...')
 * - type: 'spinner', 'dots', 'pulse' (default: 'spinner')
 * - overlay: Boolean to show full-screen overlay (default: false)
 */
const Loader = ({ 
  size = 'medium', 
  text = 'Loading...', 
  type = 'spinner', 
  overlay = false 
}) => {
  // Spinner loader component
  const SpinnerLoader = () => (
    <div className={`loader-spinner ${size}`}>
      <div className="spinner"></div>
    </div>
  );

  // Dots loader component
  const DotsLoader = () => (
    <div className={`loader-dots ${size}`}>
      <div className="dot dot1"></div>
      <div className="dot dot2"></div>
      <div className="dot dot3"></div>
    </div>
  );

  // Pulse loader component
  const PulseLoader = () => (
    <div className={`loader-pulse ${size}`}>
      <div className="pulse-circle"></div>
    </div>
  );

  // Select loader type
  const getLoaderComponent = () => {
    switch (type) {
      case 'dots':
        return <DotsLoader />;
      case 'pulse':
        return <PulseLoader />;
      default:
        return <SpinnerLoader />;
    }
  };

  const loaderContent = (
    <div className={`loader-container ${size}`}>
      {getLoaderComponent()}
      {text && <p className="loader-text">{text}</p>}
    </div>
  );

  // Return with or without overlay
  if (overlay) {
    return (
      <div className="loader-overlay">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

// Specific loader variants for common use cases
export const PageLoader = ({ text = 'Loading page...' }) => (
  <Loader size="large" text={text} type="spinner" overlay={true} />
);

export const ComponentLoader = ({ text = 'Loading...' }) => (
  <Loader size="medium" text={text} type="dots" />
);

export const ButtonLoader = ({ text = '' }) => (
  <Loader size="small" text={text} type="spinner" />
);

export const EventsLoader = ({ text = 'Loading events...' }) => (
  <Loader size="medium" text={text} type="pulse" />
);

export default Loader;