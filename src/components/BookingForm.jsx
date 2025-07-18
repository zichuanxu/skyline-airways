import { useState, useRef, useEffect } from 'react'
import { ArrowLeftRight, Calendar, Users, Search, ChevronDown } from 'lucide-react'
import './BookingForm.css'

const BookingForm = () => {
  const [tripType, setTripType] = useState('roundtrip')
  const [from, setFrom] = useState('New York (JFK)')
  const [to, setTo] = useState('Los Angeles (LAX)')
  const [departDate, setDepartDate] = useState('2024-07-20')
  const [returnDate, setReturnDate] = useState('2024-07-27')
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  })
  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false)
  const [fromSearch, setFromSearch] = useState('')
  const [toSearch, setToSearch] = useState('')

  const fromRef = useRef(null)
  const toRef = useRef(null)
  const passengerRef = useRef(null)

  const hotCities = [
    'New York (JFK)', 'Los Angeles (LAX)', 'Chicago (ORD)', 'Miami (MIA)',
    'San Francisco (SFO)', 'Las Vegas (LAS)', 'Seattle (SEA)', 'Boston (BOS)',
    'Denver (DEN)', 'Atlanta (ATL)', 'Dallas (DFW)', 'Phoenix (PHX)',
    'London (LHR)', 'Paris (CDG)', 'Tokyo (NRT)', 'Sydney (SYD)',
    'Dubai (DXB)', 'Singapore (SIN)', 'Hong Kong (HKG)', 'Toronto (YYZ)'
  ]

  const filteredFromCities = hotCities.filter(city =>
    city.toLowerCase().includes(fromSearch.toLowerCase())
  )

  const filteredToCities = hotCities.filter(city =>
    city.toLowerCase().includes(toSearch.toLowerCase())
  )

  const handleSwapCities = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handlePassengerChange = (type, increment) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment)
    }))
  }

  const getTotalPassengers = () => {
    return passengers.adults + passengers.children + passengers.infants
  }

  const getPassengerText = () => {
    const total = getTotalPassengers()
    if (total === 0) return '0 Passengers'
    if (total === 1) return '1 Passenger'
    return `${total} Passengers`
  }

  const handleSearch = () => {
    const total = getTotalPassengers()
    alert(`Searching flights from ${from} to ${to} on ${departDate}${tripType === 'roundtrip' ? ` returning ${returnDate}` : ''} for ${total} passenger${total > 1 ? 's' : ''} (${passengers.adults} adults, ${passengers.children} children, ${passengers.infants} infants)`)
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (fromRef.current && !fromRef.current.contains(event.target)) {
        setShowFromDropdown(false)
      }
      if (toRef.current && !toRef.current.contains(event.target)) {
        setShowToDropdown(false)
      }
      if (passengerRef.current && !passengerRef.current.contains(event.target)) {
        setShowPassengerDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="booking-section">
      <div className="booking-container">
        <div className="booking-tabs">
          <button className="tab active">Flights</button>
          <button className="tab">Hotels</button>
          <button className="tab">Car Rental</button>
          <button className="tab">Packages</button>
        </div>

        <div className="booking-form">
          {/* Trip Type - Centered */}
          <div className="trip-type-centered">
            <label className="radio-label">
              <input
                type="radio"
                value="roundtrip"
                checked={tripType === 'roundtrip'}
                onChange={(e) => setTripType(e.target.value)}
              />
              Round Trip
            </label>
            <label className="radio-label">
              <input
                type="radio"
                value="oneway"
                checked={tripType === 'oneway'}
                onChange={(e) => setTripType(e.target.value)}
              />
              One Way
            </label>
          </div>

          {/* Cities Row - Centered and One Line */}
          <div className="cities-row">
            <div className="city-selector" ref={fromRef}>
              <label>From</label>
              <div className="city-dropdown">
                <input
                  type="text"
                  placeholder="Search departure city"
                  value={fromSearch || from}
                  onChange={(e) => {
                    setFromSearch(e.target.value)
                    setShowFromDropdown(true)
                  }}
                  onFocus={() => setShowFromDropdown(true)}
                />
                <ChevronDown size={16} className="dropdown-icon" />
                {showFromDropdown && (
                  <div className="dropdown-menu">
                    {filteredFromCities.map((city) => (
                      <div
                        key={city}
                        className="dropdown-item"
                        onClick={() => {
                          setFrom(city)
                          setFromSearch('')
                          setShowFromDropdown(false)
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <button className="swap-btn-centered" onClick={handleSwapCities}>
              <ArrowLeftRight size={20} />
            </button>

            <div className="city-selector" ref={toRef}>
              <label>To</label>
              <div className="city-dropdown">
                <input
                  type="text"
                  placeholder="Search arrival city"
                  value={toSearch || to}
                  onChange={(e) => {
                    setToSearch(e.target.value)
                    setShowToDropdown(true)
                  }}
                  onFocus={() => setShowToDropdown(true)}
                />
                <ChevronDown size={16} className="dropdown-icon" />
                {showToDropdown && (
                  <div className="dropdown-menu">
                    {filteredToCities.map((city) => (
                      <div
                        key={city}
                        className="dropdown-item"
                        onClick={() => {
                          setTo(city)
                          setToSearch('')
                          setShowToDropdown(false)
                        }}
                      >
                        {city}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Dates and Passengers Row */}
          <div className="form-row">
            <div className="input-group">
              <label>Departure Date</label>
              <div className="date-input">
                <Calendar size={20} />
                <input
                  type="date"
                  value={departDate}
                  onChange={(e) => setDepartDate(e.target.value)}
                />
              </div>
            </div>

            {tripType === 'roundtrip' && (
              <div className="input-group">
                <label>Return Date</label>
                <div className="date-input">
                  <Calendar size={20} />
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                  />
                </div>
              </div>
            )}

            <div className="input-group" ref={passengerRef}>
              <label>Passengers</label>
              <div className="passenger-selector">
                <div
                  className="passenger-display"
                  onClick={() => setShowPassengerDropdown(!showPassengerDropdown)}
                >
                  <Users size={20} />
                  <span>{getPassengerText()}</span>
                  <ChevronDown size={16} className="dropdown-icon" />
                </div>
                {showPassengerDropdown && (
                  <div className="passenger-dropdown">
                    <div className="passenger-row">
                      <div className="passenger-info">
                        <span className="passenger-type">Adults</span>
                        <span className="passenger-desc">12+ years</span>
                      </div>
                      <div className="passenger-controls">
                        <button
                          type="button"
                          onClick={() => handlePassengerChange('adults', -1)}
                          disabled={passengers.adults <= 1}
                        >
                          -
                        </button>
                        <span>{passengers.adults}</span>
                        <button
                          type="button"
                          onClick={() => handlePassengerChange('adults', 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="passenger-row">
                      <div className="passenger-info">
                        <span className="passenger-type">Children</span>
                        <span className="passenger-desc">2-11 years</span>
                      </div>
                      <div className="passenger-controls">
                        <button
                          type="button"
                          onClick={() => handlePassengerChange('children', -1)}
                          disabled={passengers.children <= 0}
                        >
                          -
                        </button>
                        <span>{passengers.children}</span>
                        <button
                          type="button"
                          onClick={() => handlePassengerChange('children', 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="passenger-row">
                      <div className="passenger-info">
                        <span className="passenger-type">Infants</span>
                        <span className="passenger-desc">Under 2 years</span>
                      </div>
                      <div className="passenger-controls">
                        <button
                          type="button"
                          onClick={() => handlePassengerChange('infants', -1)}
                          disabled={passengers.infants <= 0}
                        >
                          -
                        </button>
                        <span>{passengers.infants}</span>
                        <button
                          type="button"
                          onClick={() => handlePassengerChange('infants', 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            <Search size={20} />
            Search Flights
          </button>
        </div>
      </div>
    </section>
  )
}

export default BookingForm