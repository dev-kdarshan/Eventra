import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout, { PageContainer, GridContainer, Card } from '../components/Layout';
import { ComponentLoader } from '../components/Loader';
import clubsData from '../data/clubsData.json';
import eventsData from '../data/eventsData.json';
import '../styles/eventGrid.css';

/**
 * Event Grid Page Component
 * Displays events for a specific club or all events
 * Features search, filter by date, and responsive event cards
 */
const EventGrid = () => {
  const { clubId } = useParams();
  const [events, setEvents] = useState([]);
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

  useEffect(() => {
    const loadEvents = () => {
      setTimeout(() => {
        if (clubId) {
          // Load events for specific club
          const selectedClub = clubsData.find(c => c.id === parseInt(clubId));
          const clubEvents = eventsData.filter(event => event.clubId === parseInt(clubId));
          setClub(selectedClub);
          setEvents(clubEvents);
        } else {
          // Load all events
          setEvents(eventsData);
        }
        setLoading(false);
      }, 600);
    };

    loadEvents();
  }, [clubId]);

  // Filter and sort events
  const filteredAndSortedEvents = useMemo(() => {
    const today = new Date();
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    const oneMonthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);

    let filtered = events.filter(event => {
      const eventDate = new Date(event.date);
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesDate = (() => {
        switch (dateFilter) {
          case 'upcoming':
            return eventDate >= today;
          case 'thisWeek':
            return eventDate >= today && eventDate <= oneWeekFromNow;
          case 'thisMonth':
            return eventDate >= today && eventDate <= oneMonthFromNow;
          case 'past':
            return eventDate < today;
          default:
            return true;
        }
      })();

      return matchesSearch && matchesDate;
    });

    // Sort events
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(a.date) - new Date(b.date);
        case 'title':
          return a.title.localeCompare(b.title);
        case 'popularity':
          return b.currentRegistrations - a.currentRegistrations;
        default:
          return 0;
      }
    });

    return filtered;
  }, [events, searchTerm, dateFilter, sortBy]);

  const formatEventDate = (date, time) => {
    const eventDate = new Date(date);
    return {
      day: eventDate.getDate(),
      month: eventDate.toLocaleDateString('en-US', { month: 'short' }),
      weekday: eventDate.toLocaleDateString('en-US', { weekday: 'short' }),
      fullDate: eventDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: time
    };
  };

  const getEventStatus = (date, currentRegistrations, maxParticipants) => {
    const eventDate = new Date(date);
    const today = new Date();
    
    if (eventDate < today) return 'past';
    if (currentRegistrations >= maxParticipants) return 'full';
    return 'open';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setDateFilter('all');
    setSortBy('date');
  };

  if (loading) {
    return (
      <Layout>
        <PageContainer>
          <ComponentLoader text="Loading events..." />
        </PageContainer>
      </Layout>
    );
  }

  const pageTitle = club ? `${club.name} Events` : 'All Events';
  const pageSubtitle = club 
    ? `Discover upcoming events organized by ${club.name}`
    : 'Explore all campus events and activities';

  return (
    <Layout>
      <PageContainer title={pageTitle} subtitle={pageSubtitle}>
        {/* Club Header (if viewing club-specific events) */}
        {club && (
          <div className="club-header">
            <div className="club-info">
              <div className="club-image">
                <img src={club.image} alt={club.name} />
              </div>
              <div className="club-details">
                <h2 className="club-name">{club.name}</h2>
                <p className="club-description">{club.description}</p>
                <div className="club-stats">
                  <span className="stat">👥 {club.members} members</span>
                  <span className="stat">📅 Est. {club.established}</span>
                  <span className="stat">🏷️ {club.category}</span>
                </div>
              </div>
            </div>
            <Link to="/clubs" className="back-to-clubs">
              ← Back to Clubs
            </Link>
          </div>
        )}

        {/* Search and Filter Controls */}
        <div className="events-controls">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="filter-section">
            <div className="date-filters">
              <span className="filter-label">Time Period:</span>
              <div className="filter-buttons">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'upcoming', label: 'Upcoming' },
                  { key: 'thisWeek', label: 'This Week' },
                  { key: 'thisMonth', label: 'This Month' },
                  { key: 'past', label: 'Past' }
                ].map(filter => (
                  <button
                    key={filter.key}
                    className={`filter-btn ${dateFilter === filter.key ? 'active' : ''}`}
                    onClick={() => setDateFilter(filter.key)}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sort-section">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Date</option>
                <option value="title">Title</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>

            {(searchTerm || dateFilter !== 'all' || sortBy !== 'date') && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p className="results-text">
            Showing {filteredAndSortedEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        {filteredAndSortedEvents.length > 0 ? (
          <GridContainer columns="auto" gap="large" className="events-grid">
            {filteredAndSortedEvents.map(event => {
              const eventClub = clubsData.find(c => c.id === event.clubId);
              const dateInfo = formatEventDate(event.date, event.time);
              const status = getEventStatus(event.date, event.currentRegistrations, event.maxParticipants);

              return (
                <Card key={event.id} className={`event-card status-${status}`} hoverable>
                  <Link to={`/events/${event.id}`} className="event-link">
                    <div className="event-image-container">
                      <img src={event.image} alt={event.title} className="event-image" />
                      
                      <div className="event-date-badge">
                        <span className="date-month">{dateInfo.month}</span>
                        <span className="date-day">{dateInfo.day}</span>
                      </div>

                      <div className="event-status-badge">
                        {status === 'past' && <span className="status-text">Past</span>}
                        {status === 'full' && <span className="status-text">Full</span>}
                        {status === 'open' && <span className="status-text">Open</span>}
                      </div>

                      {event.tags && (
                        <div className="event-tags">
                          {event.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="event-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="event-content">
                      <div className="event-header">
                        <h3 className="event-title">{event.title}</h3>
                        {!club && (
                          <span className="event-club">by {eventClub?.name}</span>
                        )}
                      </div>

                      <p className="event-description">
                        {event.description.length > 150 
                          ? `${event.description.substring(0, 150)}...`
                          : event.description
                        }
                      </p>

                      <div className="event-details">
                        <div className="event-meta">
                          <span className="event-datetime">
                            📅 {dateInfo.fullDate} at {dateInfo.time}
                          </span>
                          <span className="event-venue">
                            📍 {event.venue}
                          </span>
                        </div>

                        <div className="event-stats">
                          <span className="registration-count">
                            👥 {event.currentRegistrations}/{event.maxParticipants} registered
                          </span>
                          <div className="registration-bar">
                            <div 
                              className="registration-fill"
                              style={{
                                width: `${(event.currentRegistrations / event.maxParticipants) * 100}%`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="event-card-footer">
                      <span className="view-event-text">
                        {status === 'open' ? 'Register Now →' : 'View Details →'}
                      </span>
                    </div>
                  </Link>
                </Card>
              );
            })}
          </GridContainer>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <span className="no-results-icon">📅</span>
              <h3 className="no-results-title">No events found</h3>
              <p className="no-results-text">
                {searchTerm 
                  ? 'Try adjusting your search terms or filters.'
                  : 'There are no events matching your current filters.'
                }
              </p>
              <button onClick={clearFilters} className="btn btn-primary">
                Show All Events
              </button>
            </div>
          </div>
        )}
      </PageContainer>
    </Layout>
  );
};

export default EventGrid;