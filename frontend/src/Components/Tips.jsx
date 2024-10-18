import React, { useState } from 'react';
import axios from 'axios';

const CropTips = () => {
  const [tips, setTips] = useState(null);
  const [recommendedCrop, setRecommendedCrop] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    state: '',
    temperature: '',
    humidity: '',
    rainfall: '',
    soilType: '',
    previousCrop: '',
  });

  // Function to fetch crop recommendation and tips
  const getCropTips = async () => {
    try {
      const response = await axios.post('http://localhost:5001/api/recommendCrop', formData);
      const { recommendedCrop, tips } = response.data;
      setRecommendedCrop(recommendedCrop); // Set recommended crop
      setTips(tips); // Set tips for the recommended crop
      setError(null);
    } catch (err) {
      setError('Failed to fetch tips');
      setTips(null);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h2>Get Crop Tips</h2>

      {/* Input form to get user data */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          getCropTips(); // Call the function to fetch crop tips when form is submitted
        }}
      >
        <input
          type="text"
          name="state"
          value={formData.state}
          onChange={handleInputChange}
          placeholder="State"
        />
        <input
          type="number"
          name="temperature"
          value={formData.temperature}
          onChange={handleInputChange}
          placeholder="Temperature"
        />
        <input
          type="number"
          name="humidity"
          value={formData.humidity}
          onChange={handleInputChange}
          placeholder="Humidity"
        />
        <input
          type="number"
          name="rainfall"
          value={formData.rainfall}
          onChange={handleInputChange}
          placeholder="Rainfall"
        />
        <input
          type="text"
          name="soilType"
          value={formData.soilType}
          onChange={handleInputChange}
          placeholder="Soil Type"
        />
        <input
          type="text"
          name="previousCrop"
          value={formData.previousCrop}
          onChange={handleInputChange}
          placeholder="Previous Crop (optional)"
        />
        <button type="submit">Get Recommendation</button>
      </form>

      {/* Render the recommendation and tips */}
      {recommendedCrop && (
        <div>
          <h3>{`Recommended Crop: ${recommendedCrop.name}`}</h3>
          <h4>Tips for {recommendedCrop.name}:</h4>
          <ul>
            {tips && tips.map((tip, index) => (
              <li key={index}>{tip}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Error Handling */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CropTips;
