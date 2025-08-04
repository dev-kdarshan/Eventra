import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout, { GridContainer, Card } from '../components/Layout';
import { ComponentLoader } from '../components/Loader';
import clubsData from '../data/clubsData.json';
import eventsData from '../data/eventsData.json';
import '../styles/welcome.css';

/**
 * Welcome Page Component
 * Landing page with hero section, featured content, and call-to-actions
 * Displays overview of clubs and upcoming events
 */
const Welcome = () => {
  const [featuredClubs, setFeaturedClubs] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and fetch featured content
    const loadFeaturedContent = () => {
      setTimeout(() => {
        // Get featured clubs (first 4)
        setFeaturedClubs(clubsData.slice(0, 4));
        
        // Get upcoming events (next 3 events)
        const today = new Date();
        const upcoming = eventsData
          .filter(event => new Date(event.date) >= today)
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .slice(0, 3);
        setUpcomingEvents(upcoming);
        
        setLoading(false);
      }, 800);
    };

    loadFeaturedContent();
  }, []);

  const formatEventDate = (date, time) => {
    const eventDate = new Date(date);
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return `${eventDate.toLocaleDateString('en-US', options)} at ${time}`;
  };

  if (loading) {
    return (
      <Layout>
        <ComponentLoader text="Loading Eventra..." />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="welcome-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Welcome to <span className="highlight">Eventra</span>
              </h1>
              <p className="hero-subtitle">
                Your gateway to campus life and endless opportunities
              </p>
              <p className="hero-description">
                Discover exciting clubs, join amazing events, and connect with 
                like-minded students. From tech hackathons to cultural festivals, 
                there's something for everyone at our vibrant campus community.
              </p>
              <div className="hero-actions">
                <Link to="/clubs" className="btn btn-primary">
                  Explore Clubs
                </Link>
                <Link to="/events" className="btn btn-secondary">
                  Browse Events
                </Link>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">{clubsData.length}+</span>
                  <span className="stat-label">Active Clubs</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">{eventsData.length}+</span>
                  <span className="stat-label">Events This Semester</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">500+</span>
                  <span className="stat-label">Active Members</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Clubs Section */}
        <section className="featured-section">
          <div className="section-header">
            <h2 className="section-title">Featured Clubs</h2>
            <p className="section-subtitle">
              Discover diverse communities and find your passion
            </p>
            <Link to="/clubs" className="section-link">
              View All Clubs →
            </Link>
          </div>
          
          <GridContainer columns="auto" gap="large">
            {featuredClubs.map(club => (
              <Card key={club.id} className="club-card" hoverable>
                <Link to={`/clubs/${club.id}`} className="club-link">
                  <div className="club-image">
                    <img src={club.image} alt={club.name} />
                    <div className="club-overlay">
                      <span className="club-category">{club.category}</span>
                    </div>
                  </div>
                  <div className="club-content">
                    <h3 className="club-name">{club.name}</h3>
                    <p className="club-description">
                      {club.description.substring(0, 100)}...
                    </p>
                    <div className="club-meta">
                      <span className="club-members">
                        👥 {club.members} members
                      </span>
                      <span className="club-established">
                        📅 Est. {club.established}
                      </span>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </GridContainer>
        </section>

        {/* Upcoming Events Section */}
        <section className="events-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming Events</h2>
            <p className="section-subtitle">
              Don't miss out on these exciting upcoming events
            </p>
            <Link to="/events" className="section-link">
              View All Events →
            </Link>
          </div>

          <div className="events-list">
            {upcomingEvents.map(event => {
              const club = clubsData.find(c => c.id === event.clubId);
              return (
                <Card key={event.id} className="event-card" hoverable>
                  <Link to={`/events/${event.id}`} className="event-link">
                    <div className="event-image">
                      <img src={event.image} alt={event.title} />
                      <div className="event-date-badge">
                        <span className="event-month">
                          {new Date(event.date).toLocaleDateString('en-US', { month: 'short' })}
                        </span>
                        <span className="event-day">
                          {new Date(event.date).getDate()}
                        </span>
                      </div>
                    </div>
                    <div className="event-content">
                      <div className="event-header">
                        <h3 className="event-title">{event.title}</h3>
                        <span className="event-club">by {club?.name}</span>
                      </div>
                      <p className="event-description">
                        {event.description.substring(0, 120)}...
                      </p>
                      <div className="event-meta">
                        <span className="event-datetime">
                          📅 {formatEventDate(event.date, event.time)}
                        </span>
                        <span className="event-venue">
                          📍 {event.venue}
                        </span>
                      </div>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Get Involved?</h2>
            <p className="cta-description">
              Join thousands of students who are already part of our vibrant 
              campus community. Find your tribe, develop new skills, and create 
              unforgettable memories.
            </p>
            <div className="cta-actions">
              <Link to="/clubs" className="btn btn-primary btn-large">
                Join a Club Today
              </Link>
              <Link to="/about" className="btn btn-outline btn-large">
                Learn More
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Welcome;