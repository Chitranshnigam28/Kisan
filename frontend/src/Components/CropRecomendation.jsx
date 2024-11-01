import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // For prop validation

const CropRecommendation = ({ ownerId }) => {
  const [farmDetails, setFarmDetails] = useState(null);
  const [error, setError] = useState(null);

  // Function to fetch farm and crop recommendation
  const fetchFarmAndCropRecommendation = async () => {
    try {
      const ownerId = localStorage.getItem('userId');
      console.log(ownerId,'+++++++++++++++++++++++++++++++++++++------------------------')
      // Check if ownerId is defined
      if (!ownerId) {
        throw new Error('Owner ID is undefined');
      }else{
        console.log(ownerId)
      }

      const response = await axios.get(`http://localhost:5001/api/recommend-crop/${ownerId}`);
      setFarmDetails(response.data);
    } catch (error) {
      console.error('Error fetching farm details:', error);
      setError(error.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchFarmAndCropRecommendation();
  }, [ownerId]);

  // Handling loading and error states
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

// Prop validation
CropRecommendation.propTypes = {
  ownerId: PropTypes.string.isRequired, // Ensure ownerId is a required string
};

export default CropRecommendation;