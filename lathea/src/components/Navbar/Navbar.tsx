import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/LatheaGroup_Logo.png';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  // Handle scrolling effects
  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style when scrolling
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section for highlighting nav items
      const sections = document.querySelectorAll('section[id]');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionId = section.getAttribute('id');
        
        // 150px offset for earlier trigger
        if (sectionTop < 150 && sectionTop >= -section.clientHeight + 150) {
          if (sectionId) setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile dropdown menus
  const toggleDropdown = (dropdown: string) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Close mobile menu when navigating
      setMobileMenuOpen(false);
      setActiveDropdown(null);
      
      // Smooth scroll with offset for navbar
      const navbarHeight = document.querySelector('.navbar')?.clientHeight || 70;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Check if section matches active section or any of its children
  const isActive = (sectionId: string, childrenIds?: string[]) => {
    if (activeSection === sectionId) return true;
    if (childrenIds && childrenIds.includes(activeSection)) return true;
    return false;
  };

  // Handle mobile responsiveness
  const handleMobileNavClick = (e: React.MouseEvent, dropdown: string) => {
    e.preventDefault();
    if (window.innerWidth <= 768) {
      toggleDropdown(dropdown);
    } else {
      scrollToSection(dropdown);
    }
  };

  // Handle link clicks
  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    scrollToSection(id);
  };

  const handleChairmanClick = () => {
   navigate("/chairman");
  };

  
  const handleLatheaClick = () => {
    navigate("/choose-lathea");
   };

   const handleMissionClick = () => {
    navigate("/mission");
   };
   const handleValuesClick = () => {
    navigate("/values");
   };
   const handleMarketClick = () => {
    navigate("/market-studies");
   };

   const handleDevelopmentClick = () => {
    navigate("/development");
   };

   const handleContractingClick = () => {
    navigate("/contracting");
   };

  // Handle logo click to navigate to home page
  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo section */}
        <div className="navbar-logo">
          <a href="/" onClick={handleLogoClick}>
            <img src={logo} alt="Lathea Group Logo" />
          </a>
        </div>
        
        {/* Mobile menu toggle */}
        <div 
          className={`mobile-menu-toggle ${mobileMenuOpen ? 'active' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        
        {/* Navigation menu */}
        <ul className={`nav-list ${mobileMenuOpen ? 'active' : ''}`}>
          <li className={`nav-item dropdown ${activeDropdown === 'about' ? 'active' : ''}`}>
            <a 
              href="#about" 
              className={isActive('about', ['chairman', 'team', 'partners', 'why-lathea', 'mission', 'core-values', 'market-studies']) ? 'active' : ''}
              onClick={(e) => handleMobileNavClick(e, 'about')}
            >
              About us
            </a>
            <ul className="dropdown-menu">
              <li><a href="/chairman" onClick={() => handleChairmanClick()}>Message from our chairman</a></li>
              <li><a href="/choose-lathea" onClick={() => handleLatheaClick()}>Our team</a></li>
              <li><a href="#partners" onClick={(e) => handleLinkClick(e, 'partners')}>Our partners</a></li>
              <li><a href="/choose-lathea" onClick={() => handleLatheaClick()}>Why choose Lathea Group</a></li>
              <li><a href="/mission" onClick={() => handleMissionClick()}>Our mission and vision</a></li>
              <li><a href="/values" onClick={() => handleValuesClick()}>Our core values</a></li>
              <li><a href="/market-studies" onClick={() => handleMarketClick()}>Our market studies</a></li>
            </ul>
          </li>
          
          <li className={`nav-item dropdown ${activeDropdown === 'services' ? 'active' : ''}`}>
            <a 
              href="#services" 
              className={isActive('services', ['real-estate-development', 'real-estate-contracting', 'real-estate-project-management', 'real-estate-property-management', 'real-estate-consultancy']) ? 'active' : ''}
              onClick={(e) => handleMobileNavClick(e, 'services')}
            >
              Services
            </a>
            <ul className="dropdown-menu">
              <li><a href="/development" onClick={() => handleDevelopmentClick()}>Real estate development</a></li>
              <li><a href="/contracting" onClick={() => handleContractingClick()}>Real estate contracting</a></li>
              <li><a href="#real-estate-project-management" onClick={(e) => handleLinkClick(e, 'real-estate-project-management')}>Real estate project management</a></li>
              <li><a href="#real-estate-property-management" onClick={(e) => handleLinkClick(e, 'real-estate-property-management')}>Real estate property management</a></li>
              <li><a href="#real-estate-consultancy" onClick={(e) => handleLinkClick(e, 'real-estate-consultancy')}>Real estate consultancy and interior design</a></li>
            </ul>
          </li>
          
          <li className="nav-item">
            <a 
              href="/projects" 
              className={activeSection === 'projects' ? 'active' : ''}
              onClick={() => {
                setMobileMenuOpen(false);
                navigate('/projects');
              }}
            >
              Projects
            </a>
          </li>
          
          <li className="nav-item">
            <a 
              href="#contact" 
              className={activeSection === 'contact' ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, 'contact')}
            >
              Contact us
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;