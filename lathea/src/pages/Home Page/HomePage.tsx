import React, { useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Carousel, { CarouselItem } from '../../components/Carousel/Carousel';
import './HomePage.css';

// Import your images

import lathea_home from '../../assets/Screenshot 2024-07-24 142520.png'
import house from '../../assets/house.png';
// Using placeholder images if house doesn't load
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
  // Add useEffect to debug when component mounts
  useEffect(() => {
    console.log('HomePage mounted, carousel items:', carouselItems);
  }, []);

  return (
    <div className="homepage">
      {/* Navbar will be dark at first */}
      <Navbar />
      
      {/* Full-height carousel as hero section */}
      {carouselItems.length > 0 && <Carousel items={carouselItems} />}
      
      {/* Main content area with white background */}
      <div className="main-content">
        <section id="about" className="section">
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
        
        <section id="services" className="section">
          <div className="section-content">
            <h2 className="section-title">Our Services</h2>
            <p>
              We offer a comprehensive range of real estate services including development, 
              contracting, project management, property management, and consultancy. 
              Our expertise allows us to handle projects of any size and complexity.
            </p>
            <div className="services-grid">
              <div className="service-card">
                <h3>Real Estate Development</h3>
                <p>Creating innovative and sustainable real estate projects</p>
              </div>
              <div className="service-card">
                <h3>Property Management</h3>
                <p>Professional management of residential and commercial properties</p>
              </div>
              <div className="service-card">
                <h3>Consultancy Services</h3>
                <p>Expert advice on real estate investments and market analysis</p>
              </div>
              <div className="service-card">
                <h3>Project Management</h3>
                <p>End-to-end management of complex construction projects</p>
              </div>
            </div>
          </div>
        </section>
        
        <section id="projects" className="section">
          <div className="section-content">
            <h2 className="section-title">Our Projects</h2>
            <p>
              Explore our portfolio of successful projects that showcase our commitment 
              to quality and innovation in real estate development.
            </p>
          </div>
        </section>
        
        <section id="contact" className="section">
          <div className="section-content">
            <h2 className="section-title">Contact Us</h2>
            <p>
              Get in touch with our team to discuss your real estate needs and how 
              Lathea Group can help you achieve your goals.
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> info@latheagroup.com</p>
              <p><strong>Phone:</strong> +1 (123) 456-7890</p>
              <p><strong>Address:</strong> 123 Business Avenue, City, Country</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;