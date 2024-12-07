import React, { useState, useEffect } from "react";
import { FaThLarge, FaSeedling, FaMapMarkerAlt } from "react-icons/fa";
import { FloatingDock } from "../FloatingDeck";
import { Link } from "react-router-dom";
import "../../css/footer.css";
import CropRecommendation from "../CropRecomendation";
import { AiOutlineClose } from "react-icons/ai";
import homeimg from "./../../Assets/Navbar/CirclesFour.png";
import plantimg from "./../../Assets/Navbar/Plant.png";
import mapPin from "./../../Assets/Navbar/MapPin.png";

export function Footer({ setShowOverlay }) {
  const [showDock, setShowDock] = useState(true);
  const [showCropDiv, setShowCropDiv] = useState(false);

  useEffect(() => {
    if (typeof setShowOverlay === "function") {
      setShowOverlay(showCropDiv);
    }
  }, [showCropDiv, setShowOverlay]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let timeoutId;
    if (window.innerWidth <= 800) {
      setShowDock(true); // Always show footer for mobile
      return; // Skip adding scroll event listener
    }
    const handleScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        setShowDock(window.scrollY <= lastScrollY || window.scrollY <= 20); // Always show when scrolled to the top
        lastScrollY = window.scrollY;
        timeoutId = null;
      }, 100);
      // setShowDock(window.scrollY <= lastScrollY);
      // lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // const links = [
  //   { title: "Home", icon: <FaThLarge className="footer-icon" />, href: "/" },
  //   {
  //     title: "Crop Recommendation",
  //     icon: (
  //       <FaSeedling
  //         className="footer-icon"
  //         onClick={() => setShowCropDiv(!showCropDiv)}
  //       />
  //     ),
  //   },
  //   {
  //     title: "Maps",
  //     icon: <FaMapMarkerAlt className="footer-icon" />,
  //     href: "/maps",
  //   },
  // ];

  const links = [
    { title: "Home", 
    icon: <img src={homeimg} alt="Home Icon" className="footer-icon" />, 
    href: "/"  },
    {
      title: "Crop Recommendation",
      icon: 
        <img 
          src={plantimg} 
          alt="Crop Recommendation Icon" 
          className="footer-icon" />,
          onClick: () => setShowCropDiv(!showCropDiv),        
    },

    {
      title: "Maps",
    icon: <img src={mapPin} alt="Maps Icon" className="footer-icon" />,
    href: "/maps",
    },
  ];
  // const links = [
  //   { title: "Home",
  //   icon: <img src={homeimg} alt="Home Icon" className="footer-icon" />,
  //   href: "/"  },
  //   {
  //     title: "Crop Recommendation",
  //     icon: (
  //       <img
  //         src={plantimg}
  //         alt="Crop Recommendation Icon"
  //         className="footer-icon"
  //         onClick={() => setShowCropDiv(!showCropDiv)}
  //       />
  //     ),
  //   },
  //   {
  //     title: "Maps",
  //   icon: <img src={mapPin} alt="Maps Icon" className="footer-icon" />,
  //   href: "/maps",
  //   },
  // ];
  

  return (
    <>
      <div className={`floating-dock ${showDock ? "show" : "hide"}`}>
        {/* <FloatingDock
          mobileClassName="translate-y-20"
          items={links.map((link) => ({
            ...link,
            icon: link.href ? (
              <Link to={link.href}>{link.icon}</Link>
            ) : (
              link.icon
            ),
          }))}
        /> */}
        <FloatingDock items={links} />
      </div>

      {showCropDiv && (
        <div className="crop-recommendation-div relative">
          <button
            onClick={() => setShowCropDiv(false)}
            className="absolute top-2 right-2 mb-2 p-1 text-white bg-[rgb(206,54,54)] hover:bg-black hover:text-black rounded-full transition-all duration-200 ease-in-out"
          >
            <AiOutlineClose className="text-2xl" />
          </button>

          <CropRecommendation key={showCropDiv ? 1 : 0} />
        </div>
      )}
    </>
  );
}
