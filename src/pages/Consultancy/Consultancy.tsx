import { useEffect } from 'react';
import './Consultancy.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icons for Consultancy page
const IconMarketAnalysis = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="consult-svg-icon">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
    <path d="M2 20h20"></path>
  </svg>
);

const IconInvestment = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="consult-svg-icon">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const IconStrategy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="consult-svg-icon">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
  </svg>
);

const IconExpertise = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="consult-svg-icon">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const Consultancy = () => {
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
    <div className="consult-main-content">
      <Navbar/>
      <section id="consultancy-section" className="consult-section">
        <div className="consult-section-content fade-in">
          <h2 className="consult-section-title">Real Estate Consultancy</h2>
          
          <div className="consult-intro">
            <p>
              Make informed decisions with the guidance of our knowledgeable consultants. 
              Whether you're an investor or a buyer, our experts provide personalized advice 
              and market insights to help you achieve your real estate goals.
            </p>
          </div>
          
          <div className="consult-features">
            <div className="consult-feature-item">
              <div className="consult-icon-container">
                <IconMarketAnalysis />
              </div>
              <h3>Market Analysis</h3>
              <p>
                Our consultants conduct comprehensive market analyses to identify trends, 
                opportunities, and potential risks, giving you a clear view of the current 
                real estate landscape and future projections.
              </p>
            </div>
            
            <div className="consult-feature-item">
              <div className="consult-icon-container">
                <IconInvestment />
              </div>
              <h3>Investment Advisory</h3>
              <p>
                We provide strategic investment guidance tailored to your financial goals, 
                risk tolerance, and time horizon, helping you build a robust real estate 
                portfolio with optimal returns.
              </p>
            </div>
            
            <div className="consult-feature-item">
              <div className="consult-icon-container">
                <IconStrategy />
              </div>
              <h3>Property Strategy</h3>
              <p>
                Our experts develop customized property strategies, whether you're looking to buy, 
                sell, lease, or develop real estate assets, ensuring your decisions align with 
                your long-term objectives.
              </p>
            </div>
            
            <div className="consult-feature-item">
              <div className="consult-icon-container">
                <IconExpertise />
              </div>
              <h3>Expert Guidance</h3>
              <p>
                With decades of combined experience in the real estate industry, our consultants 
                provide invaluable insights and expert recommendations to navigate complex 
                transactions and market conditions.
              </p>
            </div>
          </div>
          
          <div className="consult-approach-wrapper">
            <div className="consult-approach">
              <h3>Our Consultancy Approach</h3>
              
              <div className="consult-approach-content">
                <div className="consult-approach-image-placeholder">
                  <div className="consult-approach-img-wrapper">
                    <div className="consult-approach-img-overlay"></div>
                  </div>
                </div>
                
                <div className="consult-approach-text">
                  <p>
                    Our consultancy approach begins with gaining a deep understanding of your unique real estate goals and challenges. 
                    We believe that effective consultancy requires both industry expertise and personalized attention.
                  </p>
                  
                  <div className="consult-approach-steps">
                    <div className="consult-approach-step">
                      <div className="consult-step-number">1</div>
                      <div className="consult-step-details">
                        <h4>Discovery & Assessment</h4>
                        <p>We thoroughly evaluate your needs, objectives, and constraints to create a foundation for strategic guidance.</p>
                      </div>
                    </div>
                    
                    <div className="consult-approach-step">
                      <div className="consult-step-number">2</div>
                      <div className="consult-step-details">
                        <h4>Research & Analysis</h4>
                        <p>Our team conducts extensive market research and data analysis to inform our recommendations.</p>
                      </div>
                    </div>
                    
                    <div className="consult-approach-step">
                      <div className="consult-step-number">3</div>
                      <div className="consult-step-details">
                        <h4>Strategy Development</h4>
                        <p>We create customized strategies and action plans tailored to your specific real estate goals.</p>
                      </div>
                    </div>
                    
                    <div className="consult-approach-step">
                      <div className="consult-step-number">4</div>
                      <div className="consult-step-details">
                        <h4>Implementation Support</h4>
                        <p>Our consultants provide ongoing guidance and support as you execute your real estate strategy.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="consult-services">
            <h3>Specialized Consultancy Services</h3>
            
            <div className="consult-services-grid">
              <div className="consult-service-card">
                <h4>Acquisition Strategy</h4>
                <ul className="consult-service-list">
                  <li>Property identification and evaluation</li>
                  <li>Due diligence process management</li>
                  <li>Negotiation strategy and support</li>
                  <li>Financing options assessment</li>
                </ul>
              </div>
              
              <div className="consult-service-card">
                <h4>Portfolio Optimization</h4>
                <ul className="consult-service-list">
                  <li>Asset performance analysis</li>
                  <li>Portfolio diversification planning</li>
                  <li>Risk assessment and management</li>
                  <li>Strategic disposition recommendations</li>
                </ul>
              </div>
              
              <div className="consult-service-card">
                <h4>Investment Analysis</h4>
                <ul className="consult-service-list">
                  <li>Cash flow projections and modeling</li>
                  <li>ROI and cap rate analysis</li>
                  <li>Comparative market studies</li>
                  <li>Investment opportunity evaluation</li>
                </ul>
              </div>
              
              <div className="consult-service-card">
                <h4>Development Consulting</h4>
                <ul className="consult-service-list">
                  <li>Feasibility studies for new developments</li>
                  <li>Land use and zoning analysis</li>
                  <li>Project viability assessment</li>
                  <li>Development planning and oversight</li>
                </ul>
              </div>
              
              <div className="consult-service-card">
                <h4>Market Entry Strategy</h4>
                <ul className="consult-service-list">
                  <li>New market opportunity assessment</li>
                  <li>Demographic and economic analysis</li>
                  <li>Competitive landscape evaluation</li>
                  <li>Strategic market entry planning</li>
                </ul>
              </div>
              
              <div className="consult-service-card">
                <h4>Property Repositioning</h4>
                <ul className="consult-service-list">
                  <li>Underperforming asset analysis</li>
                  <li>Repositioning strategy development</li>
                  <li>Value-add opportunity identification</li>
                  <li>Renovation and improvement planning</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="consult-testimonials">
            <h3>Client Success Stories</h3>
            
            <div className="consult-testimonials-container">
              <div className="consult-testimonial-card">
                <div className="consult-testimonial-content">
                  <p>
                    "Their market analysis and investment strategy helped us identify an undervalued 
                    property that has appreciated 35% in just two years. Their guidance was invaluable."
                  </p>
                </div>
                <div className="consult-testimonial-author">
                  <h4>Investment Group Client</h4>
                  <p>Commercial Property Acquisition</p>
                </div>
              </div>
              
              <div className="consult-testimonial-card">
                <div className="consult-testimonial-content">
                  <p>
                    "The consultancy team provided clear, actionable advice that helped us navigate a 
                    complex development project. Their expertise saved us time and significantly 
                    increased our returns."
                  </p>
                </div>
                <div className="consult-testimonial-author">
                  <h4>Property Developer</h4>
                  <p>Mixed-Use Development Project</p>
                </div>
              </div>
              
              <div className="consult-testimonial-card">
                <div className="consult-testimonial-content">
                  <p>
                    "As first-time investors, we were unsure where to begin. Their consultant walked 
                    us through every step of the process, helping us build a rental property portfolio 
                    that now generates consistent passive income."
                  </p>
                </div>
                <div className="consult-testimonial-author">
                  <h4>Individual Investors</h4>
                  <p>Residential Investment Strategy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultancy;