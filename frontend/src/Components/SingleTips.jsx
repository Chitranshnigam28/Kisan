import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/tipsSlider.css'; // Make sure to import your CSS

const SingleTips = ({ cropName }) => {
  const [tipsData, setTipsData] = useState([]);
  const [filteredTip, setFilteredTip] = useState(null); // Changed to single tip
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

  const filterTips = () => {
    if (cropName) {
      const cropTips = tipsData.filter(tip => 
        tip && tip.crop_name && tip.crop_name.toLowerCase() === cropName.toLowerCase()
      );
      setFilteredTip(cropTips.length > 0 ? cropTips[0] : null); // Only set the first matched tip
    } else {
      // If no cropName is provided, show a random tip
      // if (tipsData.length > 0) {
      //   const randomIndex = Math.floor(Math.random() * tipsData.length);
      //   setFilteredTip(tipsData[randomIndex]); // Set a random tip
      // } else {
      //   setFilteredTip(null); // No tips to show
      // }
      const wheatTip = tipsData.find(
        tip => tip && tip.crop_name && tip.crop_name.toLowerCase() === 'wheat'
      );
      setFilteredTip(wheatTip || null);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  useEffect(() => {
    filterTips();
  }, [tipsData, cropName]); // Re-filter when tipsData or cropName changes

  return (
    <div className="carousel-container">
      {error && <div>{error}</div>}
      <div className="cards-track">
        {filteredTip ? (  // Render only one tip
          <div key={filteredTip._id} className="card">
            <div className="crop-name">{filteredTip.crop_name}</div>
            <div className="crop-tips">
              {filteredTip.tips.map((tipText, tipIndex) => (
                <p key={tipIndex}>{tipText}</p>
              ))}
            </div>
          </div>
        ) : (
          <p>No tips available for this crop.</p>
        )}
      </div>
    </div>
  );
};

export default SingleTips;
