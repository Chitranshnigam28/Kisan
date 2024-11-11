import React from "react";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <Circles
        height={100}
        width={100}
        color="#4CAF50" // Green color for farming theme
        ariaLabel="loading"
      />
      <p style={styles.loadingText}>Loading...</p>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    // height: "100vh", // Centers the loader vertically
    textAlign: "center",
    color: "#4CAF50",
    backgroundColor: "#f4f4f2" // Optional: light background to enhance visibility
  },
  loadingText: {
    marginTop: 10,
    fontSize: "1.2em",
    color: "#6B8E23" // Olive color for the text
  }
};

export default Loader;
