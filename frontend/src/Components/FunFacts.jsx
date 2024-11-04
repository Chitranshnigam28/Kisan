import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardStack } from "./FunFactCard"; // Import the CardStack
import { cn } from "../utils/cn"; // For utility classes
import '../css/funfacts.css'; // Your CSS styles

const FunFacts = () => {
  const [funFact, setFunFact] = useState(null);

  // Fetch fun fact data from the API
  const fetchRandomFunFact = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/funfacts");
      setFunFact(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchRandomFunFact();
    const intervalId = setInterval(fetchRandomFunFact, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="funfacts-container">
      {funFact ? (
        <div className="funFactsDiv">
          <p className="title">Did you know?</p>
          <div className="fun-fact-card">
            <p className="fact-item"><strong>Scientific Name:</strong> {funFact.scientificName}</p>
            <p className="fact-item"><strong>Fun Fact:</strong> {funFact.funFact.general}</p>
            <p className="fact-item"><strong>Environmental Impact:</strong> {funFact.funFact.environmentalImpact}</p>
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default FunFacts;