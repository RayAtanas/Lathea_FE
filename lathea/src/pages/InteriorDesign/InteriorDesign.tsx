import { useEffect } from 'react';
import './InteriorDesign.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icons for Interior Design page
const IconConsultation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interior-svg-icon">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const IconDesign = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interior-svg-icon">
    <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
    <path d="M2 2l7.586 7.586"></path>
    <circle cx="11" cy="11" r="2"></circle>
  </svg>
);

const IconMaterials = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interior-svg-icon">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

const IconImplementation = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="interior-svg-icon">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const InteriorDesign = () => {
  useEffect(() => {
    // Function to check if element is in viewport
    const isInViewport = (element:HTMLElement) => {
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
    <div className="interior-main-content">
      <Navbar/>
      <section id="interior-design-section" className="interior-section">
        <div className="interior-section-content fade-in">
          <h2 className="interior-section-title">Interior Design</h2>
          
          <div className="interior-intro">
            <p>
              Transform your space with our bespoke interior design services. Our talented designers 
              collaborate with you to create functional and aesthetically pleasing interiors that enhance 
              your living or working environment.
            </p>
          </div>
          
          <div className="interior-features">
            <div className="interior-feature-item">
              <div className="interior-icon-container">
                <IconConsultation />
              </div>
              <h3>Personalized Consultation</h3>
              <p>
                We begin with an in-depth consultation to understand your vision, lifestyle needs, 
                and preferences, ensuring that our designs reflect your unique personality and requirements.
              </p>
            </div>
            
            <div className="interior-feature-item">
              <div className="interior-icon-container">
                <IconDesign />
              </div>
              <h3>Creative Design Solutions</h3>
              <p>
                Our designers combine artistic vision with practical solutions to create 
                harmonious spaces that perfectly balance aesthetics, functionality, and spatial efficiency.
              </p>
            </div>
            
            <div className="interior-feature-item">
              <div className="interior-icon-container">
                <IconMaterials />
              </div>
              <h3>Material Selection</h3>
              <p>
                We source high-quality materials, furnishings, and decorative elements that align with your 
                style preferences and budget, ensuring durability and visual appeal.
              </p>
            </div>
            
            <div className="interior-feature-item">
              <div className="interior-icon-container">
                <IconImplementation />
              </div>
              <h3>Project Management</h3>
              <p>
                From concept to completion, we oversee all aspects of the design implementation, 
                coordinating with contractors and vendors to ensure a seamless transformation of your space.
              </p>
            </div>
          </div>
          
          <div className="interior-showcase">
            <h3>Our Design Expertise</h3>
            
            <div className="interior-showcase-grid">
              <div className="interior-showcase-item">
                <div className="interior-showcase-img-placeholder residential">
                  <div className="interior-showcase-overlay">
                    <h4>Residential Spaces</h4>
                  </div>
                </div>
                <div className="interior-showcase-content">
                  <p>
                    Transform your home into a personalized sanctuary that reflects your lifestyle and preferences. 
                    Our residential design services cover living rooms, bedrooms, kitchens, bathrooms, and more.
                  </p>
                </div>
              </div>
              
              <div className="interior-showcase-item">
                <div className="interior-showcase-img-placeholder commercial">
                  <div className="interior-showcase-overlay">
                    <h4>Commercial Spaces</h4>
                  </div>
                </div>
                <div className="interior-showcase-content">
                  <p>
                    Create impactful work environments that enhance productivity, reflect your brand identity, 
                    and impress clients. We design offices, retail spaces, hospitality venues, and more.
                  </p>
                </div>
              </div>
              
              <div className="interior-showcase-item">
                <div className="interior-showcase-img-placeholder renovation">
                  <div className="interior-showcase-overlay">
                    <h4>Renovation Projects</h4>
                  </div>
                </div>
                <div className="interior-showcase-content">
                  <p>
                    Breathe new life into existing spaces through thoughtful renovation and redesign. 
                    We work with your existing structure to create beautiful and functional transformations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="interior-process-wrapper">
            <div className="interior-process">
              <h3>Our Design Process</h3>
              
              <div className="interior-process-flow">
                <div className="interior-process-step">
                  <div className="interior-step-number">1</div>
                  <div className="interior-step-content">
                    <h4>Initial Consultation</h4>
                    <p>Understanding your vision and requirements</p>
                  </div>
                </div>
                
                <div className="interior-process-arrow"></div>
                
                <div className="interior-process-step">
                  <div className="interior-step-number">2</div>
                  <div className="interior-step-content">
                    <h4>Concept Development</h4>
                    <p>Creating preliminary design concepts</p>
                  </div>
                </div>
                
                <div className="interior-process-arrow"></div>
                
                <div className="interior-process-step">
                  <div className="interior-step-number">3</div>
                  <div className="interior-step-content">
                    <h4>Design Refinement</h4>
                    <p>Finalizing details and selections</p>
                  </div>
                </div>
                
                <div className="interior-process-arrow"></div>
                
                <div className="interior-process-step">
                  <div className="interior-step-number">4</div>
                  <div className="interior-step-content">
                    <h4>Implementation</h4>
                    <p>Executing the approved design plan</p>
                  </div>
                </div>
                
                <div className="interior-process-arrow"></div>
                
                <div className="interior-process-step">
                  <div className="interior-step-number">5</div>
                  <div className="interior-step-content">
                    <h4>Final Reveal</h4>
                    <p>Unveiling your transformed space</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="interior-services">
            <h3>Our Interior Design Services</h3>
            
            <div className="interior-services-container">
              <div className="interior-service-column">
                <div className="interior-service-category">
                  <h4>Spatial Planning</h4>
                  <ul className="interior-service-list">
                    <li>Space optimization and layout design</li>
                    <li>Traffic flow analysis and improvement</li>
                    <li>Functional zoning and room planning</li>
                    <li>Architectural detailing</li>
                    <li>Custom cabinetry and built-ins</li>
                  </ul>
                </div>
              </div>
              
              <div className="interior-service-column">
                <div className="interior-service-category">
                  <h4>Aesthetic Elements</h4>
                  <ul className="interior-service-list">
                    <li>Color scheme development</li>
                    <li>Material and finish selection</li>
                    <li>Furniture and fixture sourcing</li>
                    <li>Lighting design and planning</li>
                    <li>Art and accessory curation</li>
                  </ul>
                </div>
              </div>
              
              <div className="interior-service-column">
                <div className="interior-service-category">
                  <h4>Project Execution</h4>
                  <ul className="interior-service-list">
                    <li>Detailed design documentation</li>
                    <li>Contractor coordination</li>
                    <li>Procurement management</li>
                    <li>Installation oversight</li>
                    <li>Final styling and arrangement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="interior-portfolio">
            <h3>Design Portfolio Highlights</h3>
            
            <div className="interior-portfolio-grid">
              <div className="interior-portfolio-item">
                <div className="interior-portfolio-img-placeholder project1">
                  <div className="interior-portfolio-overlay">
                    <span>Modern Luxury Apartment</span>
                  </div>
                </div>
              </div>
              
              <div className="interior-portfolio-item">
                <div className="interior-portfolio-img-placeholder project2">
                  <div className="interior-portfolio-overlay">
                    <span>Executive Office Suite</span>
                  </div>
                </div>
              </div>
              
              <div className="interior-portfolio-item">
                <div className="interior-portfolio-img-placeholder project3">
                  <div className="interior-portfolio-overlay">
                    <span>Contemporary Home Renovation</span>
                  </div>
                </div>
              </div>
              
              <div className="interior-portfolio-item">
                <div className="interior-portfolio-img-placeholder project4">
                  <div className="interior-portfolio-overlay">
                    <span>Boutique Retail Space</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default InteriorDesign;