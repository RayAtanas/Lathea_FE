import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/LatheaGroup_Logo.png';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Change navbar style when scrolling past the height of the viewport
      if (window.scrollY > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo section */}
        <div className="navbar-logo">
          <a href="/">
            <img src={logo} alt="Lathea Group Logo" />
          </a>
        </div>
        <ul className="nav-list">
          <li className="nav-item dropdown">
            <a href="#about">About us</a>
            <ul className="dropdown-menu">
              <li><a href="#chairman">Message from our chairman</a></li>
              <li><a href="#team">Our team</a></li>
              <li><a href="#partners">Our partners</a></li>
              <li><a href="#why-lathea">Why choose Lathea Group</a></li>
              <li><a href="#mission">Our mission and vision</a></li>
              <li><a href="#core-values">Our core values</a></li>
              <li><a href="#market-studies">Our market studies</a></li>
            </ul>
          </li>
          <li className="nav-item dropdown">
            <a href="#services">Services</a>
            <ul className="dropdown-menu">
              <li><a href="#real-estate-development">Real estate development</a></li>
              <li><a href="#real-estate-contracting">Real estate contracting</a></li>
              <li><a href="#real-estate-project-management">Real estate project management</a></li>
              <li><a href="#real-estate-property-management">Real estate property management</a></li>
              <li><a href="#real-estate-consultancy">Real estate consultancy and interior design</a></li>
            </ul>
          </li>
          <li className="nav-item">
            <a href="/projects">Projects</a>
          </li>
          <li className="nav-item">
            <a href="#contact">Contact us</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;