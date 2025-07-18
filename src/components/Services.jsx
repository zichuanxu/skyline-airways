import { Plane, Shield, Clock, Award } from 'lucide-react'
import './Services.css'

const Services = () => {
  const services = [
    {
      icon: <Plane size={48} />,
      title: 'Modern Fleet',
      description: 'Experience comfort with our state-of-the-art aircraft featuring the latest technology and amenities.'
    },
    {
      icon: <Shield size={48} />,
      title: 'Safety First',
      description: 'Your safety is our priority. We maintain the highest safety standards in the aviation industry.'
    },
    {
      icon: <Clock size={48} />,
      title: 'On-Time Performance',
      description: 'We pride ourselves on punctuality with industry-leading on-time departure rates.'
    },
    {
      icon: <Award size={48} />,
      title: 'Premium Service',
      description: 'Enjoy exceptional service from our dedicated crew members committed to your comfort.'
    }
  ]

  return (
    <section className="services">
      <div className="services-container">
        <h2 className="services-title">Why Choose Skyline Airways</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services