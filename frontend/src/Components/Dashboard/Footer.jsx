import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { FaThLarge, FaSeedling, FaMapMarkerAlt } from 'react-icons/fa'; 
import '../../css/footer.css'

const Footer = () => {
  const [showFooter, setShowFooter] = useState(true);

  // Detect scroll to show/hide the footer
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Hide footer when scrolling down
        setShowFooter(false);
      } else {
        // Show footer when scrolling up
        setShowFooter(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className={`footer-container ${showFooter ? 'show' : 'hide'}`}>
      <div className="icon-container">
        <div className="icon-wrapper">
          <FaThLarge className="footer-icon">
             {/* <Link to="/maps">
          <GMaps />
        </Link> */}
          </FaThLarge>
          
        </div>
        <div className="icon-wrapper">
          <FaSeedling className="footer-icon" />
        </div>
        <div className="icon-wrapper">
          <FaMapMarkerAlt className="footer-icon" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
