import { useState, useRef, useEffect } from 'react'
import { ArrowLeftRight, Calendar, Users, Search, ChevronDown, MapPin, Car, Bed } from 'lucide-react'
import './BookingForm.css'

const BookingForm = () => {
  const [activeTab, setActiveTab] = useState('flights')
  const [tripType, setTripType] = useState('roundtrip')

  // Flight data
  const [from, setFrom] = useState('New York (JFK)')
  const [to, setTo] = useState('Los Angeles (LAX)')
  const [departDate, setDepartDate] = useState('2025-08-20')
  const [returnDate, setReturnDate] = useState('2025-08-27')
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0
  })

  // Hotel data
  const [hotelLocation, setHotelLocation] = useState('New York')
  const [checkInDate, setCheckInDate] = useState('2025-08-20')
  const [checkOutDate, setCheckOutDate] = useState('2025-08-27')
  const [hotelGuests, setHotelGuests] = useState({
    adults: 1,
    children: 0
  })
  const [rooms, setRooms] = useState(1)

  // Car rental data
  const [pickupLocation, setPickupLocation] = useState('New York (JFK)')
  const [dropoffLocation, setDropoffLocation] = useState('New York (JFK)')
  const [pickupDate, setPickupDate] = useState('2025-08-20')
  const [dropoffDate, setDropoffDate] = useState('2025-08-27')
  const [pickupTime, setPickupTime] = useState('10:00')
  const [dropoffTime, setDropoffTime] = useState('10:00')

  const [carClasses, setCarClasses] = useState({
    economy: true,
    compact: true,
    midsize: false,
    fullsize: false,
    luxury: false,
    suv: false,
    van: false,
    truck: false
  })
  const [transmission, setTransmission] = useState('automatic')
  const [fuelType, setFuelType] = useState('gasoline')

  // Dropdown states
  const [showFromDropdown, setShowFromDropdown] = useState(false)
  const [showToDropdown, setShowToDropdown] = useState(false)
  const [showPassengerDropdown, setShowPassengerDropdown] = useState(false)
  const [showHotelLocationDropdown, setShowHotelLocationDropdown] = useState(false)
  const [showHotelGuestDropdown, setShowHotelGuestDropdown] = useState(false)
  const [showPickupDropdown, setShowPickupDropdown] = useState(false)
  const [showDropoffDropdown, setShowDropoffDropdown] = useState(false)

  // Search states
  const [fromSearch, setFromSearch] = useState('')
  const [toSearch, setToSearch] = useState('')
  const [hotelLocationSearch, setHotelLocationSearch] = useState('')
  const [pickupLocationSearch, setPickupLocationSearch] = useState('')
  const [dropoffLocationSearch, setDropoffLocationSearch] = useState('')

  const fromRef = useRef(null)
  const toRef = useRef(null)
  const passengerRef = useRef(null)
  const hotelLocationRef = useRef(null)
  const hotelGuestRef = useRef(null)
  const pickupRef = useRef(null)
  const dropoffRef = useRef(null)

  const hotCities = [
    'New York (JFK)', 'Los Angeles (LAX)', 'Chicago (ORD)', 'Miami (MIA)',
    'San Francisco (SFO)', 'Las Vegas (LAS)', 'Seattle (SEA)', 'Boston (BOS)',
    'Denver (DEN)', 'Atlanta (ATL)', 'Dallas (DFW)', 'Phoenix (PHX)',
    'London (LHR)', 'Paris (CDG)', 'Tokyo (NRT)', 'Sydney (SYD)',
    'Dubai (DXB)', 'Singapore (SIN)', 'Hong Kong (HKG)', 'Toronto (YYZ)'
  ]

  const hotelCities = [
    'New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco',
    'Las Vegas', 'Seattle', 'Boston', 'Denver', 'Atlanta', 'Dallas',
    'Phoenix', 'London', 'Paris', 'Tokyo', 'Sydney', 'Dubai',
    'Singapore', 'Hong Kong', 'Toronto'
  ]

  const filteredFromCities = hotCities.filter(city =>
    city.toLowerCase().includes(fromSearch.toLowerCase())
  )

  const filteredToCities = hotCities.filter(city =>
    city.toLowerCase().includes(toSearch.toLowerCase())
  )

  const filteredHotelCities = hotelCities.filter(city =>
    city.toLowerCase().includes(hotelLocationSearch.toLowerCase())
  )

  const filteredPickupCities = hotCities.filter(city =>
    city.toLowerCase().includes(pickupLocationSearch.toLowerCase())
  )

  const filteredDropoffCities = hotCities.filter(city =>
    city.toLowerCase().includes(dropoffLocationSearch.toLowerCase())
  )

  // Date validation functions
  const getTodayDate = () => {
    return new Date().toISOString().split('T')[0]
  }

  const validateDates = (startDate, endDate) => {
    const today = getTodayDate()
    const start = new Date(startDate)
    const end = new Date(endDate)

    if (startDate < today) {
      return { valid: false, message: 'Start date cannot be in the past' }
    }
    if (endDate && endDate < startDate) {
      return { valid: false, message: 'End date must be after start date' }
    }
    return { valid: true }
  }

  const handleDepartDateChange = (newDate) => {
    const today = getTodayDate()
    if (newDate < today) {
      alert('Departure date cannot be in the past')
      return
    }
    setDepartDate(newDate)

    // Auto-adjust return date if it's before or equal to new departure date
    if (tripType === 'roundtrip' && returnDate && returnDate <= newDate) {
      const nextDay = new Date(newDate)
      nextDay.setDate(nextDay.getDate() + 1)
      setReturnDate(nextDay.toISOString().split('T')[0])
    }
  }

  const handleReturnDateChange = (newDate) => {
    if (newDate <= departDate) {
      alert('Return date must be after departure date')
      return
    }
    setReturnDate(newDate)
  }

  const handleCheckInDateChange = (newDate) => {
    const today = getTodayDate()
    if (newDate < today) {
      alert('Check-in date cannot be in the past')
      return
    }
    setCheckInDate(newDate)

    // Auto-adjust check-out date if it's before or equal to new check-in date
    if (checkOutDate && checkOutDate <= newDate) {
      const nextDay = new Date(newDate)
      nextDay.setDate(nextDay.getDate() + 1)
      setCheckOutDate(nextDay.toISOString().split('T')[0])
    }
  }

  const handleCheckOutDateChange = (newDate) => {
    if (newDate <= checkInDate) {
      alert('Check-out date must be after check-in date')
      return
    }
    setCheckOutDate(newDate)
  }

  const handlePickupDateChange = (newDate) => {
    const today = getTodayDate()
    if (newDate < today) {
      alert('Pick-up date cannot be in the past')
      return
    }
    setPickupDate(newDate)

    // Auto-adjust drop-off date if it's before new pickup date
    if (dropoffDate && dropoffDate < newDate) {
      setDropoffDate(newDate)
    }
  }

  const handleDropoffDateChange = (newDate) => {
    if (newDate < pickupDate) {
      alert('Drop-off date must be on or after pick-up date')
      return
    }
    setDropoffDate(newDate)
  }

  const handleSwapCities = () => {
    const temp = from
    setFrom(to)
    setTo(temp)
  }

  const handleSwapCarLocations = () => {
    const temp = pickupLocation
    setPickupLocation(dropoffLocation)
    setDropoffLocation(temp)
  }

  const handlePassengerChange = (type, increment) => {
    setPassengers(prev => ({
      ...prev,
      [type]: Math.max(0, prev[type] + increment)
    }))
  }

  const handleHotelGuestChange = (type, increment) => {
    setHotelGuests(prev => ({
      ...prev,
      [type]: Math.max(type === 'adults' ? 1 : 0, prev[type] + increment)
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

  const getTotalHotelGuests = () => {
    return hotelGuests.adults + hotelGuests.children
  }

  const getHotelGuestText = () => {
    const total = getTotalHotelGuests()
    if (total === 1) return '1 Guest'
    return `${total} Guests`
  }

  const getRoomText = () => {
    if (rooms === 1) return '1 Room'
    return `${rooms} Rooms`
  }

  const handleCarClassChange = (className) => {
    setCarClasses(prev => ({
      ...prev,
      [className]: !prev[className]
    }))
  }

  const getSelectedCarClasses = () => {
    return Object.entries(carClasses)
      .filter(([_, selected]) => selected)
      .map(([className, _]) => className.charAt(0).toUpperCase() + className.slice(1))
  }

  const handleSearch = () => {
    if (activeTab === 'flights') {
      const total = getTotalPassengers()
      if (total === 0) {
        alert('Please select at least 1 passenger')
        return
      }
      if (from === to) {
        alert('Departure and arrival cities must be different')
        return
      }
      const validation = validateDates(departDate, tripType === 'roundtrip' ? returnDate : null)
      if (!validation.valid) {
        alert(validation.message)
        return
      }
      alert(`Searching flights from ${from} to ${to} on ${departDate}${tripType === 'roundtrip' ? ` returning ${returnDate}` : ''} for ${total} passenger${total > 1 ? 's' : ''} (${passengers.adults} adults, ${passengers.children} children, ${passengers.infants} infants)`)
    } else if (activeTab === 'hotels') {
      const total = getTotalHotelGuests()
      if (total === 0) {
        alert('Please select at least 1 guest')
        return
      }
      const validation = validateDates(checkInDate, checkOutDate)
      if (!validation.valid) {
        alert(validation.message)
        return
      }
      alert(`Searching hotels in ${hotelLocation} from ${checkInDate} to ${checkOutDate} for ${total} guest${total > 1 ? 's' : ''} (${hotelGuests.adults} adults, ${hotelGuests.children} children) in ${rooms} room${rooms > 1 ? 's' : ''}`)
    } else if (activeTab === 'cars') {
      const validation = validateDates(pickupDate, dropoffDate)
      if (!validation.valid) {
        alert(validation.message)
        return
      }
      const selectedClasses = getSelectedCarClasses()
      if (selectedClasses.length === 0) {
        alert('Please select at least one vehicle class')
        return
      }
      alert(`Searching car rentals from ${pickupLocation} to ${dropoffLocation} from ${pickupDate} ${pickupTime} to ${dropoffDate} ${dropoffTime}. Vehicle classes: ${selectedClasses.join(', ')}. Transmission: ${transmission}, Fuel: ${fuelType}`)
    }
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
      if (hotelLocationRef.current && !hotelLocationRef.current.contains(event.target)) {
        setShowHotelLocationDropdown(false)
      }
      if (hotelGuestRef.current && !hotelGuestRef.current.contains(event.target)) {
        setShowHotelGuestDropdown(false)
      }
      if (pickupRef.current && !pickupRef.current.contains(event.target)) {
        setShowPickupDropdown(false)
      }
      if (dropoffRef.current && !dropoffRef.current.contains(event.target)) {
        setShowDropoffDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <section className="booking-section">
      <div className="booking-container">
        <div className="booking-tabs">
          <button
            className={`tab ${activeTab === 'flights' ? 'active' : ''}`}
            onClick={() => setActiveTab('flights')}
          >
            Flights
          </button>
          <button
            className={`tab ${activeTab === 'hotels' ? 'active' : ''}`}
            onClick={() => setActiveTab('hotels')}
          >
            Hotels
          </button>
          <button
            className={`tab ${activeTab === 'cars' ? 'active' : ''}`}
            onClick={() => setActiveTab('cars')}
          >
            Car Rental
          </button>
        </div>

        <div className="booking-form">
          {/* FLIGHTS TAB */}
          {activeTab === 'flights' && (
            <>
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

              {/* Cities Row - Centered and One Line with proper margins */}
              <div className="cities-row-aligned">
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
                      min={getTodayDate()}
                      onChange={(e) => handleDepartDateChange(e.target.value)}
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
                        min={departDate}
                        onChange={(e) => handleReturnDateChange(e.target.value)}
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
            </>
          )}

          {/* HOTELS TAB */}
          {activeTab === 'hotels' && (
            <>
              {/* Hotel Location Row - Unified with flights UI */}
              <div className="cities-row-aligned">
                <div className="city-selector" ref={hotelLocationRef}>
                  <label>Destination</label>
                  <div className="city-dropdown">
                    <input
                      type="text"
                      placeholder="Search hotel destination"
                      value={hotelLocationSearch || hotelLocation}
                      onChange={(e) => {
                        setHotelLocationSearch(e.target.value)
                        setShowHotelLocationDropdown(true)
                      }}
                      onFocus={() => setShowHotelLocationDropdown(true)}
                    />
                    <ChevronDown size={16} className="dropdown-icon" />
                    {showHotelLocationDropdown && (
                      <div className="dropdown-menu">
                        {filteredHotelCities.map((city) => (
                          <div
                            key={city}
                            className="dropdown-item"
                            onClick={() => {
                              setHotelLocation(city)
                              setHotelLocationSearch('')
                              setShowHotelLocationDropdown(false)
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

              {/* Hotel Dates and Guests Row */}
              <div className="form-row">
                <div className="input-group">
                  <label>Check-in Date</label>
                  <div className="date-input">
                    <Calendar size={20} />
                    <input
                      type="date"
                      value={checkInDate}
                      min={getTodayDate()}
                      onChange={(e) => handleCheckInDateChange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label>Check-out Date</label>
                  <div className="date-input">
                    <Calendar size={20} />
                    <input
                      type="date"
                      value={checkOutDate}
                      min={checkInDate}
                      onChange={(e) => handleCheckOutDateChange(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group" ref={hotelGuestRef}>
                  <label>Guests & Rooms</label>
                  <div className="passenger-selector">
                    <div
                      className="passenger-display"
                      onClick={() => setShowHotelGuestDropdown(!showHotelGuestDropdown)}
                    >
                      <Bed size={20} />
                      <span>{getHotelGuestText()}, {getRoomText()}</span>
                      <ChevronDown size={16} className="dropdown-icon" />
                    </div>
                    {showHotelGuestDropdown && (
                      <div className="passenger-dropdown">
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <span className="passenger-type">Adults</span>
                            <span className="passenger-desc">18+ years</span>
                          </div>
                          <div className="passenger-controls">
                            <button
                              type="button"
                              onClick={() => handleHotelGuestChange('adults', -1)}
                              disabled={hotelGuests.adults <= 1}
                            >
                              -
                            </button>
                            <span>{hotelGuests.adults}</span>
                            <button
                              type="button"
                              onClick={() => handleHotelGuestChange('adults', 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <span className="passenger-type">Children</span>
                            <span className="passenger-desc">0-17 years</span>
                          </div>
                          <div className="passenger-controls">
                            <button
                              type="button"
                              onClick={() => handleHotelGuestChange('children', -1)}
                              disabled={hotelGuests.children <= 0}
                            >
                              -
                            </button>
                            <span>{hotelGuests.children}</span>
                            <button
                              type="button"
                              onClick={() => handleHotelGuestChange('children', 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="passenger-row">
                          <div className="passenger-info">
                            <span className="passenger-type">Rooms</span>
                            <span className="passenger-desc">Hotel rooms</span>
                          </div>
                          <div className="passenger-controls">
                            <button
                              type="button"
                              onClick={() => setRooms(Math.max(1, rooms - 1))}
                              disabled={rooms <= 1}
                            >
                              -
                            </button>
                            <span>{rooms}</span>
                            <button
                              type="button"
                              onClick={() => setRooms(rooms + 1)}
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
                Search Hotels
              </button>
            </>
          )}

          {/* CAR RENTAL TAB */}
          {activeTab === 'cars' && (
            <>
              {/* Car Locations Row */}
              <div className="cities-row-aligned">
                <div className="city-selector" ref={pickupRef}>
                  <label>Pick-up Location</label>
                  <div className="city-dropdown">
                    <input
                      type="text"
                      placeholder="Search pick-up location"
                      value={pickupLocationSearch || pickupLocation}
                      onChange={(e) => {
                        setPickupLocationSearch(e.target.value)
                        setShowPickupDropdown(true)
                      }}
                      onFocus={() => setShowPickupDropdown(true)}
                    />
                    <ChevronDown size={16} className="dropdown-icon" />
                    {showPickupDropdown && (
                      <div className="dropdown-menu">
                        {filteredPickupCities.map((city) => (
                          <div
                            key={city}
                            className="dropdown-item"
                            onClick={() => {
                              setPickupLocation(city)
                              setPickupLocationSearch('')
                              setShowPickupDropdown(false)
                            }}
                          >
                            {city}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <button className="swap-btn-centered" onClick={handleSwapCarLocations}>
                  <ArrowLeftRight size={20} />
                </button>

                <div className="city-selector" ref={dropoffRef}>
                  <label>Drop-off Location</label>
                  <div className="city-dropdown">
                    <input
                      type="text"
                      placeholder="Search drop-off location"
                      value={dropoffLocationSearch || dropoffLocation}
                      onChange={(e) => {
                        setDropoffLocationSearch(e.target.value)
                        setShowDropoffDropdown(true)
                      }}
                      onFocus={() => setShowDropoffDropdown(true)}
                    />
                    <ChevronDown size={16} className="dropdown-icon" />
                    {showDropoffDropdown && (
                      <div className="dropdown-menu">
                        {filteredDropoffCities.map((city) => (
                          <div
                            key={city}
                            className="dropdown-item"
                            onClick={() => {
                              setDropoffLocation(city)
                              setDropoffLocationSearch('')
                              setShowDropoffDropdown(false)
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

              {/* Car Dates and Times Row */}
              <div className="form-row">
                <div className="input-group">
                  <label>Pick-up Date & Time</label>
                  <div className="date-time-input">
                    <div className="date-input">
                      <Calendar size={20} />
                      <input
                        type="date"
                        value={pickupDate}
                        min={getTodayDate()}
                        onChange={(e) => handlePickupDateChange(e.target.value)}
                      />
                    </div>
                    <select
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      className="time-select"
                    >
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <option key={`${hour}:00`} value={`${hour}:00`}>
                            {hour}:00
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>

                <div className="input-group">
                  <label>Drop-off Date & Time</label>
                  <div className="date-time-input">
                    <div className="date-input">
                      <Calendar size={20} />
                      <input
                        type="date"
                        value={dropoffDate}
                        min={pickupDate}
                        onChange={(e) => handleDropoffDateChange(e.target.value)}
                      />
                    </div>
                    <select
                      value={dropoffTime}
                      onChange={(e) => setDropoffTime(e.target.value)}
                      className="time-select"
                    >
                      {Array.from({ length: 24 }, (_, i) => {
                        const hour = i.toString().padStart(2, '0')
                        return (
                          <option key={`${hour}:00`} value={`${hour}:00`}>
                            {hour}:00
                          </option>
                        )
                      })}
                    </select>
                  </div>
                </div>


              </div>

              {/* Vehicle Class Selection - Inspired by ANA */}
              <div className="car-options-section">
                <div className="car-options-group">
                  <label className="options-label">Vehicle Class</label>
                  <div className="checkbox-grid">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.economy}
                        onChange={() => handleCarClassChange('economy')}
                      />
                      Economy
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.compact}
                        onChange={() => handleCarClassChange('compact')}
                      />
                      Compact
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.midsize}
                        onChange={() => handleCarClassChange('midsize')}
                      />
                      Midsize
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.fullsize}
                        onChange={() => handleCarClassChange('fullsize')}
                      />
                      Full-size
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.luxury}
                        onChange={() => handleCarClassChange('luxury')}
                      />
                      Luxury
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.suv}
                        onChange={() => handleCarClassChange('suv')}
                      />
                      SUV
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.van}
                        onChange={() => handleCarClassChange('van')}
                      />
                      Van
                    </label>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={carClasses.truck}
                        onChange={() => handleCarClassChange('truck')}
                      />
                      Truck
                    </label>
                  </div>
                </div>

                <div className="car-options-group">
                  <label className="options-label">Transmission</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="automatic"
                        checked={transmission === 'automatic'}
                        onChange={(e) => setTransmission(e.target.value)}
                      />
                      Automatic
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="manual"
                        checked={transmission === 'manual'}
                        onChange={(e) => setTransmission(e.target.value)}
                      />
                      Manual
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="no-preference"
                        checked={transmission === 'no-preference'}
                        onChange={(e) => setTransmission(e.target.value)}
                      />
                      No Preference
                    </label>
                  </div>
                </div>

                <div className="car-options-group">
                  <label className="options-label">Fuel Type</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="gasoline"
                        checked={fuelType === 'gasoline'}
                        onChange={(e) => setFuelType(e.target.value)}
                      />
                      Gasoline
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="hybrid"
                        checked={fuelType === 'hybrid'}
                        onChange={(e) => setFuelType(e.target.value)}
                      />
                      Hybrid
                    </label>
                    <label className="radio-option">
                      <input
                        type="radio"
                        value="electric"
                        checked={fuelType === 'electric'}
                        onChange={(e) => setFuelType(e.target.value)}
                      />
                      Electric
                    </label>
                  </div>
                </div>
              </div>

              <button className="search-btn" onClick={handleSearch}>
                <Search size={20} />
                Search Cars
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default BookingForm