# Eventra - Campus Event Management Platform

Eventra is a comprehensive event management platform designed specifically for college campuses. It serves as a centralized hub where students can discover clubs, explore events, and engage with campus communities.

## 🚀 Features

### Core Functionality
- **Club Discovery**: Browse through diverse campus clubs with detailed information
- **Event Management**: View upcoming events with comprehensive details and registration links
- **Search & Filter**: Advanced filtering by categories, dates, and search terms
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Interactive Navigation**: Smooth routing between different sections

### Key Components
- **Welcome Page**: Hero section with featured clubs and upcoming events
- **Club Grid**: Comprehensive listing of all campus clubs with search and filtering
- **Event Grid**: Events listing (all events or club-specific) with date filtering
- **Event Details**: Detailed event pages with registration functionality
- **About Page**: Platform information and team details

## 🏗️ Project Structure

```
eventra/
├── public/                     # Static assets
├── src/
│   ├── components/            # Reusable UI components
│   │   ├── Navbar.jsx        # Navigation header
│   │   ├── Footer.jsx        # Site footer
│   │   ├── Loader.jsx        # Loading animations
│   │   └── Layout.jsx        # Layout containers and grid systems
│   ├── pages/                # Main route components
│   │   ├── Welcome.jsx       # Home/landing page
│   │   ├── Club_grid.jsx     # Clubs listing page
│   │   ├── Event_grid.jsx    # Events listing page
│   │   ├── Event_detail.jsx  # Event detail page
│   │   └── About.jsx         # About page
│   ├── data/                 # Sample data (JSON)
│   │   ├── clubsData.json    # Club information
│   │   └── eventsData.json   # Event information
│   ├── styles/               # CSS stylesheets
│   │   ├── *.css            # Component-specific styles
│   │   └── index.css        # Global styles and variables
│   ├── App.jsx              # Main app component with routing
│   └── index.js             # App entry point
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
- **Primary**: #6366f1 (Indigo)
- **Secondary**: #06b6d4 (Cyan)
- **Accent**: #f59e0b (Amber)
- **Success**: #10b981 (Emerald)
- **Gray Scale**: Complete range from #f9fafb to #111827

### Typography
- **Font Family**: Inter (with system fallbacks)
- **Responsive Scale**: From 0.75rem to 2.25rem
- **Font Weights**: 400, 500, 600, 700, 800

### Layout System
- **CSS Grid**: Auto-responsive grid layouts
- **Flexbox**: Component-level layouts
- **Container Max Width**: 1200px
- **Responsive Breakpoints**: 480px, 768px, 1024px

## 🛠️ Technologies Used

- **React 19**: Latest React with modern hooks and features
- **React Router DOM**: Client-side routing and navigation
- **CSS3**: Modern CSS with custom properties (CSS variables)
- **CSS Grid & Flexbox**: Advanced layout systems
- **JSON**: Sample data storage

## 🚦 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eventra
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 📱 Pages & Navigation

### Routes
- `/` - Welcome/Home page
- `/clubs` - All clubs grid
- `/clubs/:clubId` - Club-specific events
- `/events` - All events grid  
- `/events/:eventId` - Event detail page
- `/about` - About page
- `/my-events` - User's events (placeholder)

### Navigation Flow
1. **Homepage** → Browse featured clubs and upcoming events
2. **Clubs** → Explore all clubs → Select club → View club events
3. **Events** → Browse all events → Select event → View details & register
4. **About** → Learn about platform and team

## 🎯 Key Features Implementation

### Search & Filtering
- **Real-time search** across club names and descriptions
- **Category filtering** by club types (Technology, Arts, Sports, etc.)
- **Date filtering** for events (upcoming, this week, this month, past)
- **Sorting options** by name, member count, date, popularity

### Responsive Design
- **Mobile-first approach** with progressive enhancement
- **Flexible grid systems** that adapt to screen sizes
- **Touch-friendly interfaces** with appropriate spacing
- **Optimized images** with proper aspect ratios

### Performance Optimizations
- **Lazy loading** simulation for realistic UX
- **Efficient state management** with React hooks
- **Optimized bundle size** with Create React App
- **Semantic HTML** for accessibility and SEO

## 📊 Sample Data

### Clubs (8 different clubs)
- Tech Innovation Club
- Cultural Arts Society  
- Environmental Action Group
- Business & Entrepreneurship Club
- Sports & Recreation Committee
- Photography Club
- Debate & Public Speaking Society
- Music & Performing Arts

### Events (11 diverse events)
- Hackathons and workshops
- Cultural festivals and performances
- Environmental initiatives
- Business competitions
- Sports tournaments
- Art exhibitions
- Debate championships
- Musical concerts

## 🔧 Customization

### Adding New Data
1. **Clubs**: Edit `src/data/clubsData.json`
2. **Events**: Edit `src/data/eventsData.json`

### Styling Modifications
- **Global variables**: `src/index.css` (CSS custom properties)
- **Component styles**: Individual CSS files in `src/styles/`
- **Responsive breakpoints**: Defined in CSS variables

### Adding New Pages
1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Create corresponding CSS file
4. Update navigation in `src/components/Navbar.jsx`

## 🎭 Component Architecture

### Layout Components
- **Layout**: Main wrapper with navbar and footer
- **PageContainer**: Consistent page structure
- **GridContainer**: Responsive grid layouts
- **Card**: Reusable card component

### Utility Components
- **Loader**: Multiple loading states and animations
- **Navbar**: Responsive navigation with mobile menu
- **Footer**: Comprehensive site footer

### Page Components
- **Modular design** with clear separation of concerns
- **Reusable logic** with custom hooks
- **Consistent styling** patterns across pages

## 🚀 Future Enhancements

### Potential Features
- User authentication and profiles
- Event registration system
- Club membership management
- Real-time notifications
- Calendar integration
- Social features (comments, ratings)
- Admin dashboard for club managers

### Technical Improvements
- Backend API integration
- Database connectivity
- Image upload functionality
- Progressive Web App (PWA) features
- Advanced search with Elasticsearch
- Real-time updates with WebSockets

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Team

Built with ❤️ by the Eventra development team. See the About page for detailed team information.

---

**Eventra** - Connecting campus communities through meaningful events and experiences.