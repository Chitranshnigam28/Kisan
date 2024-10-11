import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GMaps from "../GMaps";
import ComponentPriceGraph from "../CropPriceGraph";
import { FaThLarge, FaSeedling, FaMapMarkerAlt } from "react-icons/fa";
import "../../css/footer.css";

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

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <footer className={`footer-container ${showFooter ? "show" : "hide"}`}>
      <div className="icon-container">
        {/* Home icon with link */}
        <div className="icon-wrapper">
          <Link to="/">
            <FaThLarge className="footer-icon" />
          </Link>
        </div>
        {/* Charts icon with link */}
        <div className="icon-wrapper">
          <Link to="/charts">
            <FaSeedling className="footer-icon" />
            {/* <ComponentPriceGraph /> */}
          </Link>
        </div>
        {/* Maps icon with link */}
        <div className="icon-wrapper">
          <Link to="/maps">
            <FaMapMarkerAlt className="footer-icon" />
            {/* <GMaps /> */}
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
