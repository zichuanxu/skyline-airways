import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Skyline Airways</h3>
            <p>Connecting the world with premium air travel experiences.</p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><Facebook size={24} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={24} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={24} /></a>
              <a href="#" aria-label="LinkedIn"><Linkedin size={24} /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Travel</h4>
            <ul>
              <li><a href="#">Book a Flight</a></li>
              <li><a href="#">Flight Status</a></li>
              <li><a href="#">Check-in</a></li>
              <li><a href="#">Manage Booking</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Experience</h4>
            <ul>
              <li><a href="#">Cabin Classes</a></li>
              <li><a href="#">In-flight Services</a></li>
              <li><a href="#">Dining</a></li>
              <li><a href="#">Entertainment</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Baggage Info</a></li>
              <li><a href="#">Special Assistance</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2025 Skyline Airways. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer