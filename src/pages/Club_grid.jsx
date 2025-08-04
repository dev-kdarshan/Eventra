import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Layout, { PageContainer, GridContainer, Card } from '../components/Layout';
import { ComponentLoader } from '../components/Loader';
import clubsData from '../data/clubsData.json';
import '../styles/clubGrid.css';

/**
 * Club Grid Page Component
 * Displays all clubs with search, filter, and sort functionality
 * Features responsive grid layout and interactive club cards
 */
const ClubGrid = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Get unique categories from clubs data
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(clubsData.map(club => club.category))];
    return ['all', ...uniqueCategories];
  }, []);

  useEffect(() => {
    // Simulate loading
    const loadClubs = () => {
      setTimeout(() => {
        setClubs(clubsData);
        setLoading(false);
      }, 600);
    };

    loadClubs();
  }, []);

  // Filter and sort clubs based on search term, category, and sort option
  const filteredAndSortedClubs = useMemo(() => {
    let filtered = clubs.filter(club => {
      const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           club.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || club.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort clubs
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'members':
          return b.members - a.members;
        case 'established':
          return b.established.localeCompare(a.established);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [clubs, searchTerm, selectedCategory, sortBy]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSortBy('name');
  };

  if (loading) {
    return (
      <Layout>
        <PageContainer>
          <ComponentLoader text="Loading clubs..." />
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageContainer 
        title="Explore Clubs" 
        subtitle="Discover diverse communities and find your perfect match"
      >
        {/* Search and Filter Controls */}
        <div className="clubs-controls">
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search clubs by name or description..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>

          <div className="filter-section">
            <div className="category-filters">
              <span className="filter-label">Categories:</span>
              <div className="category-buttons">
                {categories.map(category => (
                  <button
                    key={category}
                    className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>
            </div>

            <div className="sort-section">
              <label htmlFor="sort-select" className="sort-label">Sort by:</label>
              <select
                id="sort-select"
                value={sortBy}
                onChange={handleSortChange}
                className="sort-select"
              >
                <option value="name">Name</option>
                <option value="members">Member Count</option>
                <option value="established">Established Year</option>
                <option value="category">Category</option>
              </select>
            </div>

            {(searchTerm || selectedCategory !== 'all' || sortBy !== 'name') && (
              <button onClick={clearFilters} className="clear-filters-btn">
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p className="results-text">
            Showing {filteredAndSortedClubs.length} of {clubs.length} clubs
            {searchTerm && (
              <span className="search-highlight"> for "{searchTerm}"</span>
            )}
            {selectedCategory !== 'all' && (
              <span className="category-highlight"> in {selectedCategory}</span>
            )}
          </p>
        </div>

        {/* Clubs Grid */}
        {filteredAndSortedClubs.length > 0 ? (
          <GridContainer columns="auto" gap="large" className="clubs-grid">
            {filteredAndSortedClubs.map(club => (
              <Card key={club.id} className="club-card" hoverable>
                <Link to={`/clubs/${club.id}`} className="club-link">
                  <div className="club-image-container">
                    <img src={club.image} alt={club.name} className="club-image" />
                    <div className="club-overlay">
                      <span className="club-category-badge">{club.category}</span>
                    </div>
                  </div>
                  
                  <div className="club-content">
                    <h3 className="club-name">{club.name}</h3>
                    <p className="club-description">
                      {club.description.length > 120 
                        ? `${club.description.substring(0, 120)}...` 
                        : club.description
                      }
                    </p>
                    
                    <div className="club-stats">
                      <div className="stat-item">
                        <span className="stat-icon">👥</span>
                        <span className="stat-value">{club.members}</span>
                        <span className="stat-label">members</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-icon">📅</span>
                        <span className="stat-value">{club.established}</span>
                        <span className="stat-label">established</span>
                      </div>
                    </div>

                    {/* Social Links Preview */}
                    {club.socialLinks && (
                      <div className="club-social-preview">
                        {Object.keys(club.socialLinks).slice(0, 3).map(platform => (
                          <span key={platform} className="social-indicator">
                            {platform === 'instagram' && '📷'}
                            {platform === 'facebook' && '📘'}
                            {platform === 'twitter' && '🐦'}
                            {platform === 'linkedin' && '💼'}
                            {platform === 'website' && '🌐'}
                            {platform === 'youtube' && '📺'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="club-card-footer">
                    <span className="view-club-text">View Club →</span>
                  </div>
                </Link>
              </Card>
            ))}
          </GridContainer>
        ) : (
          <div className="no-results">
            <div className="no-results-content">
              <span className="no-results-icon">🔍</span>
              <h3 className="no-results-title">No clubs found</h3>
              <p className="no-results-text">
                Try adjusting your search terms or filters to find more clubs.
              </p>
              <button onClick={clearFilters} className="btn btn-primary">
                Show All Clubs
              </button>
            </div>
          </div>
        )}
      </PageContainer>
    </Layout>
  );
};

export default ClubGrid;