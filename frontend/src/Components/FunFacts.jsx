import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/funfacts.css';

const FunFacts = () => {
  const [funFact, setFunFact] = useState(null);

  // fetch the funFact
  const fetchRandomFunFact = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/funfacts");
      setFunFact(response.data);
    } catch (error) {
      console.log(error, "error fetching the data.");
    }
  };

  useEffect(() => {
    fetchRandomFunFact(); // Fetch first fun fact on component load
    const intervalId = setInterval(fetchRandomFunFact, 5000);

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className="fun-facts-container">
      <h2 className="title">Random Fun Fact</h2>
      {funFact ? (
        <div className="fun-fact-card">
          <h3 className="crop-name">{funFact.crop_name}</h3>
          <p className="fact-item">
            <strong>General:</strong> {funFact.funFact.general}
          </p>
          <p className="fact-item">
            <strong>Environmental Impact:</strong>{" "}
            {funFact.funFact.environmentalImpact}
          </p>
          <p className="fact-item">
            <strong>Scientific Name:</strong> {funFact.scientificName}
          </p>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default FunFacts;
