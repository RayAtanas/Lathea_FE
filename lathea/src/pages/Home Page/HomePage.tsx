import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Carousel, { CarouselItem } from '../../components/Carousel/Carousel';
import { ChevronRight } from 'lucide-react';
import './HomePage.css';

// Import your images
import lathea_home from '../../assets/Screenshot 2024-07-24 142520.png';
import house from '../../assets/house.png';

// Enhanced carousel items with descriptions and call-to-action buttons
const carouselItems: CarouselItem[] = [
  { 
    src: lathea_home, 
    title: 'REAL ESTATE DEVELOPMENT'
  },
  { 
    src: house, 
    title: 'PROPERTY MANAGEMENT'
  },
  { 
    src: lathea_home, 
    title: 'CONSULTANCY SERVICES'
  },
  { 
    src: house, 
    title: 'PROJECT MANAGEMENT'
  },
];

const HomePage: React.FC = () => {
  const [isVisible, setIsVisible] = useState({
    about: false,
    services: false,
    projects: false,
    contact: false
  });

  // Track scroll position for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      
      // Check visibility of sections for animations
      const sections = ['about', 'services', 'projects', 'contact'];
      sections.forEach(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.75) {
            setIsVisible(prev => ({ ...prev, [section]: true }));
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // Trigger initial check
    setTimeout(() => {
      handleScroll();
    }, 500);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 70, // Adjust for navbar height
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="homepage">
      {/* Pass scrolled state to Navbar component */}
      <Navbar />
      
      {/* Full-height carousel as hero section */}
      {carouselItems.length > 0 && <Carousel items={carouselItems} />}
      
      {/* Main content area with improved sections */}
      <div className="main-content">
        <section id="about" className={`section ${isVisible.about ? 'fade-in visible' : 'fade-in'}`}>
          <div className="section-content">
            <h2 className="section-title">About Us</h2>
            <p>
              Lathea Group is a leading real estate development and investment company 
              with a focus on creating exceptional properties and delivering outstanding 
              services to our clients. Our team includes investment and asset management 
              professionals with demonstrated success in international real estate 
              investment and development.
            </p>
            <p>
              With our strong foundation in the real estate market, we strive to 
              deliver innovative solutions that meet the evolving needs of our 
              clients and communities.
            </p>
            
          </div>
        </section>
        
        <section id="services" className={`section ${isVisible.services ? 'fade-in visible' : 'fade-in'}`}>
          <div className="section-content">
            <h2 className="section-title">Our Services</h2>
            <p>
              We offer a comprehensive range of real estate services including development, 
              contracting, project management, property management, and consultancy. 
              Our expertise allows us to handle projects of any size and complexity.
            </p>
            
            <div className="services-grid">
              <div className="service-card">
                <div className="service-icon">🏢</div>
                <h3>Real Estate Development</h3>
                <p>Creating innovative and sustainable real estate projects that transform communities and provide exceptional returns on investment.</p>
                <a href="#projects" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>
                  View Projects <ChevronRight size={14} />
                </a>
              </div>
              
              <div className="service-card">
                <div className="service-icon">🔑</div>
                <h3>Property Management</h3>
                <p>Professional management of residential and commercial properties to maximize value and ensure tenant satisfaction.</p>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Learn More <ChevronRight size={14} />
                </a>
              </div>
              
              <div className="service-card">
                <div className="service-icon">📊</div>
                <h3>Consultancy Services</h3>
                <p>Expert advice on real estate investments and market analysis to help you make informed decisions for optimal outcomes.</p>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Get a Consultation <ChevronRight size={14} />
                </a>
              </div>
              
              <div className="service-card">
                <div className="service-icon">📋</div>
                <h3>Project Management</h3>
                <p>End-to-end management of complex construction projects, ensuring quality, timely delivery, and budget adherence.</p>
                <a href="#contact" className="service-link" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                  Start a Project <ChevronRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
        
        <section id="projects" className={`section ${isVisible.projects ? 'fade-in visible' : 'fade-in'}`}>
          <div className="section-content">
            <h2 className="section-title">Our Projects</h2>
            <p>
              Explore our portfolio of successful projects that showcase our commitment 
              to quality and innovation in real estate development.
            </p>
            
            {/* Project gallery placeholder */}
            <div className="projects-gallery">
              <div className="project-card">
                <div className="project-image">
                  <img src={lathea_home} alt="Luxury Residential Complex" />
                  <div className="project-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3>Luxury Residential Complex</h3>
                  <p>Modern living spaces with premium amenities and sustainable design.</p>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <img src={house} alt="Commercial Office Building" />
                  <div className="project-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3>Commercial Office Building</h3>
                  <p>Contemporary workspace designed for productivity and collaboration.</p>
                </div>
              </div>
              
              <div className="project-card">
                <div className="project-image">
                  <img src={lathea_home} alt="Mixed-Use Development" />
                  <div className="project-overlay">
                    <span>View Details</span>
                  </div>
                </div>
                <div className="project-info">
                  <h3>Mixed-Use Development</h3>
                  <p>Integrated living, working, and recreational spaces in urban settings.</p>
                </div>
              </div>
            </div>
            
            <div className="cta-container">
              <button className="cta-button secondary" onClick={() => scrollToSection('contact')}>
                Discuss Your Project <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>
        
        <section id="contact" className={`section ${isVisible.contact ? 'fade-in visible' : 'fade-in'}`}>
          <div className="section-content">
            <h2 className="section-title">Contact Us</h2>
            <p>
              Get in touch with our team to discuss your real estate needs and how 
              Lathea Group can help you achieve your goals.
            </p>
            
            <div className="contact-container">
              <div className="contact-info">
                <div className="contact-item">
                  <div className="contact-icon">✉️</div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p><a href="mailto:info@latheagroup.com">info@latheagroup.com</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📞</div>
                  <div className="contact-details">
                    <h3>Phone</h3>
                    <p><a href="tel:+11234567890">+1 (123) 456-7890</a></p>
                  </div>
                </div>
                
                <div className="contact-item">
                  <div className="contact-icon">📍</div>
                  <div className="contact-details">
                    <h3>Address</h3>
                    <p>123 Business Avenue, City, Country</p>
                  </div>
                </div>
              </div>
              
              <div className="contact-form">
                <h3>Send Us a Message</h3>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Your name" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Your email" required />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="tel" id="phone" name="phone" placeholder="Your phone number" />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" name="message" rows={4} placeholder="How can we help you?" required></textarea>
                  </div>
                  
                  <button type="submit" className="submit-button">Send Message</button>
                </form>
              </div>
            </div>
          </div>
        </section>
        
        
      </div>
    </div>
  );
};

export default HomePage;