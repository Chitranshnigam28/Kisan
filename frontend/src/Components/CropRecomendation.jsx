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
      console.log(ownerId, '+++++++++++++++++++++++++++++++++++++------------------------')
      // Check if ownerId is defined
      if (!ownerId) {
        throw new Error('Owner ID is undefined');
      } else {
        console.log(ownerId)
      }

      const response = await axios.get(`http://localhost:5001/api/recommend-crop/${"67108f8d06fdf532952b1baa"}`);
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
    <div className="crWrapper">
      <div className="farmImgWrapper">
        <img src="./cucumberFarm.webp" id="featureImage" />

        <div className="fieldIconWrapper">
          <h2 id="farmName">{farmDetails.farmName} Farm</h2>
          <img src="./tomato.png" alt="" id="fieldImage" />
        </div>
      </div>
      <div className="wrcsWrapper">
        <div className="soilWrapper">
          <img src="./loamySoil.png" />
          <p><span className="attrHeading"><span className="attrHeading">Soil:</span></span> <br/>{farmDetails.soilType}</p></div>
        <div className="waterWrapper">
          <img src="./Water.png" />
          <p><span className="attrHeading">Water Source:</span> {farmDetails.waterSource}</p>
        </div>
        <div className="rcWrapper"><p><span className="attrHeading">Recommended Crop:</span> {farmDetails.recommendedCrop}</p></div>
      </div>
    </div>
  );
};

// Prop validation
CropRecommendation.propTypes = {
  ownerId: PropTypes.string.isRequired, // Ensure ownerId is a required string
};

export default CropRecommendation;