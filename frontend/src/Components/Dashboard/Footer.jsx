import React, { useState, useEffect } from "react";
import { FaThLarge, FaSeedling, FaMapMarkerAlt, FaLanguage } from "react-icons/fa";
import { FloatingDock } from '../FloatingDeck'; // Ensure you have the FloatingDock component
import { Link } from "react-router-dom";
import '../../css/footer.css';

export function Footer() {
  const [showDock, setShowDock] = useState(true);

  // Detect scroll to show/hide the floating dock
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Hide dock when scrolling down
        setShowDock(false);
      } else {
        // Show dock when scrolling up
        setShowDock(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const links = [
    {
      title: "Home",
      icon: <FaThLarge className="footer-icon" />,
      href: "/", // React Router path for home
    },
    {
      title: "Charts",
      icon: <FaSeedling className="footer-icon" />,
      href: "/charts", // React Router path for charts
    },
    {
      title: "Maps",
      icon: <FaMapMarkerAlt className="footer-icon" />,
      href: "/maps", // React Router path for maps
    },
    {
      title: "Translate",
      icon: <FaLanguage className="footer-icon" />,
      href: "/translate", // React Router path for translate
    },
  ];

  return (
    <div className={`floating-dock ${showDock ? "show" : "hide"}`}>
      <FloatingDock
        mobileClassName="translate-y-20"
        items={links.map(link => ({
          ...link,
          icon: (
            <Link to={link.href}> {/* Wrap icon with Link */}
              {link.icon}
            </Link>
          ),
        }))}
      />
    </div>
  );
}
