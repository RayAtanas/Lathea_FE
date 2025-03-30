import { useEffect } from 'react';
import './Development.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icons for Development page
const IconBuilding = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dev-svg-icon">
    <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
    <line x1="12" y1="6" x2="12" y2="6.01"></line>
    <line x1="12" y1="10" x2="12" y2="10.01"></line>
    <line x1="12" y1="14" x2="12" y2="14.01"></line>
    <line x1="12" y1="18" x2="12" y2="18.01"></line>
  </svg>
);

const IconPlanning = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dev-svg-icon">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="3" y1="9" x2="21" y2="9"></line>
    <line x1="9" y1="21" x2="9" y2="9"></line>
  </svg>
);

const IconConstruction = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dev-svg-icon">
    <path d="M16 18l4-4-4-4"></path>
    <path d="M20 14H4"></path>
    <circle cx="4" cy="14" r="4"></circle>
  </svg>
);

const IconSustainability = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="dev-svg-icon">
    <path d="M12 2v8"></path>
    <path d="M12 22v-2"></path>
    <path d="M4.93 4.93L9 9"></path>
    <path d="M14.83 14.83L19.07 19.07"></path>
    <path d="M2 12h2"></path>
    <path d="M19.07 4.93L14.83 9.17"></path>
    <path d="M4.93 19.07L9 15"></path>
    <path d="M22 12h-2"></path>
    <circle cx="12" cy="12" r="3"></circle>
  </svg>
);

const Development = () => {
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
    <div className="dev-main-content">
        <Navbar/>
      <section id="development-section" className="dev-section">
        <div className="dev-section-content fade-in">
          <h2 className="dev-section-title">Real Estate Development</h2>
          
          <div className="dev-intro">
            <p>
              At Lathea Group, we transform concepts into remarkable spaces. Our development approach 
              combines architectural excellence, sustainable practices, and strategic planning to create 
              properties that deliver lasting value to investors and communities alike.
            </p>
          </div>
          
          <div className="dev-pillars">
            <div className="dev-pillar-item">
              <div className="dev-icon-container">
                <IconPlanning />
              </div>
              <h3>Strategic Planning</h3>
              <p>
                Every development begins with careful planning. We analyze market trends, location potential, 
                and regulatory environments to create a solid foundation for project success.
              </p>
            </div>
            
            <div className="dev-pillar-item">
              <div className="dev-icon-container">
                <IconBuilding />
              </div>
              <h3>Quality Construction</h3>
              <p>
                We partner with leading architects and contractors to ensure superior build quality. 
                Our rigorous construction management delivers properties built to exacting standards.
              </p>
            </div>
            
            <div className="dev-pillar-item">
              <div className="dev-icon-container">
                <IconSustainability />
              </div>
              <h3>Sustainability Focus</h3>
              <p>
                Environmental responsibility is integral to our development approach. We implement energy-efficient 
                systems, sustainable materials, and eco-friendly practices in every project.
              </p>
            </div>
            
            <div className="dev-pillar-item">
              <div className="dev-icon-container">
                <IconConstruction />
              </div>
              <h3>Innovative Design</h3>
              <p>
                Our properties feature contemporary design that balances aesthetics with functionality. 
                We create spaces that meet current needs while anticipating future trends.
              </p>
            </div>
          </div>
          
          <div className="dev-process-container">
            <h3>Our Development Process</h3>
            
            <div className="dev-process">
              <div className="dev-process-item">
                <div className="dev-process-number">01</div>
                <div className="dev-process-content">
                  <h4>Site Selection & Acquisition</h4>
                  <p>Strategic identification and acquisition of prime development locations</p>
                </div>
              </div>
              
              <div className="dev-process-connector"></div>
              
              <div className="dev-process-item">
                <div className="dev-process-number">02</div>
                <div className="dev-process-content">
                  <h4>Design & Planning</h4>
                  <p>Architectural concepts, regulatory approvals, and detailed project planning</p>
                </div>
              </div>
              
              <div className="dev-process-connector"></div>
              
              <div className="dev-process-item">
                <div className="dev-process-number">03</div>
                <div className="dev-process-content">
                  <h4>Construction</h4>
                  <p>Expert project management and quality-focused construction execution</p>
                </div>
              </div>
              
              <div className="dev-process-connector"></div>
              
              <div className="dev-process-item">
                <div className="dev-process-number">04</div>
                <div className="dev-process-content">
                  <h4>Marketing & Sales</h4>
                  <p>Strategic marketing campaigns and professional sales management</p>
                </div>
              </div>
              
              <div className="dev-process-connector"></div>
              
              <div className="dev-process-item">
                <div className="dev-process-number">05</div>
                <div className="dev-process-content">
                  <h4>Property Management</h4>
                  <p>Ongoing maintenance and management to preserve property value</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="dev-highlight">
            <div className="dev-highlight-content">
              <h3>Commitment to Excellence</h3>
              <p>
                Our developments are distinguished by attention to detail, quality craftsmanship, and 
                innovative solutions. We don't just build properties—we create environments where people 
                thrive, businesses grow, and communities flourish.
              </p>
              <p>
                Every Lathea Group development reflects our core values of excellence, sustainability, 
                and long-term vision. We take pride in delivering projects that stand out in the market 
                and stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Development; 