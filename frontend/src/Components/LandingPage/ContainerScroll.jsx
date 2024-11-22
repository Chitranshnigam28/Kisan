"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export const ContainerScroll = ({ titleComponent, children }) => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // Adjust the ranges to make the effect smoother and slower
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]); // Slow down the scale change
  const translate = useTransform(scrollYProgress, [0, 1], [0, -30]); // Less translate for smoother effect
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]); // Slow down the rotation

  return (
    <div
      className="h-[40rem] flex items-center justify-center relative p-4"
      ref={containerRef}
    >
      <div className="py-10 w-full relative" style={{ perspective: "800px" }}>
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }) => (
  <motion.div
    style={{
      translateY: translate,
    }}
    className="max-w-4xl mx-auto text-center"
  >
    {titleComponent}
  </motion.div>
);

const Card = ({ rotate, scale, translate, children }) => (
  <motion.div
    style={{
      rotateX: rotate,
      scale,
      translateY: translate,
    }}
    className="max-w-4xl -mt-6 mx-auto h-[34rem] w-full border-4 border-gray-600 p-4 bg-gray-800 rounded-2xl shadow-xl"
  >
    <div className="h-full w-full overflow-hidden bg-gray-100 rounded-xl">
      {children}
    </div>
  </motion.div>
);




// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import "../../css/landingPage.css";
// import backgroundHeroLanding from "../../Assets/landingPage/heroBG.webp";
// import LandingPage from "../../Assets/landingPage/Dashboard.webp";
// import WheatIcon from "../../Assets/Vegetables/wheat.png";
// import CornIcon from "../../Assets/Vegetables/Corn.svg";
// import BarleyIcon from "../../Assets/Vegetables/barley.png";
// import PeaIcon from "../../Assets/Vegetables/pea.png";
// import PotatoIcon from "../../Assets/Vegetables/Potato.svg";

// const LandingComponent = () => {
//   return (
//     <div
//       className="relative w-full min-h-screen bg-cover bg-center"
//       style={{ backgroundImage: `url(${backgroundHeroLanding})` }}
//     >
//       {/* Navbar */}
//       <nav className="flex justify-between items-center px-8 py-4 bg-black text-white">
//         <div className="flex items-center space-x-4">
//           <img src="path-to-logo" alt="Kisan Logo" className="h-8" />
//           <h1 className="text-xl font-bold">Kisan</h1>
//         </div>
//         <ul className="flex space-x-6 text-lg">
//           <li>Features</li>
//           <li>How it works!</li>
//           <li>
//             <button className="bg-green-500 px-4 py-2 rounded-full">Login</button>
//           </li>
//         </ul>
//       </nav>

//       

//         {/* Floating Icons */}
//         <div className="relative mt-10">
//           <motion.img
//             src={WheatIcon}
//             alt="Wheat Icon"
//             className="absolute top-[-30px] left-[-30px] w-12 h-12"
//             animate={{ y: [0, -10, 0] }}
//             transition={{ repeat: Infinity, duration: 3 }}
//           />
//           <motion.img
//             src={CornIcon}
//             alt="Corn Icon"
//             className="absolute top-[20px] right-[-50px] w-14 h-14"
//             animate={{ scale: [1, 1.1, 1] }}
//             transition={{ repeat: Infinity, duration: 4 }}
//           />
//           <motion.img
//             src={BarleyIcon}
//             alt="Barley Icon"
//             className="absolute bottom-[-40px] left-[50px] w-10 h-10"
//             animate={{ rotate: [0, 15, -15, 0] }}
//             transition={{ repeat: Infinity, duration: 5 }}
//           />
//         </div>

//         {/* Main Dashboard Image */}
//         <div className="relative mt-10 max-w-4xl">
//           <img src={LandingPage} alt="Dashboard Preview" className="rounded-xl shadow-lg" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LandingComponent;

