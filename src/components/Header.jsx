import { Menu, User, ShoppingCart } from 'lucide-react'
import './Header.css'

const Header = () => {
  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <span className="logo-text">Skyline Airways</span>
          <span className="logo-tagline">Reach New Heights</span>
        </div>

        <nav className="nav">
          <a href="#" className="nav-link active">Book</a>
          <a href="#" className="nav-link">Flight Status</a>
          <a href="#" className="nav-link">Check-in</a>
          <a href="#" className="nav-link">My Trips</a>
          <a href="#" className="nav-link">Destinations</a>
        </nav>

        <div className="header-actions">
          <button className="header-btn">
            <ShoppingCart size={20} />
          </button>
          <button className="header-btn">
            <User size={20} />
            Sign In
          </button>
          <button className="header-btn join-btn">Join</button>
          <button className="mobile-menu">
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header