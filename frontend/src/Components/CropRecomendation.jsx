import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CropRecommendation = ({ ownerId }) => {
  const [farmDetails, setFarmDetails] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch farm and crop recommendation
  const fetchFarmAndCropRecommendation = async () => {
    try {
      if (!ownerId) {
        throw new Error('Owner ID is undefined');
      }

      // Make request to your backend
      const response = await axios.get(`/api/recommend-crop/${ownerId}`);
      setFarmDetails(response.data);
    } catch (error) {
      console.error('Error fetching farm details:', error);
      setError('Error fetching farm details');
    }
  };

  useEffect(() => {
    fetchFarmAndCropRecommendation();
  }, [ownerId]);

  if (error) return <p>{error}</p>;
  if (!farmDetails) return <p>Loading...</p>;

  return (
    <div>
      <h2>Farm Name: {farmDetails.farmName}</h2>
      <p>Soil Type: {farmDetails.soilType}</p>
      <p>Water Source: {farmDetails.waterSource}</p>
      <p>Recommended Crop: {farmDetails.recommendedCrop}</p>
    </div>
  );
};

export default CropRecommendation;
