// import React, { useState, useEffect } from "react";
// import { FaThLarge, FaSeedling, FaLeaf,FaMapMarkerAlt, FaLanguage } from "react-icons/fa";
// import { FloatingDock } from '../FloatingDeck'; 
// import { Link } from "react-router-dom";
// import '../../css/footer.css';
// import CropRecommendation from "../CropRecomendation";

// export function Footer({ setShowOverlay }) {
//   const [showDock, setShowDock] = useState(true);
//   const [showCropDiv,setShowCropDiv]=useState(false);
//   // Detect scroll to show/hide the floating dock

//    // Toggle the global overlay when `showCropDiv` changes
//    useEffect(() => {
//     setShowOverlay(showCropDiv);
//   }, [showCropDiv, setShowOverlay]);
  
//   useEffect(() => {
//     let lastScrollY = window.scrollY;

//     const handleScroll = () => {
//       if (window.scrollY > lastScrollY) {
//         // Hide dock when scrolling down
//         setShowDock(false);
//       } else {
//         // Show dock when scrolling up
//         setShowDock(true);
//       }
//       lastScrollY = window.scrollY;
//     };

//     window.addEventListener("scroll", handleScroll);

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const links = [
//     {
//       title: "Home",
//       icon: <FaThLarge className="footer-icon" />,
//       href: "/", // React Router path for home
//     },
//     // {
//     //   title: "Charts",
//     //   icon: <FaSeedling className="footer-icon" />,
//     //   href: "/charts", // React Router path for charts
//     // },
//     {
//       title: "Crop Recommendation",
//       icon: <FaSeedling className="footer-icon" onClick={()=>setShowCropDiv(!showCropDiv)}/>,
//       // href: "/crop-recommendation", // React Router path for home
//     },
//     {
//       title: "Maps",
//       icon: <FaMapMarkerAlt className="footer-icon" />,
//       href: "/maps", // React Router path for maps
//     },
//   ];

//   return (
//     <>
//     <div className={`floating-dock ${showDock ? "show" : "hide"}`}>
//       <FloatingDock
//         mobileClassName="translate-y-20"
//         items={links.map(link => ({
//           ...link,
//           icon: (
//            link.href?( <Link to={link.href}> {/* Wrap icon with Link */}
//               {link.icon}
//             </Link>): (
//                 link.icon // No Link if there's no href
//               )
//           ),
//         }))}
//       />
//     </div>
//     {showCropDiv && <div className="crop-recommendation-div">
//     <div className="crTitleWrapper">
//     {/* <h2 className="crTitle">
//       Crop Recommendation
//     </h2> */}
//       {/* <button className="close-btn" onClick={() => setShowCropDiv(false)}>✕</button> */}
//       </div>
//     <CropRecommendation />
//     {/* <button className="recommend-btn">Recommend Crops!</button> */}
//   </div>}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import { FaThLarge, FaSeedling, FaLeaf, FaMapMarkerAlt, FaLanguage } from "react-icons/fa";
import { FloatingDock } from "../FloatingDeck";
import { Link } from "react-router-dom";
import "../../css/footer.css";
import CropRecommendation from "../CropRecomendation";

export function Footer({ setShowOverlay }) {
  const [showDock, setShowDock] = useState(true);
  const [showCropDiv, setShowCropDiv] = useState(false);

  // Toggle the global overlay when `showCropDiv` changes
  useEffect(() => {
    // Check if `setShowOverlay` is a valid function before calling it
    if (typeof setShowOverlay === "function") {
      setShowOverlay(showCropDiv);
    }
  }, [showCropDiv, setShowOverlay]);

  // Handle scroll behavior for showing/hiding the floating dock
  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        // Hide the dock when scrolling down
        setShowDock(false);
      } else {
        // Show the dock when scrolling up
        setShowDock(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Define the links for the floating dock
  const links = [
    {
      title: "Home",
      icon: <FaThLarge className="footer-icon" />,
      href: "/", // React Router path for home
    },
    {
      title: "Crop Recommendation",
      icon: <FaSeedling className="footer-icon" onClick={() => setShowCropDiv(!showCropDiv)} />,
    },
    {
      title: "Maps",
      icon: <FaMapMarkerAlt className="footer-icon" />,
      href: "/maps", // React Router path for maps
    },
    // {
    //   title: "Translate",
    //   icon: <FaLanguage className="footer-icon" />,
    //   href: "/translate", // React Router path for translate
    // },
  ];

  return (
    <>
      {/* Floating Dock Component */}
      <div className={`floating-dock ${showDock ? "show" : "hide"}`}>
        <FloatingDock
          mobileClassName="translate-y-20"
          items={links.map((link) => ({
            ...link,
            icon: link.href ? (
              <Link to={link.href}>
                {/* Wrap icon with Link if `href` is provided */}
                {link.icon}
              </Link>
            ) : (
              link.icon // Use icon directly if no `href` is provided
            ),
          }))}
        />
      </div>

      {/* Crop Recommendation Overlay */}
      {showCropDiv && (
        <div className="crop-recommendation-div">
          <div className="crTitleWrapper">
            {/* Optional Close Button */}
            {/* <button className="close-btn" onClick={() => setShowCropDiv(false)}>✕</button> */}
          </div>
          <CropRecommendation />
        </div>
      )}
    </>
  );
}