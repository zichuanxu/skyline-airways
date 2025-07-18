# Skyline Airways - Airline Homepage

A modern, responsive airline homepage built with React and Vite, inspired by ANA's design principles.

## Features

- **Modern Design**: Clean, professional interface with airline industry best practices
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Flight Booking Form**: Comprehensive booking interface with round-trip/one-way options
- **Interactive Elements**: Hover effects, smooth transitions, and user-friendly interactions
- **Service Showcase**: Highlighting key airline services and benefits

## Tech Stack

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and development server
- **Lucide React**: Beautiful, customizable icons
- **CSS3**: Modern styling with flexbox and grid
- **Date-fns**: Date manipulation utilities

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start development server**:

   ```bash
   npm run dev
   ```

3. **Build for production**:

   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── Header.jsx          # Navigation and branding
│   ├── Hero.jsx            # Hero section with background
│   ├── BookingForm.jsx     # Flight booking interface
│   ├── Services.jsx        # Service highlights
│   ├── Footer.jsx          # Footer with links and social
│   └── *.css              # Component-specific styles
├── App.jsx                # Main application component
├── App.css                # Global styles
└── index.css              # Base styles
```

## Key Components

### Header

- Company branding with "Skyline Airways" logo
- Navigation menu with key airline sections
- User actions (sign in, join, cart)
- Responsive mobile menu

### Hero Section

- Compelling headline and tagline
- Gradient background with subtle cloud pattern
- Responsive typography

### Booking Form

- Tab-based interface (Flights, Hotels, Car Rental, Packages)
- Round-trip/One-way selection
- City selection with swap functionality
- Date pickers for departure/return
- Passenger count selection
- Prominent search button

### Services Section

- Grid layout showcasing airline benefits
- Icon-based service highlights
- Hover animations for engagement

### Footer

- Comprehensive link organization
- Social media integration
- Company information and legal links

## Design Principles

- **User-Centric**: Booking form takes center stage, similar to ANA
- **Professional**: Clean typography and consistent spacing
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Modern**: Contemporary design patterns and smooth interactions
- **Brand-Focused**: Consistent blue color scheme throughout

## Customization

The design uses CSS custom properties and can be easily customized by modifying:

- Color scheme in component CSS files
- Typography in App.css
- Layout breakpoints for responsive design
- Component spacing and sizing

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project as a starting point for your own airline website.
