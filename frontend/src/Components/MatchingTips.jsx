import React, { useEffect, useState } from 'react';
import axios from 'axios';


// export const deleteMyTips = async (farmId) => {
//   try {
//     const token = localStorage.getItem('token');
//     await axios.delete(`http://localhost:5001/api/farms/${farmId}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     // Update farms and matched tips after deletion
//     setFarms(prevFarms => prevFarms.filter(farm => farm._id !== farmId));
//     setMatchedTips(prevTips => prevTips.filter(tip => tip.farmId !== farmId));
//   } catch (err) {
//     console.error('Error deleting farm:', err);
//     setError('Failed to delete farm');
//   }
// };


export const deleteMyTips = async (farmId) => {
  const token = localStorage.getItem('token');
  try {
    await axios.delete(`http://localhost:5001/api/farms/${farmId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    console.error('Error deleting farm:', err);
    throw new Error('Failed to delete farm'); // Throw error for handling in MyFarms
  }
};

const MatchingTips = ({ matchedTips, setMatchedTips }) => {
  const [farms, setFarms] = useState([]);
  const [tipsData, setTipsData] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Get the user ID from localStorage
  const userId = localStorage.getItem('userId');
  if (!userId) {
    throw new Error('User ID is undefined');
  } else {
    // console.log(userId, "matching tips section --------");
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

  const matchCropsWithTips = () => {
    const matched = [];
    const userFarms = farms.filter(farm => farm.owner === userId);

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