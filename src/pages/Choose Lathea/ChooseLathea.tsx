import { useEffect } from 'react';
import './ChooseLathea.css';
import Navbar from '../../components/Navbar/Navbar';

const ChooseLathea = () => {
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
    <div className="choose-main-content">
        <Navbar/>
      <section id="choose-lathea" className="choose-section">
        <div className="choose-section-content fade-in">
          <h2 className="choose-section-title">Why Choose Lathea Group</h2>
          
          <div className="choose-content">
            <div className="choose-cards">
              <div className="choose-card">
                <div className="choose-card-icon">
                  <i className="fas fa-user-check"></i>
                </div>
                <h3>Tailored Solutions</h3>
                <p>
                  We understand that every client has unique requirements. Whether you're an investor, 
                  a homeowner, or a businessperson, we tailor our services to align with your goals.
                </p>
              </div>
              
              <div className="choose-card">
                <div className="choose-card-icon">
                  <i className="fas fa-globe-europe"></i>
                </div>
                <h3>Global Reach</h3>
                <p>
                  While our primary focus is now on Cyprus, our global outlook allows us to bring 
                  international best practices.
                </p>
              </div>
              
              <div className="choose-card">
                <div className="choose-card-icon">
                  <i className="fas fa-map-marked-alt"></i>
                </div>
                <h3>Local Expertise</h3>
                <p>
                  Thanks to our partners and local employees, we have a deep understanding of the real 
                  estate system in Cyprus. We are well-versed in navigating the unique cultural nuances 
                  and mindsets of the Cypriot community.
                </p>
              </div>
              
              <div className="choose-card">
                <div className="choose-card-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <h3>Investment Opportunities</h3>
                <p>
                  Real estate isn't just about owning property; it's an investment. Lathea Group identifies 
                  lucrative opportunities. Join us on this exciting journey, where real estate meets innovation, 
                  sustainability, and community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChooseLathea;