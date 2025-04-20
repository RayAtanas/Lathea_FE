import { useEffect } from 'react';
import './Mission.css';
import Navbar from '../../components/Navbar/Navbar';

const Mission = () => {
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
    <div className="mission-main-content">
        <Navbar/>
      <section id="mission-section" className="mission-section">
        <div className="mission-section-content fade-in">
          <h2 className="mission-section-title">Our Mission & Vision</h2>
          
          <div className="mission-container">

          <div className="mission-card mission-card-primary">
              <div className="mission-card-header">
                <div className="mission-card-icon">
                  <i className="fas fa-bullseye"></i>
                </div>
                <h3>Mission</h3>
              </div>
              <div className="mission-card-content">
                <p>
                  Our mission is twofold:
                </p>
                <ul className="mission-list">
                  <li>
                    To deliver sustainable green buildings under the esteemed Lathea brand 
                    meticulously crafted to enhance the quality of life along with affordable budget.
                  </li>
                  <li>
                    To ensure that clients are extremely satisfied, they receive personalized 
                    services tailored to their unique needs. We're here to guide you every step of the way.
                  </li>
                </ul>
              </div>
            </div>

            <div className="mission-card vision-card">
              <div className="mission-card-header">
                <div className="mission-card-icon">
                  <i className="fas fa-eye"></i>
                </div>
                <h3>Vision</h3>
              </div>
              <div className="mission-card-content">
                <p>
                  We envision a world where real estate investments transform lives, communities, and futures. 
                  Our vision extends beyond usual transactions; it encompasses the transformative power of 
                  well-designed spaces together with comfortable living.
                </p>
              </div>
            </div>
            
          </div>
          
          <div className="mission-values">
            <div className="mission-value-container fade-in">
              <div className="mission-value">
                <div className="mission-value-icon">
                  <i className="fas fa-leaf"></i>
                </div>
                <h4>Sustainability</h4>
                <p>Creating environmentally responsible properties</p>
              </div>
              
              <div className="mission-value">
                <div className="mission-value-icon">
                  <i className="fas fa-handshake"></i>
                </div>
                <h4>Trust</h4>
                <p>Building relationships on transparency and reliability</p>
              </div>
              
              <div className="mission-value">
                <div className="mission-value-icon">
                  <i className="fas fa-star"></i>
                </div>
                <h4>Excellence</h4>
                <p>Delivering premium quality in every project</p>
              </div>
              
              <div className="mission-value">
                <div className="mission-value-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h4>Community</h4>
                <p>Creating properties that enhance lives and neighborhoods</p>
              </div>
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
};

export default Mission;