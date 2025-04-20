import React, { useEffect } from 'react';
import './Partner.css';
import Navbar from '../../components/Navbar/Navbar';
import PartnerCard from '../../components/Partner Card/PartnerCard';

// Import partner logos
import goelantLogo from '../../assets/Goeland-Horizontal-Logo.png';
import nelazaLogo from '../../assets/NELAZA-LOGO.png';
import paraschouLogo from '../../assets/Paraschou_logo.png';
import eggerLogo from '../../assets/gen_egger_logo_en.svg';

// Partner data
const partners = [
  {
    id: 1,
    name: 'Goelant',
    imageUrl: goelantLogo,
    websiteUrl: 'https://goelandoverseas.com/',
    description: 'Innovative architectural solutions for residential and commercial projects.'
  },
  {
    id: 2,
    name: 'Nelaza',
    imageUrl: nelazaLogo,
    websiteUrl: 'https://nelazaltd.com/',
    description: 'Premium construction materials and sustainable building solutions.'
  },
  {
    id: 3,
    name: 'Paraschou',
    imageUrl: paraschouLogo,
    websiteUrl: 'https://paraschou.com.cy/',
    description: 'Expert legal consulting for real estate transactions and development.'
  },
  {
    id: 4,
    name: 'EGGER',
    imageUrl: eggerLogo,
    websiteUrl: 'https://www.egger.com/en/?country=CY',
    description: 'High-quality wood-based materials for interior design and construction.'
  },
  {
    id: 5,
    name: 'PACM',
    websiteUrl: 'https://www.pacm.com',
    description: 'Project management and construction oversight for complex developments.'
  },
  {
    id: 6,
    name: 'Olpine',
    websiteUrl: 'https://www.olpine.com',
    description: 'Advanced building technology and smart home integration systems.'
  },
  {
    id: 7,
    name: 'HEB',
    websiteUrl: 'https://www.heb.com',
    description: 'Sustainable and eco-friendly building materials and consulting.'
  }
];

const Partners: React.FC = () => {
  useEffect(() => {
    // Function to check if element is in viewport
    const isInViewport = (element: HTMLElement): boolean => {
      const rect = element.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };

    // Function to handle scroll and add visible class
    const handleScroll = (): void => {
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
    <div className="partners-main-content">
      <Navbar/>
      <section id="partners-section" className="partners-section">
        <div className="partners-section-content fade-in">
          <h2 className="partners-section-title">Our Partners</h2>
          
          <div className="partners-intro">
            <p>
              At Lathea Group, we recognize the transformative power of collaboration. Our success 
              is driven by the expertise and synergy of our esteemed partners, including architects, 
              contractors, suppliers, legal advisors, and industry influencers. We have established 
              strong alliances to enhance our services, build a sustainable brand, and elevate real 
              estate experience for our clients.
            </p>
          </div>
          
          <div className="partners-categories">
            <div className="partners-category-tag">Architects</div>
            <div className="partners-category-tag">Contractors</div>
            <div className="partners-category-tag">Suppliers</div>
            <div className="partners-category-tag">Legal Advisors</div>
            <div className="partners-category-tag">Industry Influencers</div>
          </div>
          
          <div className="partners-grid">
            {partners.map(partner => (
              <div className="partners-grid-item" key={partner.id}>
                <PartnerCard
                  name={partner.name}
                  imageUrl={partner.imageUrl}
                  websiteUrl={partner.websiteUrl}
                  description={partner.description}
                />
              </div>
            ))}
          </div>
          
          <div className="partners-collaboration">
            <h3>Interested in Becoming a Partner?</h3>
            <p>
              We're always looking to expand our network of partners to bring even more value 
              to our clients. If you're interested in exploring partnership opportunities with 
              Lathea Group, we'd love to hear from you.
            </p>
            <div className="partners-cta-container">
              <button className="partners-cta-button primary">Contact Our Partnership Team</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Partners;