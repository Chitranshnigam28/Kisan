import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/tipsSlider.css'; // Make sure to import your CSS

const Tips = () => {
  const [tipsData, setTipsData] = useState([]);
  const [error, setError] = useState('');

  const fetchTips = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/tips');
      const data = response.data;

      if (Array.isArray(data)) {
        const duplicatedData = [...data, ...data, ...data]; 
        setTipsData(duplicatedData);
      } else {
        console.error('Data is not an array:', data);
        setTipsData([]);
      }
    } catch (error) {
      console.error('Error fetching tips:', error);
      setError('Failed to fetch tips');
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  return (
    <div className="carousel-container">
      {error && <div>{error}</div>}
      <div className="cards-track">
        {tipsData.map((tip, index) => (
          <div key={`${tip._id}-${index}`} className="card"> {/* Ensure unique keys */}
            <div className="crop-name">{tip.crop_name}</div>
            <div className="crop-tips">
              {tip.tips.map((tipText, tipIndex) => (
                <p key={tipIndex}>{tipText}</p> 
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Tips;
