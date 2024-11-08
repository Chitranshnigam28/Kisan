import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import '../css/tipsSlider.css'; 

const SingleTips = ({ cropName }) => {
  const [tipsData, setTipsData] = useState([]);
  const [filteredTip, setFilteredTip] = useState(null); // Single tip
  const [translatedTip, setTranslatedTip] = useState(null); // Store translated tip
  const [error, setError] = useState('');
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); // Get current language

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
      // Fallback to a specific crop's tips
      const wheatTip = tipsData.find(
        tip => tip && tip.crop_name && tip.crop_name.toLowerCase() === 'wheat'
      );
      setFilteredTip(wheatTip || null);
    }
  };

  const translateTip = async (tip) => {
    try {
      const cropNameTranslation = await translateText(tip.crop_name, language);
      const tipsTranslation = await Promise.all(tip.tips.map(tipText => translateText(tipText, language)));
      const translatedTip = {
        ...tip,
        crop_name: cropNameTranslation,
        tips: tipsTranslation,
      };
      setTranslatedTip(translatedTip); // Save the translated tip
    } catch (error) {
      console.error("Error translating text:", error.response || error);
    }
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post('http://localhost:5001/api/translate', {
        text: text,
        targetLanguage: targetLanguage, 
      });
      return response.data.translatedText; 
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Return original text on error
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  useEffect(() => {
    filterTips();
  }, [tipsData, cropName]); // Re-filter when tipsData or cropName changes

  useEffect(() => {
    if (filteredTip) {
      translateTip(filteredTip); // Translate tip whenever it changes
    }
  }, [filteredTip, language]); // Re-translate when filteredTip or language changes

  return (
    <div className="carousel-container">
      {error && <div>{error}</div>}
      <div className="cards-track">
        {translatedTip ? ( // Render the translated tip
          <div key={translatedTip._id} className="card">
            <div className="crop-name">{translatedTip.crop_name}</div>
            <div className="crop-tips">
              {translatedTip.tips.map((tipText, tipIndex) => (
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
