import { useEffect } from 'react';
import './PropertyManagement.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icons for Property Management page
const IconHome = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
);

const IconMaintenance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
);

const IconFinance = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const IconTenant = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const PropertyManagement = () => {
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
    <div className="pm-main-content">
      <Navbar/>
      <section id="property-management-section" className="pm-section">
        <div className="pm-section-content fade-in">
          <h2 className="pm-section-title">Real Estate Property Management</h2>
          
          <div className="pm-intro">
            <p>
              Experience hassle-free property management with our professional real estate services. Our dedicated team handles 
              every detail, from tenant relations and maintenance to rent collection and property inspections, 
              ensuring your investment is managed with efficiency, quality, and care.
            </p>
          </div>
          
          <div className="pm-features">
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconTenant />
              </div>
              <h3>Tenant Management</h3>
              <p>
                Our tenant-focused approach includes thorough screening, responsive communication, 
                professional lease execution, and efficient rent collection to ensure your property stays occupied with reliable tenants.
              </p>
            </div>
            
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconMaintenance />
              </div>
              <h3>Property Maintenance</h3>
              <p>
                We provide proactive maintenance services, 24/7 emergency response, and coordinate with trusted vendors 
                to keep your property in excellent condition while controlling costs.
              </p>
            </div>
            
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconFinance />
              </div>
              <h3>Financial Management</h3>
              <p>
                Comprehensive financial services include rent collection, expense management, 
                detailed monthly statements, and year-end tax preparation to optimize your investment returns.
              </p>
            </div>
            
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconHome />
              </div>
              <h3>Property Marketing</h3>
              <p>
                We implement strategic marketing campaigns using high-quality photography, 
                targeted advertising, and digital platforms to minimize vacancies and attract quality tenants.
              </p>
            </div>
          </div>
          
          <div className="pm-process-wrapper">
            <div className="pm-process">
              <h3>Our Management Approach</h3>
              
              <div className="pm-process-flow">
                <div className="pm-process-step">
                  <div className="pm-step-number">1</div>
                  <div className="pm-step-content">
                    <h4>Property Evaluation</h4>
                    <p>Comprehensive assessment of your property</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">2</div>
                  <div className="pm-step-content">
                    <h4>Marketing & Leasing</h4>
                    <p>Finding and screening quality tenants</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">3</div>
                  <div className="pm-step-content">
                    <h4>Move-in & Onboarding</h4>
                    <p>Smooth tenant transition process</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">4</div>
                  <div className="pm-step-content">
                    <h4>Active Management</h4>
                    <p>Ongoing maintenance and oversight</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">5</div>
                  <div className="pm-step-content">
                    <h4>Reporting & Review</h4>
                    <p>Regular financial updates</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pm-benefits">
            <h3>Benefits of Professional Property Management</h3>
            
            <div className="pm-benefits-grid">
              <div className="pm-benefit-item">
                <h4>Higher Quality Tenants</h4>
                <p>Rigorous screening process ensures reliable, long-term tenants</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Shorter Vacancy Periods</h4>
                <p>Effective marketing strategies minimize property downtime</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Better Tenant Retention</h4>
                <p>Responsive management keeps good tenants satisfied longer</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Lower Maintenance Costs</h4>
                <p>Preventative maintenance and vendor relationships reduce expenses</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Improved Cash Flow</h4>
                <p>Consistent rent collection and financial oversight optimize returns</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Reduced Legal Issues</h4>
                <p>Expert knowledge of rental laws helps avoid costly disputes</p>
              </div>
            </div>
          </div>
          
          <div className="pm-services-section">
            <h3>Our Property Management Services</h3>
            
            <div className="pm-services-container">
              <div className="pm-service-column">
                <div className="pm-service-category">
                  <h4>Tenant Services</h4>
                  <ul className="pm-service-list">
                    <li>Tenant screening and selection</li>
                    <li>Lease preparation and execution</li>
                    <li>Move-in/move-out inspections</li>
                    <li>Rent collection and processing</li>
                    <li>24/7 tenant communication</li>
                    <li>Lease enforcement and compliance</li>
                  </ul>
                </div>
              </div>
              
              <div className="pm-service-column">
                <div className="pm-service-category">
                  <h4>Maintenance Services</h4>
                  <ul className="pm-service-list">
                    <li>Preventative maintenance programs</li>
                    <li>Emergency response coordination</li>
                    <li>Vendor management and oversight</li>
                    <li>Property inspections and reporting</li>
                    <li>Renovation project management</li>
                    <li>Cost-effective repair solutions</li>
                  </ul>
                </div>
              </div>
              
              <div className="pm-service-column">
                <div className="pm-service-category">
                  <h4>Financial Services</h4>
                  <ul className="pm-service-list">
                    <li>Monthly financial reporting</li>
                    <li>Expense processing and payment</li>
                    <li>Year-end financial statements</li>
                    <li>Tax documentation preparation</li>
                    <li>Budget planning and forecasting</li>
                    <li>Investment analysis and consultation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default PropertyManagement;