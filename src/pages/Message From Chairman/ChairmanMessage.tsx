import { useEffect } from 'react';
import './ChairmanMessage.css'; // Using a dedicated CSS file
import Navbar from '../../components/Navbar/Navbar';
import chairmanPic from '../../assets/chairman.png';
const ChairmanMessage = () => {
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
    <div className="chairman-main-content">
        <Navbar/>
      <section id="chairman-message" className="chairman-section">
        <div className="chairman-section-content fade-in">
          <h2 className="chairman-section-title">Message From The Chairman</h2>
          
          <div className="chairman-container">
            <div className="chairman-text">
              <p>
                <strong>LATHEA</strong>'s journey is more than just a business path; it's built on three foundational pillars: <strong>Values, Ethics, and Trust</strong>. Inspired by my daughter <strong>THEA</strong> a surname derived from the Greek name <strong>Theodora</strong>, which means <strong>'Gift of God'</strong> I named the company <strong>LATHEA</strong> to reflect these important principles.
              </p>
              <p>
                As the founder, chairman, and CEO, my journey mirrors that of many self-made entrepreneurs, filled with successes, lessons, and determination. I have traveled across various markets and industries, gaining valuable business skills along the way.
              </p>
              <p>
                My adventures have taken me from the Middle and Far East to Eastern and Western Europe, as well as East and South Africa, Latin America, and Australia. This global experience has fueled my passion for international real estate investment, allowing me to engage with diverse cultures and societies.
              </p>
              <p>
                Today, <strong>LATHEA</strong> proudly operates from <strong>Cyprus,</strong> offering investment opportunities in the real estate market. We are committed to transparency; <strong>"WE WRITE WHAT WE SAY, WE DO WHAT WE WRITE".</strong>
              </p>
              <p>
                As both professionals and academics, our decisions are grounded in thorough market research, supported by statistics and data. We also rely on highly skilled advisors and partners, including top lawyers, auditors, and architects.
              </p>
              <p>
                To our future partners and investors, <strong>LATHEA</strong> offers not just opportunities, but also promises and a strong reputation built on trust. We approach challenges with care, employing effective risk management strategies.
              </p>
              <p>
                At <strong>LATHEA</strong> we build business relationships based on trust and focus on achieving real results. Whether you are a first-time buyer or an experienced investor, our doors are open. Welcome to the <strong>LATHEA</strong> world, grounded in our core principles: <strong>Values, Ethics, and Trust.</strong>
              </p>
            </div>
            <div className="chairman-image">
              <img src={chairmanPic} alt="Chairman of Lathea Group" />
              <div className="chairman-name">
                <h3>RICHARD EL KHOURY (DBA)</h3>
                <p>Chairman</p>
                <p><strong>"WE WRITE WHAT WE SAY, WE DO WHAT WE WRITE".</strong></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ChairmanMessage;