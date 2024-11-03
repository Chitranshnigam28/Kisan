import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MarketInsights = () => {
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    const fetchMarketInsights = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/get-market-insights/');
        setInsights(response.data.crops); // Access the data directly
      } catch (error) {
        console.error('Error fetching market insights:', error);
      }
    };

    fetchMarketInsights();
  }, []);

  return (
    <div>
      <h2>Market Insights</h2>
      {insights.length > 0 ? (
        <ul>
          {insights.map((crop, index) => (
            <li key={index}>
              <h3>{crop.crop_name}</h3>
              <p>Growth Suitability: {crop.percentage}%</p>
              <p>Price Trend: {crop.price_trend}</p>
              <p>Current Price: {crop.current_price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading market insights...</p>
      )}
    </div>
  );
};

export default MarketInsights;
