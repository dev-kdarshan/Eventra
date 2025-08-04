import React from 'react';
import { Link } from 'react-router-dom';
import Layout, { PageContainer, GridContainer, Card } from '../components/Layout';
import '../styles/about.css';

/**
 * About Page Component
 * Displays information about the Eventra platform, mission, features, and team
 */
const About = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Discover Events',
      description: 'Find events that match your interests across all campus clubs and organizations.'
    },
    {
      icon: '👥',
      title: 'Join Communities',
      description: 'Connect with like-minded students and become part of vibrant club communities.'
    },
    {
      icon: '📅',
      title: 'Never Miss Out',
      description: 'Stay updated with upcoming events and register with just a few clicks.'
    },
    {
      icon: '🏆',
      title: 'Build Your Profile',
      description: 'Track your participation and build a portfolio of campus involvement.'
    },
    {
      icon: '🔔',
      title: 'Smart Notifications',
      description: 'Get personalized reminders for events you\'re interested in.'
    },
    {
      icon: '🌐',
      title: 'Cross-Platform',
      description: 'Access Eventra on any device, anywhere, anytime.'
    }
  ];

  const stats = [
    { number: '50+', label: 'Active Clubs' },
    { number: '200+', label: 'Events Per Semester' },
    { number: '1000+', label: 'Student Members' },
    { number: '95%', label: 'Satisfaction Rate' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Platform Director',
      description: 'Computer Science student passionate about connecting campus communities.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b197?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Lead',
      description: 'Full-stack developer dedicated to creating seamless user experiences.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Community Manager',
      description: 'Event planning enthusiast focused on student engagement and growth.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face'
    },
    {
      name: 'David Kim',
      role: 'Design Lead',
      description: 'UX/UI designer committed to accessible and beautiful interfaces.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face'
    }
  ];

  return (
    <Layout>
      <div className="about-page">
        {/* Hero Section */}
        <section className="about-hero">
          <PageContainer>
            <div className="hero-content">
              <h1 className="hero-title">About Eventra</h1>
              <p className="hero-subtitle">
                Connecting campus communities through meaningful events and experiences
              </p>
              <p className="hero-description">
                Eventra is more than just an event management platform - it's the heartbeat 
                of campus life. We believe that every student deserves to find their community, 
                pursue their passions, and create lasting memories during their college journey.
              </p>
            </div>
          </PageContainer>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <PageContainer>
            <div className="mission-content">
              <div className="mission-text">
                <h2>Our Mission</h2>
                <p>
                  To bridge the gap between students and opportunities by creating a 
                  centralized platform where every club, event, and community gathering 
                  is just a click away. We're dedicated to fostering engagement, building 
                  connections, and enriching the college experience for every student.
                </p>
                <div className="mission-values">
                  <div className="value-item">
                    <h3>🤝 Community First</h3>
                    <p>We prioritize building strong, inclusive communities where every student feels welcome.</p>
                  </div>
                  <div className="value-item">
                    <h3>🚀 Innovation</h3>
                    <p>We continuously evolve our platform to meet the changing needs of campus life.</p>
                  </div>
                  <div className="value-item">
                    <h3>🎯 Accessibility</h3>
                    <p>We ensure that every student, regardless of background, can easily discover and participate.</p>
                  </div>
                </div>
              </div>
              <div className="mission-visual">
                <div className="stats-grid">
                  {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                      <span className="stat-number">{stat.number}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <PageContainer>
            <div className="section-header">
              <h2>What Makes Eventra Special</h2>
              <p>Discover the features that make campus event discovery effortless and engaging</p>
            </div>
            
            <GridContainer columns="auto" gap="large">
              {features.map((feature, index) => (
                <Card key={index} className="feature-card">
                  <div className="feature-icon">{feature.icon}</div>
                  <h3 className="feature-title">{feature.title}</h3>
                  <p className="feature-description">{feature.description}</p>
                </Card>
              ))}
            </GridContainer>
          </PageContainer>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works-section">
          <PageContainer>
            <div className="section-header">
              <h2>How Eventra Works</h2>
              <p>Getting involved in campus life has never been easier</p>
            </div>
            
            <div className="steps-container">
              <div className="step-item">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Explore</h3>
                  <p>Browse through diverse clubs and discover events that match your interests and schedule.</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Connect</h3>
                  <p>Join clubs that resonate with you and connect with fellow students who share your passions.</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Participate</h3>
                  <p>Register for events with one click and attend activities that enrich your college experience.</p>
                </div>
              </div>
              
              <div className="step-item">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Grow</h3>
                  <p>Build lasting friendships, develop new skills, and create memories that will last a lifetime.</p>
                </div>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <PageContainer>
            <div className="section-header">
              <h2>Meet Our Team</h2>
              <p>The passionate students behind Eventra</p>
            </div>
            
            <GridContainer columns="auto" gap="large">
              {team.map((member, index) => (
                <Card key={index} className="team-card">
                  <div className="team-member-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="team-member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-role">{member.role}</p>
                    <p className="member-description">{member.description}</p>
                  </div>
                </Card>
              ))}
            </GridContainer>
          </PageContainer>
        </section>

        {/* Get Involved Section */}
        <section className="get-involved-section">
          <PageContainer>
            <div className="get-involved-content">
              <h2>Ready to Get Involved?</h2>
              <p>
                Join thousands of students who are already using Eventra to discover, 
                connect, and participate in campus life. Your next great experience 
                is just a click away.
              </p>
              <div className="get-involved-actions">
                <Link to="/clubs" className="btn btn-primary btn-large">
                  Explore Clubs
                </Link>
                <Link to="/events" className="btn btn-outline btn-large">
                  Browse Events
                </Link>
              </div>
            </div>
          </PageContainer>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <PageContainer>
            <div className="contact-content">
              <div className="contact-info">
                <h2>Get in Touch</h2>
                <p>
                  Have questions, suggestions, or want to partner with us? 
                  We'd love to hear from you!
                </p>
                <div className="contact-details">
                  <div className="contact-item">
                    <span className="contact-icon">📧</span>
                    <div>
                      <strong>Email</strong>
                      <p>hello@eventra.edu</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">📍</span>
                    <div>
                      <strong>Office</strong>
                      <p>Student Center, Room 201<br />University Campus</p>
                    </div>
                  </div>
                  <div className="contact-item">
                    <span className="contact-icon">🕒</span>
                    <div>
                      <strong>Hours</strong>
                      <p>Monday - Friday<br />9:00 AM - 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="contact-form">
                <h3>Send us a message</h3>
                <form className="message-form">
                  <div className="form-group">
                    <input type="text" placeholder="Your Name" required />
                  </div>
                  <div className="form-group">
                    <input type="email" placeholder="Your Email" required />
                  </div>
                  <div className="form-group">
                    <select required>
                      <option value="">Select a topic</option>
                      <option value="general">General Inquiry</option>
                      <option value="club">Club Partnership</option>
                      <option value="technical">Technical Support</option>
                      <option value="feedback">Feedback</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <textarea placeholder="Your Message" rows="4" required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </PageContainer>
        </section>
      </div>
    </Layout>
  );
};

export default About;