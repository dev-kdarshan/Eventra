import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout, { PageContainer, GridContainer, Card } from '../components/Layout';
import { ComponentLoader } from '../components/Loader';
import clubsData from '../data/clubsData.json';
import eventsData from '../data/eventsData.json';
import '../styles/eventDetail.css';

/**
 * Event Detail Page Component
 * Displays comprehensive information about a specific event
 * Includes registration functionality and related events
 */
const EventDetail = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [club, setClub] = useState(null);
  const [relatedEvents, setRelatedEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const loadEventDetails = () => {
      setTimeout(() => {
        const selectedEvent = eventsData.find(e => e.id === parseInt(eventId));
        
        if (!selectedEvent) {
          navigate('/events');
          return;
        }

        const eventClub = clubsData.find(c => c.id === selectedEvent.clubId);
        
        // Get related events (same club, excluding current event)
        const related = eventsData
          .filter(e => e.clubId === selectedEvent.clubId && e.id !== selectedEvent.id)
          .slice(0, 3);

        setEvent(selectedEvent);
        setClub(eventClub);
        setRelatedEvents(related);
        setLoading(false);
      }, 600);
    };

    loadEventDetails();
  }, [eventId, navigate]);

  const formatEventDate = (date, time, endDate, endTime) => {
    const startDate = new Date(date);
    const endEventDate = endDate ? new Date(endDate) : null;
    
    const formatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };

    if (endEventDate && endEventDate.toDateString() !== startDate.toDateString()) {
      return {
        startDate: startDate.toLocaleDateString('en-US', formatOptions),
        endDate: endEventDate.toLocaleDateString('en-US', formatOptions),
        startTime: time,
        endTime: endTime,
        isMultiDay: true
      };
    } else {
      return {
        startDate: startDate.toLocaleDateString('en-US', formatOptions),
        startTime: time,
        endTime: endTime,
        isMultiDay: false
      };
    }
  };

  const getEventStatus = (date, currentRegistrations, maxParticipants) => {
    const eventDate = new Date(date);
    const today = new Date();
    
    if (eventDate < today) return 'past';
    if (currentRegistrations >= maxParticipants) return 'full';
    return 'open';
  };

  const handleRegistration = () => {
    setIsRegistering(true);
    
    // Simulate registration process
    setTimeout(() => {
      if (event.registrationLink) {
        window.open(event.registrationLink, '_blank');
      }
      setIsRegistering(false);
    }, 1000);
  };

  const shareEvent = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event.title,
          text: event.description.substring(0, 100) + '...',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <Layout>
        <PageContainer>
          <ComponentLoader text="Loading event details..." />
        </PageContainer>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <PageContainer>
          <div className="error-message">
            <h2>Event not found</h2>
            <p>The event you're looking for doesn't exist.</p>
            <Link to="/events" className="btn btn-primary">
              Browse All Events
            </Link>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  const dateInfo = formatEventDate(event.date, event.time, event.endDate, event.endTime);
  const status = getEventStatus(event.date, event.currentRegistrations, event.maxParticipants);
  const registrationPercentage = (event.currentRegistrations / event.maxParticipants) * 100;

  return (
    <Layout>
      <div className="event-detail-page">
        {/* Hero Section */}
        <section className="event-hero">
          <div className="hero-image">
            <img src={event.image} alt={event.title} />
            <div className="hero-overlay">
              <div className="breadcrumb">
                <Link to="/events">Events</Link>
                <span className="separator">›</span>
                <Link to={`/clubs/${club.id}`}>{club.name}</Link>
                <span className="separator">›</span>
                <span className="current">{event.title}</span>
              </div>
            </div>
          </div>
        </section>

        <PageContainer>
          <div className="event-content">
            {/* Main Event Information */}
            <div className="event-main">
              <div className="event-header">
                <div className="event-title-section">
                  <h1 className="event-title">{event.title}</h1>
                  <div className="event-organizer">
                    <span>Organized by</span>
                    <Link to={`/clubs/${club.id}`} className="club-link">
                      {club.name}
                    </Link>
                  </div>
                </div>

                <div className="event-actions">
                  <button onClick={shareEvent} className="btn btn-outline">
                    Share Event
                  </button>
                  {status === 'open' && (
                    <button 
                      onClick={handleRegistration}
                      disabled={isRegistering}
                      className="btn btn-primary btn-large"
                    >
                      {isRegistering ? 'Processing...' : 'Register Now'}
                    </button>
                  )}
                  {status === 'full' && (
                    <button disabled className="btn btn-disabled btn-large">
                      Event Full
                    </button>
                  )}
                  {status === 'past' && (
                    <button disabled className="btn btn-disabled btn-large">
                      Event Ended
                    </button>
                  )}
                </div>
              </div>

              {/* Event Details Grid */}
              <div className="event-details-grid">
                <div className="detail-card">
                  <h3>📅 Date & Time</h3>
                  {dateInfo.isMultiDay ? (
                    <div>
                      <p><strong>Start:</strong> {dateInfo.startDate} at {dateInfo.startTime}</p>
                      <p><strong>End:</strong> {dateInfo.endDate} at {dateInfo.endTime}</p>
                    </div>
                  ) : (
                    <div>
                      <p><strong>Date:</strong> {dateInfo.startDate}</p>
                      <p><strong>Time:</strong> {dateInfo.startTime} - {dateInfo.endTime}</p>
                    </div>
                  )}
                </div>

                <div className="detail-card">
                  <h3>📍 Venue</h3>
                  <p>{event.venue}</p>
                </div>

                <div className="detail-card">
                  <h3>👥 Registration</h3>
                  <p>{event.currentRegistrations} / {event.maxParticipants} participants</p>
                  <div className="registration-bar">
                    <div 
                      className="registration-fill"
                      style={{ width: `${registrationPercentage}%` }}
                    ></div>
                  </div>
                  <p className="registration-status">
                    {event.maxParticipants - event.currentRegistrations} spots remaining
                  </p>
                </div>

                <div className="detail-card">
                  <h3>🏷️ Category</h3>
                  <div className="event-tags">
                    {event.tags?.map(tag => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Event Description */}
              <div className="event-description">
                <h2>About This Event</h2>
                <p>{event.description}</p>
              </div>

              {/* Requirements */}
              {event.requirements && (
                <div className="event-requirements">
                  <h3>Requirements</h3>
                  <ul>
                    {event.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Prizes */}
              {event.prizes && (
                <div className="event-prizes">
                  <h3>Prizes</h3>
                  <ul>
                    {event.prizes.map((prize, index) => (
                      <li key={index}>{prize}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="event-sidebar">
              {/* Club Information */}
              <div className="sidebar-card club-info">
                <h3>About the Organizer</h3>
                <div className="club-card">
                  <div className="club-header">
                    <img src={club.image} alt={club.name} className="club-avatar" />
                    <div>
                      <h4>{club.name}</h4>
                      <p className="club-category">{club.category}</p>
                    </div>
                  </div>
                  <p className="club-description">{club.description}</p>
                  <div className="club-stats">
                    <span>👥 {club.members} members</span>
                    <span>📅 Est. {club.established}</span>
                  </div>
                  <Link to={`/clubs/${club.id}`} className="btn btn-outline btn-small">
                    View Club
                  </Link>
                </div>
              </div>

              {/* Social Links */}
              {club.socialLinks && (
                <div className="sidebar-card social-links">
                  <h3>Follow {club.name}</h3>
                  <div className="social-buttons">
                    {Object.entries(club.socialLinks).map(([platform, handle]) => (
                      <a
                        key={platform}
                        href={platform === 'website' ? handle : `https://${platform}.com/${handle.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="social-btn"
                      >
                        <span className="social-icon">
                          {platform === 'instagram' && '📷'}
                          {platform === 'facebook' && '📘'}
                          {platform === 'twitter' && '🐦'}
                          {platform === 'linkedin' && '💼'}
                          {platform === 'website' && '🌐'}
                          {platform === 'youtube' && '📺'}
                        </span>
                        {platform}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Related Events */}
          {relatedEvents.length > 0 && (
            <section className="related-events">
              <h2>More Events from {club.name}</h2>
              <GridContainer columns="auto" gap="medium">
                {relatedEvents.map(relatedEvent => {
                  const relatedDateInfo = formatEventDate(relatedEvent.date, relatedEvent.time);
                  return (
                    <Card key={relatedEvent.id} className="related-event-card" hoverable>
                      <Link to={`/events/${relatedEvent.id}`}>
                        <div className="related-event-image">
                          <img src={relatedEvent.image} alt={relatedEvent.title} />
                          <div className="related-event-date">
                            <span>{new Date(relatedEvent.date).getDate()}</span>
                            <span>{new Date(relatedEvent.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                          </div>
                        </div>
                        <div className="related-event-content">
                          <h4>{relatedEvent.title}</h4>
                          <p>{relatedEvent.description.substring(0, 80)}...</p>
                          <span className="related-event-date-text">
                            {relatedDateInfo.startDate}
                          </span>
                        </div>
                      </Link>
                    </Card>
                  );
                })}
              </GridContainer>
            </section>
          )}
        </PageContainer>
      </div>
    </Layout>
  );
};

export default EventDetail;