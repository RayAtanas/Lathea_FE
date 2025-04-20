import { useEffect } from 'react';
import './Contracting.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icons for Contracting page
const IconContract = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contract-svg-icon">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
    <polyline points="14 2 14 8 20 8"></polyline>
    <line x1="16" y1="13" x2="8" y2="13"></line>
    <line x1="16" y1="17" x2="8" y2="17"></line>
    <polyline points="10 9 9 9 8 9"></polyline>
  </svg>
);

const IconLegal = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contract-svg-icon">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="12" y1="8" x2="12" y2="12"></line>
    <line x1="12" y1="16" x2="12.01" y2="16"></line>
  </svg>
);

const IconHandshake = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contract-svg-icon">
    <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
  </svg>
);

const IconSecure = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="contract-svg-icon">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

const Contracting = () => {
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
    <div className="contract-main-content">
        <Navbar/>
      <section id="contracting-section" className="contract-section">
        <div className="contract-section-content fade-in">
          <h2 className="contract-section-title">Real Estate Contracting</h2>
          
          <div className="contract-intro">
            <p>
              Ensure the legality and security of your property transactions with our expert contracting services. 
              From negotiating terms to finalizing agreements, our team ensures a smooth and successful transaction process.
            </p>
          </div>
          
          <div className="contract-features">
            <div className="contract-feature-item">
              <div className="contract-icon-container">
                <IconLegal />
              </div>
              <h3>Legal Expertise</h3>
              <p>
                Our team of legal experts specializes in real estate law, ensuring that all contracts comply with 
                current regulations and protect your interests at every stage of the transaction.
              </p>
            </div>
            
            <div className="contract-feature-item">
              <div className="contract-icon-container">
                <IconContract />
              </div>
              <h3>Contract Development</h3>
              <p>
                We create comprehensive, clear contracts tailored to your specific needs, covering all essential 
                aspects of the transaction and anticipating potential issues before they arise.
              </p>
            </div>
            
            <div className="contract-feature-item">
              <div className="contract-icon-container">
                <IconHandshake />
              </div>
              <h3>Negotiation Support</h3>
              <p>
                Our skilled negotiators work on your behalf to secure favorable terms, ensuring that your priorities 
                are addressed and your position is strengthened throughout the contracting process.
              </p>
            </div>
            
            <div className="contract-feature-item">
              <div className="contract-icon-container">
                <IconSecure />
              </div>
              <h3>Transaction Security</h3>
              <p>
                We implement robust security measures to protect sensitive information and ensure that all financial 
                aspects of your transaction are handled with the utmost care and confidentiality.
              </p>
            </div>
          </div>
          
          <div className="contract-process-wrapper">
            <div className="contract-process">
              <h3>Our Contracting Process</h3>
              
              <div className="contract-process-flow">
                <div className="contract-process-step">
                  <div className="contract-step-number">1</div>
                  <div className="contract-step-content">
                    <h4>Initial Consultation</h4>
                    <p>Understanding your needs and objectives</p>
                  </div>
                </div>
                
                <div className="contract-process-arrow"></div>
                
                <div className="contract-process-step">
                  <div className="contract-step-number">2</div>
                  <div className="contract-step-content">
                    <h4>Contract Drafting</h4>
                    <p>Creating tailored legal documents</p>
                  </div>
                </div>
                
                <div className="contract-process-arrow"></div>
                
                <div className="contract-process-step">
                  <div className="contract-step-number">3</div>
                  <div className="contract-step-content">
                    <h4>Negotiation</h4>
                    <p>Securing favorable terms</p>
                  </div>
                </div>
                
                <div className="contract-process-arrow"></div>
                
                <div className="contract-process-step">
                  <div className="contract-step-number">4</div>
                  <div className="contract-step-content">
                    <h4>Review & Finalization</h4>
                    <p>Ensuring all details are correct</p>
                  </div>
                </div>
                
                <div className="contract-process-arrow"></div>
                
                <div className="contract-process-step">
                  <div className="contract-step-number">5</div>
                  <div className="contract-step-content">
                    <h4>Execution & Follow-up</h4>
                    <p>Completing the transaction</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contract-benefits">
            <h3>Benefits of Our Contracting Services</h3>
            
            <div className="contract-benefits-grid">
              <div className="contract-benefit-item">
                <h4>Reduced Risk</h4>
                <p>Comprehensive contracts minimize legal exposure and potential disputes</p>
              </div>
              
              <div className="contract-benefit-item">
                <h4>Time Efficiency</h4>
                <p>Streamlined processes save you valuable time during transactions</p>
              </div>
              
              <div className="contract-benefit-item">
                <h4>Clear Communication</h4>
                <p>Plain language explanations ensure you understand every term</p>
              </div>
              
              <div className="contract-benefit-item">
                <h4>Expert Guidance</h4>
                <p>Professional advice through complex contractual matters</p>
              </div>
              
              <div className="contract-benefit-item">
                <h4>Tailored Solutions</h4>
                <p>Customized contracts that address your specific situation</p>
              </div>
              
              <div className="contract-benefit-item">
                <h4>Peace of Mind</h4>
                <p>Confidence that your transaction is legally sound and secure</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contracting;