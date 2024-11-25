import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const deleteMyTips = async (farmId) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http:localhost:5001/api/farms/${farmId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error('Error deleting farm:', err);
    throw new Error('Failed to delete farm'); // Throw error for handling in MyFarms
  }
};

const MatchingTips = ({ matchedTips, setMatchedTips,selectedFarm  }) => {
  const [farms, setFarms] = useState([]);
  const [tipsData, setTipsData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  // const [selectedFarm, setSelectedFarm] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en');
  const [translatedMatchedTips, setTranslatedMatchedTips] = useState([]);

  // Get the user ID from localStorage
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID is undefined');
  }

  // Fetch user's farms
  const fetchFarms = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get(`http:localhost:5001/api/farms`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFarms(response.data);
    } catch (err) {
      console.error('Error fetching farms:', err);
      setError(err.response ? err.response.data.message : err.message);
    }
  };

  // Fetch crop tips
  const fetchTips = async () => {
    try {
      const response = await axios.get(`http:localhost:5001/api/tips`);
      setTipsData(response.data);
    } catch (err) {
      console.error('Error fetching tips:', err);
      setError('Failed to fetch tips');
    }
  };

  // Translate text using the translation API
  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post(`http:localhost:5001/api/translate`, {
        text: text,
        targetLanguage: targetLanguage,
      });

      return response.data.translatedText; // Return the translated text
    } catch (error) {
      console.error("Error translating text:", error);
      return text; // Return the original text if translation fails
    }
  };

  // Translate tips for each crop
  const translateTips = async (matched) => {
    const translated = [];

    for (const item of matched) {
      const translatedTips = await Promise.all(
        item.tips.map(async (tip) => {
          const translatedTip = await translateText(tip, language);
          return translatedTip;
        })
      );

      translated.push({
        ...item,
        tips: translatedTips,
      });
    }

    setTranslatedMatchedTips(translated); // Save the translated tips
  };

  const matchCropsWithTips = () => {
    const matched = [];
    const userFarms = selectedFarm ? [selectedFarm] : farms.filter(farm => farm.owner === userId);

    userFarms.forEach((farm) => {
      const farmCrop = farm.cropName?.toLowerCase();
      tipsData.forEach((tip) => {
        const tipCrop = tip.crop_name?.toLowerCase();
        if (farmCrop && tipCrop && farmCrop === tipCrop) {
          matched.push({ cropName: farm.cropName, tips: tip.tips, farmId: farm._id });
        }
      });
    });

    setMatchedTips(matched);
  };

  useEffect(() => {
    const initialize = async () => {
      try {
        await fetchFarms();
        await fetchTips();
      } catch (err) {
        setError('Failed to initialize data');
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    if ((farms.length > 0 || selectedFarm) && tipsData.length > 0) {
      setMatchedTips([]);  // Clear previous matches
      matchCropsWithTips();
    }
  }, [farms, tipsData, selectedFarm]);

  useEffect(() => {
    if (matchedTips.length > 0) {
      translateTips(matchedTips); // Translate tips when matchedTips or language changes
    }
  }, [matchedTips, language]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {translatedMatchedTips.length > 0 ? (
        translatedMatchedTips.map((item, index) => (
          <div key={index}>
            {/* <h3>Tips for {item.cropName}</h3> */}
            {item.tips.map((tip, idx) => (
              <span key={idx}>{tip}</span>
            ))}
          </div>
        ))
      ) : (
        <p>No matching tips found for your crops.</p>
      )}
    </div>
  );
};

export default MatchingTips;