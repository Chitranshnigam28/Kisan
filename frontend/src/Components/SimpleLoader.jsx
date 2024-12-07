import React from 'react';
import { MdPadding } from 'react-icons/md';

const IndiaCropLoader = () => {
  const styles = {
    loaderContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      // height: "100vh",
      height: "400px",
      padding: "2rem", 
      // backgroundColor: "white", // Optional background color
    },
    greenCircleLoader: {
      width: "50px",
      height: "50px",
      border: "6px solid #4caf50", // Green border
      borderRadius: "50%",
      borderTop: "6px solid transparent",
      animation: "spin 1s linear infinite",
    }
  };

  return (
    <div>
      <style>{`
        /* Additional CSS for finer control */
        .loader-container {
          animation: fade-in 1s ease-in-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <div style={styles.loaderContainer} className="loader-container">
        <div style={styles.greenCircleLoader}></div>
      </div>
    </div>
  );
};

export default IndiaCropLoader;
