import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const MyFarms = () => {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [visibleFarmsCount, setVisibleFarmsCount] = useState(2); // Max number of farms to show initially

    const currentUserId = '66f92acd44f00ac86e5adac1'; // Use a valid user ID for testing

    useEffect(() => {
        const fetchFarms = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmY5MmFjZDQ0ZjAwYWM4NmU1YWRhYzEiLCJlbWFpbCI6InNoaXZhbUZhcm1lckBnbWFpbC5jb20iLCJpc0FkbWluIjpmYWxzZSwiaWF0IjoxNzI5MTI4OTYyLCJleHAiOjE3MzE3MjA5NjJ9.ZQQozXCrna12rq7o8Ex2lubYb15LYVzfJly3UWxaUPk'; // Replace with your actual token
                const response = await axios.get('http://localhost:5001/api/farms', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log('API Response:', response.data); // Log the response data
                setFarms(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFarms();
    }, []);

    const handleDelete = async (farmId) => {
      if (window.confirm('Are you sure you want to delete this farm?')) {
          try {
              await axios.delete(`http://localhost:5001/api/farms/${farmId}`);
              setFarms(farms.filter(farm => farm._id !== farmId));
              alert('Farm deleted successfully!');
          } catch (err) {
              setError(err.response ? err.response.data.message : err.message);
          }
      }
  };

  const userFarms = farms.filter(farm => farm.owner === currentUserId);
  const location = useLocation();

  if (loading) return <p>Loading farms...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
      <div className="myFarmsContainer container my-5">
          <div className="d-flex overflow-auto">
              {(location.pathname === '/' ? userFarms.slice(0, 2) : userFarms).map(farm => (
                  <div className="square-card me-3" key={farm._id}>
                      <div className="card shadow">
                          <div className="card-body d-flex flex-column justify-content-between">
                              <h5 className="card-title">{farm.farmName}</h5>
                              <p className="card-text"><strong>Crop Type:</strong> {farm.cropType}</p>
                              <p className="card-text"><strong>Soil Type:</strong> {farm.soilType}</p>
                              <p className="card-text"><strong>Location:</strong> {farm.location}</p>
                              <p className="card-text"><strong>Size:</strong> {farm.sizeOfFarm} hectares</p>
                              <div className="d-flex justify-content-between mt-2">
                                  <Link to={`/edit-farm/${farm._id}`} className="btn btn-warning me-2">
                                      <FaEdit /> Edit
                                  </Link>
                                  <button
                                      className="btn btn-danger"
                                      onClick={() => handleDelete(farm._id)}
                                  >
                                      <FaTrash /> Delete
                                  </button>
                              </div>
                          </div>
                      </div>
                  </div>
              ))}
              {userFarms.length === 0 && (
                  <div className="col-12 text-center">
                      <p>No farms found.</p>
                  </div>
              )}
          </div>
          {location.pathname === '/' && userFarms.length > 2 && (
              <div className="text-center">
                  <Link to="/my-farms" className="btn btn-primary mt-4">
                      View All Farms
                  </Link>
              </div>
          )}
      </div>
  );
};

export default MyFarms;