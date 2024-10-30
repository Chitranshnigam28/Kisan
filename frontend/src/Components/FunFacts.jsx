import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardStack } from "./FunFactCard"; // Import the CardStack
import { cn } from "../utils/cn"; // For utility classes
import '../css/funfacts.css'; // Your CSS styles

const FunFacts = () => {
  const [funFact, setFunFact] = useState(null);

  const fetchRandomFunFact = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/funfacts");
      setFunFact(response.data);
    } catch (error) {
      console.log(error, "error fetching the data.");
    }
  };

  useEffect(() => {
    fetchRandomFunFact();
    const intervalId = setInterval(fetchRandomFunFact, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const CARDS = funFact
    ? [
        {
          id: 0,
          name: funFact.crop_name,
          designation: "General Information",
          content: (
            <p style={{ color: 'black' }}>
              <strong>General:</strong> {funFact.funFact.general}
            </p>
          ),
        },
        {
          id: 1,
          name: funFact.crop_name,
          designation: "Environmental Impact",
          content: (
            <p style={{ color: 'black' }}>
              <strong>Environmental Impact:</strong> {funFact.funFact.environmentalImpact}
            </p>
          ),
        },
        {
          id: 2,
          name: funFact.crop_name,
          designation: "Scientific Information",
          content: (
            <p style={{ color: 'black' }}>
              <strong>Scientific Name:</strong> {funFact.scientificName}
            </p>
          ),
        },
      ]
    : [];

  return (
    <div className="h-[40rem] flex items-center justify-center w-full" style={{ padding: '20px' }}>
      {funFact ? (
        <CardStack items={CARDS} />
      ) : (
        <p className="loading" style={{ color: 'black' }}>Loading...</p>
      )}
    </div>
  );
};

export default FunFacts;