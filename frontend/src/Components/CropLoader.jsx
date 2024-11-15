import React from "react";
import Lottie from "react-lottie";
import loaderAnimation from "../Assets/plantAnimation.json"; 

const LottieLoader = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loaderAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const styles = {
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // height: "100vh",
      backgroundColor: "white",
      padding: "2rem", 
    },
  };

  return (
    <>
      <style>{`
        /* Additional CSS for finer control */
        .loader-container {
          animation: fade-in 1s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
      <div style={styles.loaderContainer} className="loader-container">
        <Lottie options={defaultOptions} height={400} width={300} /> {/* Increased size */}
      </div>
    </>
  );
};

export default LottieLoader;
