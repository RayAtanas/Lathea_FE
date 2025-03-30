import { useEffect } from 'react';
import './MarketStudy.css';
import Navbar from '../../components/Navbar/Navbar';

// SVG Icon component for Market Study
const IconMarketStudy = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="market-svg-icon">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
    <line x1="12" y1="22.08" x2="12" y2="12"></line>
  </svg>
);

// Chart Icon for data analysis
const IconChart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="market-svg-icon">
    <line x1="18" y1="20" x2="18" y2="10"></line>
    <line x1="12" y1="20" x2="12" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="14"></line>
    <line x1="3" y1="20" x2="21" y2="20"></line>
  </svg>
);

// Research Icon
const IconResearch = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="market-svg-icon">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    <line x1="11" y1="8" x2="11" y2="14"></line>
    <line x1="8" y1="11" x2="14" y2="11"></line>
  </svg>
);

const MarketStudy = () => {
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
    <div className="market-main-content">
        <Navbar/>
      <section id="market-section" className="market-section">
        <div className="market-section-content fade-in">
          <h2 className="market-section-title">Where Research Meets Reality</h2>
          
          <div className="market-study-container">
            <div className="market-study-visual">
              <div className="market-visual-item">
                <div className="market-icon-container">
                  <IconMarketStudy />
                </div>
                <p>Market Analysis</p>
              </div>
              <div className="market-visual-item">
                <div className="market-icon-container">
                  <IconChart />
                </div>
                <p>Data Insights</p>
              </div>
              <div className="market-visual-item">
                <div className="market-icon-container">
                  <IconResearch />
                </div>
                <p>Research Methods</p>
              </div>
            </div>
            
            <div className="market-study-content">
              <h3>Immersive Insights</h3>
              <p>
                Our market study isn't just figures; it's a journey. We dive into academic 
                research methodologies and data analysis making sure that we are on the right 
                track enabling us to adjust our practice according to market evolution.
              </p>
              <p>
                When markets whisper, we listen. Success isn't a chance it's orchestrated.
              </p>
              
              <div className="market-highlights">
                <div className="market-highlight-item">
                  <h4>Data-Driven Decisions</h4>
                  <p>We analyze market trends, consumer behaviors, and economic indicators to guide our real estate investments.</p>
                </div>
                <div className="market-highlight-item">
                  <h4>Adaptive Strategy</h4>
                  <p>Our research allows us to quickly adapt to changing market conditions and capitalize on emerging opportunities.</p>
                </div>
                <div className="market-highlight-item">
                  <h4>Local Market Expertise</h4>
                  <p>We combine global research methodologies with deep local market knowledge for comprehensive insights.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="market-approach">
            <h3>Our Research Approach</h3>
            <div className="market-approach-grid">
              <div className="market-approach-item">
                <span className="market-approach-number">01</span>
                <h4>Collect</h4>
                <p>Gathering comprehensive market data from multiple reliable sources</p>
              </div>
              <div className="market-approach-item">
                <span className="market-approach-number">02</span>
                <h4>Analyze</h4>
                <p>Applying rigorous analytical methods to identify patterns and opportunities</p>
              </div>
              <div className="market-approach-item">
                <span className="market-approach-number">03</span>
                <h4>Interpret</h4>
                <p>Transforming data into actionable insights for strategic decision-making</p>
              </div>
              <div className="market-approach-item">
                <span className="market-approach-number">04</span>
                <h4>Implement</h4>
                <p>Converting research findings into effective real estate strategies</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MarketStudy;