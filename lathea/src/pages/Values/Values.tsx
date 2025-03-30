import { useEffect } from 'react';
import './Values.css';
import Navbar from '../../components/Navbar/Navbar';

// Import SVG icons directly or from a local folder
// These are placeholder SVG paths - replace with your actual icons
const IconInnovation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="values-svg-icon">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const IconIntegrity = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="values-svg-icon">
    <path d="M18 8h1a4 4 0 010 8h-1"></path>
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"></path>
    <line x1="6" y1="1" x2="6" y2="4"></line>
    <line x1="10" y1="1" x2="10" y2="4"></line>
    <line x1="14" y1="1" x2="14" y2="4"></line>
  </svg>
);

const IconCommunity = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="values-svg-icon">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
    <path d="M16 3.13a4 4 0 010 7.75"></path>
  </svg>
);

const IconExcellence = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="values-svg-icon">
    <circle cx="12" cy="8" r="7"></circle>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
  </svg>
);

const Values = () => {
  useEffect(() => {
    // Function to check if element is in viewport
    const isInViewport = (element: HTMLElement) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll and add visible class
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll<HTMLElement>('.fade-in');
      fadeElements.forEach((element) => {
        if (isInViewport(element)) {
          element.classList.add('visible');
        }
      });
    };

    // Initial check on load
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    
    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="values-main-content">
        <Navbar/>
      <section id="values-section" className="values-section">
        <div className="values-section-content fade-in">
          <h2 className="values-section-title">Our Core Values</h2>
          
          <div className="values-intro">
            <p>
              At Lathea Group, our core values guide everything we do. They shape our culture, 
              inform our decisions, and define our commitment to our clients and communities.
            </p>
          </div>
          
          <div className="values-container">
            <div className="values-card">
              <div className="values-card-icon">
                <IconInnovation />
              </div>
              <h3>Innovation</h3>
              <p>
                We embrace cutting-edge technologies, architectural trends, and sustainable practices. 
                Our designs blend functionality with aesthetics, creating spaces that stand the test of time.
              </p>
            </div>
            
            <div className="values-card">
              <div className="values-card-icon">
                <IconIntegrity />
              </div>
              <h3>Integrity</h3>
              <p>
                Honesty, transparency, and ethical conduct are at the heart of our business. 
                We build trust by delivering on our promises and maintaining open communication with our clients.
              </p>
            </div>
            
            <div className="values-card">
              <div className="values-card-icon">
                <IconCommunity />
              </div>
              <h3>Community</h3>
              <p>
                Lathea Group isn't just about buildings; it's about fostering vibrant communities. 
                We actively engage with property management, supporting initiatives that enhance the well-being of residents.
              </p>
            </div>
            
            <div className="values-card">
              <div className="values-card-icon">
                <IconExcellence />
              </div>
              <h3>Excellence</h3>
              <p>
                From concept to completion, we strive for excellence. 
                We make sure that each development reflects our commitment to quality.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Values;