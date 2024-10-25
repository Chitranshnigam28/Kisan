import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MatchingTips = () => {
  const [farms, setFarms] = useState([]);
  const [tipsData, setTipsData] = useState([]);
  const [matchedTips, setMatchedTips] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Get the user ID from localStorage
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID is undefined');
  } else {
    console.log(userId, "matching tips section --------");
  }

  // Fetch user's farms
  const fetchFarms = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.get('http://localhost:5001/api/farms', {
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
      const response = await axios.get('http://localhost:5001/api/tips');
      setTipsData(response.data);
    } catch (err) {
      console.error('Error fetching tips:', err);
      setError('Failed to fetch tips');
    }
  };

  // Match the user's farms with tips based on crop names
  const matchCropsWithTips = () => {
    const matched = [];

    // Filter farms based on current user
    const userFarms = farms.filter(farm => farm.owner === userId);
    console.log('User farms:', userFarms);

    userFarms.forEach((farm) => {
      const farmCrop = farm.cropName?.toLowerCase(); // Assuming farm has cropName
      tipsData.forEach((tip) => {
        const tipCrop = tip.crop_name?.toLowerCase(); // Assuming tip has crop_name
        if (farmCrop && tipCrop && farmCrop === tipCrop) {
          matched.push({ cropName: farm.cropName, tips: tip.tips });
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
    if (farms.length > 0 && tipsData.length > 0) {
      matchCropsWithTips();
    }
  }, [farms, tipsData]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {matchedTips.length > 0 ? (
        matchedTips.map((item, index) => (
          <div key={index}>
            <h3>Tips for {item.cropName}</h3>
            {item.tips.map((tip, idx) => (
              <p key={idx}>{tip}</p>
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
