import React, { useEffect, useState } from "react";
import axios from "axios";
// import '../css/tipsSlider.css';

const SingleTips = ({ cropName }) => {
  const [tipsData, setTipsData] = useState([]);
  const [filteredTip, setFilteredTip] = useState(null);
  const [translatedTip, setTranslatedTip] = useState(null);
  const [error, setError] = useState("");
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );

  const fetchTips = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/tips`);
      const data = response.data;

      if (Array.isArray(data)) {
        const duplicatedData = [...data, ...data, ...data];
        setTipsData(duplicatedData);
      } else {
        console.error("Data is not an array:", data);
        setTipsData([]);
      }
    } catch (error) {
      console.error("Error fetching tips:", error);
      setError("Failed to fetch tips");
    }
  };

  const filterTips = () => {
    if (cropName) {
      const cropTips = tipsData.filter(
        (tip) =>
          tip &&
          tip.crop_name &&
          tip.crop_name.toLowerCase() === cropName.toLowerCase()
      );
      setFilteredTip(cropTips.length > 0 ? cropTips[0] : null);
    } else {
      const wheatTip = tipsData.find(
        (tip) => tip && tip.crop_name && tip.crop_name.toLowerCase() === "wheat"
      );
      setFilteredTip(wheatTip || null);
    }
  };

  const translateTip = async (tip) => {
    try {
      const cropNameTranslation = await translateText(tip.crop_name, language);
      const tipsTranslation = await Promise.all(
        tip.tips.map((tipText) => translateText(tipText, language))
      );
      const translatedTip = {
        ...tip,
        crop_name: cropNameTranslation,
        tips: tipsTranslation,
      };
      setTranslatedTip(translatedTip);
    } catch (error) {
      console.error("Error translating text:", error.response || error);
    }
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/translate`, {
        text: text,
        targetLanguage: targetLanguage,
      });
      return response.data.translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text;
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  useEffect(() => {
    filterTips();
  }, [tipsData, cropName]);

  useEffect(() => {
    if (filteredTip) {
      translateTip(filteredTip);
    }
  }, [filteredTip, language]);

  return (
    <div className="tip-container">
      {error && <div>{error}</div>}
      {translatedTip ? (
        <div key={translatedTip._id} className="tip-card">
          <div className="tip-content">
            <div className="icon-cropName">
              <span className="tip-icon">💡</span>
              <h3 className="crop-name">{translatedTip.crop_name}</h3>
            </div>
            {translatedTip.tips.map((tipText, tipIndex) => (
              <p key={tipIndex}>{tipText}</p>
            ))}
          </div>
        </div>
      ) : (
        <p>No tips available for this crop.</p>
      )}
    </div>
  );
};

export default SingleTips;
