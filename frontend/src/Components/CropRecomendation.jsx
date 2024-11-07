// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types'; // For prop validation

// const CropRecommendation = ({ ownerId }) => {
//   const [farmDetails, setFarmDetails] = useState(null);
//   const [error, setError] = useState(null);

//   // Function to fetch farm and crop recommendation
//   const fetchFarmAndCropRecommendation = async () => {
//     try {
//       const ownerId = localStorage.getItem('userId');
//       console.log(ownerId, '+++++++++++++++++++++++++++++++++++++------------------------')
//       // Check if ownerId is defined
//       if (!ownerId) {
//         throw new Error('Owner ID is undefined');
//       } else {
//         console.log(ownerId)
//       }

//       const response = await axios.get(`http://localhost:5001/api/recommend-crop/${ownerId}`);

//       setFarmDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching farm details:', error);
//       setError(error.message);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchFarmAndCropRecommendation();
//   }, [ownerId]);

//   // Handling loading and error states
//   if (error) return <p>{error}</p>;
//   if (!farmDetails) return <p>Loading...</p>;

//   return (
//     <div className="crWrapper">
//       <div className="farmImgWrapper">
//         <img src="./cucumberFarm.webp" id="featureImage" />

//         <div className="fieldIconWrapper">
//           <h2 id="farmName">{farmDetails.farmName} Farm</h2>
//           <img src="./tomato.png" alt="" id="fieldImage" />
//         </div>
//       </div>
//       <div className="wrcsWrapper">
//         <div className="soilWrapper">
//           <img src="./loamySoil.png" />
//           <p><span className="attrHeading"><span className="attrHeading">Soil:</span></span> <br/>{farmDetails.soilType}</p></div>
//         <div className="waterWrapper">
//           <img src="./Water.png" />
//           <p><span className="attrHeading">Water Source:</span> {farmDetails.waterSource}</p>
//         </div>
//         <div className="rcWrapper"><p><span className="attrHeading">Recommended Crop:</span> {farmDetails.recommendedCrop}</p></div>
//       </div>
//     </div>
//   );
// };

// // Prop validation
// CropRecommendation.propTypes = {
//   ownerId: PropTypes.string.isRequired, // Ensure ownerId is a required string
// };

// export default CropRecommendation;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // For prop validation

const CropRecommendation = ({ ownerId }) => {
  const [farmDetails, setFarmDetails] = useState(null);
  const [translatedFarmDetails, setTranslatedFarmDetails] = useState(null);
  const [error, setError] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // Get language from localStorage

  // Translation mapping for headings
  const headingTranslationMapping = {
    soil: {
      en: 'Soil',
      hi: 'मिट्टी',
      pa: 'ਮਿੱਟੀ',
    },
    waterSource: {
      en: 'Water Source',
      hi: 'जल स्रोत',
      pa: 'ਪਾਣੀ ਦਾ ਸਰੋਤ',
    },
    recommendedCrop: {
      en: 'Recommended Crop',
      hi: 'सुझाई गई फसल',
      pa: 'ਸੁਝਾਈ ਗਈ ਫਸਲ',
    },
  };

  // Function to fetch farm and crop recommendation
  const fetchFarmAndCropRecommendation = async () => {
    try {
      const ownerId = localStorage.getItem('userId');
      console.log(ownerId, '+++++++++++++++++++++++++++++++++++++------------------------');
      if (!ownerId) {
        throw new Error('Owner ID is undefined');
      }

      const response = await axios.get(`http://localhost:5001/api/recommend-crop/${ownerId}`);
      setFarmDetails(response.data);
      translateFarmDetails(response.data, language); // Translate after fetching farm details
    } catch (error) {
      console.error('Error fetching farm details:', error);
      setError(error.message);
    }
  };

  // Translate farm details
  const translateFarmDetails = async (farmData, targetLanguage) => {
    try {
      const translatedFarmData = {
        farmName: await translateText(farmData.farmName, targetLanguage),
        soilType: await translateText(farmData.soilType, targetLanguage),
        waterSource: await translateText(farmData.waterSource, targetLanguage),
        recommendedCrop: await translateText(farmData.recommendedCrop, targetLanguage),
      };

      setTranslatedFarmDetails(translatedFarmData);
    } catch (error) {
      console.error('Error translating farm details:', error.response || error);
    }
  };

  // Translate text
  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post('http://localhost:5001/api/translate', {
        text: text,
        targetLanguage: targetLanguage,
      });
      return response.data.translatedText; // Return translated text
    } catch (error) {
      console.error('Error translating text:', error);
      return text; // Return original text if translation fails
    }
  };

  // Get translated heading based on the selected language
  const getTranslatedHeading = (key) => {
    return headingTranslationMapping[key] ? headingTranslationMapping[key][language] : key;
  };

  // Fetch data on component mount or when language changes
  useEffect(() => {
    fetchFarmAndCropRecommendation();
    const intervalId = setInterval(fetchFarmAndCropRecommendation, 5000); // Refresh every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [language]); // Depend on language for translation updates

  // Handling loading and error states
  if (error) return <p>{error}</p>;
  if (!farmDetails) return <p>Loading...</p>;

  return (
    <div className="crWrapper">
      <div className="farmImgWrapper">
        <img src="./cucumberFarm.webp" id="featureImage" alt="Farm" />
        <div className="fieldIconWrapper">
          <h2 id="farmName">{translatedFarmDetails ? translatedFarmDetails.farmName : farmDetails.farmName} Farm</h2>
          <img src="./tomato.png" alt="Field" id="fieldImage" />
        </div>
      </div>
      <div className="wrcsWrapper">
        <div className="soilWrapper">
          <img src="./loamySoil.png" alt="Soil" />
          <p>
            <span className="attrHeading">{getTranslatedHeading('soil')}:</span> <br />
            {translatedFarmDetails ? translatedFarmDetails.soilType : farmDetails.soilType}
          </p>
        </div>
        <div className="waterWrapper">
          <img src="./Water.png" alt="Water" />
          <p>
            <span className="attrHeading">{getTranslatedHeading('waterSource')}:</span> {translatedFarmDetails ? translatedFarmDetails.waterSource : farmDetails.waterSource}
          </p>
        </div>
        <div className="rcWrapper">
          <p>
            <span className="attrHeading">{getTranslatedHeading('recommendedCrop')}:</span> {translatedFarmDetails ? translatedFarmDetails.recommendedCrop : farmDetails.recommendedCrop}
          </p>
        </div>
      </div>
    </div>
  );
};

// Prop validation
CropRecommendation.propTypes = {
  ownerId: PropTypes.string.isRequired, // Ensure ownerId is a required string
};

export default CropRecommendation;
