import { useEffect } from 'react';
import './ProjectManagement.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icons for Project Management page
const IconTimeline = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

const IconBudget = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const IconTeam = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const IconQuality = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pm-svg-icon">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

const ProjectManagement = () => {
  useEffect(() => {
    // Function to check if element is in viewport
    const isInViewport = (element) => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll and add visible class
    const handleScroll = () => {
      const fadeElements = document.querySelectorAll('.fade-in');
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
      <section id="project-management-section" className="pm-section">
        <div className="pm-section-content fade-in">
          <h2 className="pm-section-title">Real Estate Project Management</h2>
          
          <div className="pm-intro">
            <p>
              Experience seamless project execution with our professional project management services. 
              Our dedicated project managers oversee every aspect of your project, ensuring quality, 
              efficiency, and timely completion.
            </p>
          </div>
          
          <div className="pm-features">
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconTimeline />
              </div>
              <h3>Timeline Management</h3>
              <p>
                Our expert project managers develop comprehensive timelines with clear milestones, 
                ensuring every phase of your project stays on schedule from initial planning to completion.
              </p>
            </div>
            
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconBudget />
              </div>
              <h3>Budget Oversight</h3>
              <p>
                We carefully monitor all project expenses, manage vendor contracts, and implement 
                cost-control strategies to keep your project within budget without compromising quality.
              </p>
            </div>
            
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconTeam />
              </div>
              <h3>Team Coordination</h3>
              <p>
                Our team skillfully coordinates all stakeholders, from architects and contractors to 
                inspectors and suppliers, ensuring seamless communication and collaboration throughout the project.
              </p>
            </div>
            
            <div className="pm-feature-item">
              <div className="pm-icon-container">
                <IconQuality />
              </div>
              <h3>Quality Assurance</h3>
              <p>
                We implement rigorous quality control processes, conduct regular inspections, and ensure 
                all work meets or exceeds industry standards and regulatory requirements.
              </p>
            </div>
          </div>
          
          <div className="pm-process-wrapper">
            <div className="pm-process">
              <h3>Our Project Management Approach</h3>
              
              <div className="pm-process-flow">
                <div className="pm-process-step">
                  <div className="pm-step-number">1</div>
                  <div className="pm-step-content">
                    <h4>Project Initiation</h4>
                    <p>Defining scope, goals, and requirements</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">2</div>
                  <div className="pm-step-content">
                    <h4>Planning & Design</h4>
                    <p>Creating detailed project roadmap</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">3</div>
                  <div className="pm-step-content">
                    <h4>Execution</h4>
                    <p>Implementing the project plan</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">4</div>
                  <div className="pm-step-content">
                    <h4>Monitoring & Control</h4>
                    <p>Ensuring quality and timeline adherence</p>
                  </div>
                </div>
                
                <div className="pm-process-arrow"></div>
                
                <div className="pm-process-step">
                  <div className="pm-step-number">5</div>
                  <div className="pm-step-content">
                    <h4>Project Closure</h4>
                    <p>Final delivery and documentation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pm-benefits">
            <h3>Benefits of Professional Project Management</h3>
            
            <div className="pm-benefits-grid">
              <div className="pm-benefit-item">
                <h4>Reduced Risk</h4>
                <p>Professional oversight minimizes unexpected issues and costly delays</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Cost Efficiency</h4>
                <p>Strategic planning and vendor management optimize project budgets</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Time Savings</h4>
                <p>Streamlined processes and experienced coordination accelerate completion</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Quality Results</h4>
                <p>Rigorous standards and expert supervision ensure superior outcomes</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Stress Reduction</h4>
                <p>Delegate complex project details to experienced professionals</p>
              </div>
              
              <div className="pm-benefit-item">
                <h4>Single Point of Contact</h4>
                <p>Simplified communication through your dedicated project manager</p>
              </div>
            </div>
          </div>
          
          <div className="pm-services-section">
            <h3>Our Project Management Services</h3>
            
            <div className="pm-services-container">
              <div className="pm-service-column">
                <div className="pm-service-category">
                  <h4>Planning Services</h4>
                  <ul className="pm-service-list">
                    <li>Project scope definition</li>
                    <li>Feasibility studies</li>
                    <li>Timeline development</li>
                    <li>Budget planning</li>
                    <li>Resource allocation</li>
                    <li>Risk assessment</li>
                  </ul>
                </div>
              </div>
              
              <div className="pm-service-column">
                <div className="pm-service-category">
                  <h4>Execution Services</h4>
                  <ul className="pm-service-list">
                    <li>Contractor selection and management</li>
                    <li>Vendor coordination</li>
                    <li>Progress monitoring</li>
                    <li>Quality inspections</li>
                    <li>Change order management</li>
                    <li>Permit processing</li>
                  </ul>
                </div>
              </div>
              
              <div className="pm-service-column">
                <div className="pm-service-category">
                  <h4>Administrative Services</h4>
                  <ul className="pm-service-list">
                    <li>Regular progress reporting</li>
                    <li>Document management</li>
                    <li>Regulatory compliance</li>
                    <li>Invoice processing</li>
                    <li>Contract administration</li>
                    <li>Project documentation</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="pm-project-types">
            <h3>Types of Projects We Manage</h3>
            
            <div className="pm-project-types-grid">
              <div className="pm-project-type-item">
                <h4>Residential Development</h4>
                <p>Single-family homes, multi-family buildings, and residential communities</p>
              </div>
              
              <div className="pm-project-type-item">
                <h4>Commercial Construction</h4>
                <p>Office buildings, retail spaces, and mixed-use developments</p>
              </div>
              
              <div className="pm-project-type-item">
                <h4>Property Renovations</h4>
                <p>Comprehensive upgrades, remodels, and property transformations</p>
              </div>
              
              <div className="pm-project-type-item">
                <h4>Interior Build-outs</h4>
                <p>Custom tenant improvements and commercial interior design</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default ProjectManagement;