import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MatchingTips from '../MatchingTips';

const MyFarms = () => {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('User ID not found');
            setLoading(false);
            return;
        }

        const fetchFarms = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setError('Token not found');
                    setLoading(false);
                    return;
                }

                const response = await axios.get('http://localhost:5001/api/farms', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                // Filter farms to include only those owned by the user
                const userFarms = response.data.filter(farm => farm.owner === userId);
                setFarms(userFarms);

                // Set the first selected farm if on the my-farms page
                if (userFarms.length > 0 && location.pathname === '/my-farms') {
                    setSelectedFarm(userFarms[0]);
                }
            } catch (err) {
                console.error('Error fetching farms:', err);
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFarms();
    }, [userId, location.pathname]);

    const handleDelete = async (farmId) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`http://localhost:5001/api/farms/${farmId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFarms(farms.filter(farm => farm._id !== farmId));
        } catch (err) {
            console.error("Error deleting farm:", err.response ? err.response.data : err.message);
            alert(`Failed to delete farm: ${err.response ? err.response.data.message : err.message}`);
        }
    };

    if (loading) return <p>Loading farms...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container my-5">
            <MatchingTips />
    
            <div className={location.pathname === '/' ? "d-flex overflow-auto" : "row g-3"}>
                {location.pathname === '/' ? (
                    farms.slice(0, 2).map(farm => ( // Using `farms` instead of `userFarms`
                        <div className="me-3" key={farm._id}>
                            <div className="card border-success shadow" style={{ width: '18rem' }}>
                                <div className="card-header text-white bg-success">
                                    <h5 className="card-title">{farm.farmName}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text"><strong>Size:</strong> {farm.sizeOfFarm} HA</p>
                                    <div className="d-flex justify-content-between mt-3">
                                        <Link to={`/edit-farm/${farm._id}`} className="btn btn-outline-warning me-2">
                                            <FaEdit /> Edit
                                        </Link>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(farm._id)}
                                        >
                                            <FaTrash /> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <>
                        <div className="row g-3">
                            {farms.map(farm => (
                                <div className="col-md-4" key={farm._id} onClick={() => setSelectedFarm(farm)}>
                                    <div className="card border-success shadow">
                                        <div className="card-header text-white bg-success">
                                            <h5 className="card-title">{farm.farmName}</h5>
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text"><strong>Size:</strong> {farm.sizeOfFarm} HA</p>
                                            <div className="d-flex justify-content-between mt-3">
                                                <Link to={`/edit-farm/${farm._id}`} className="btn btn-outline-warning me-2">
                                                    <FaEdit /> Edit
                                                </Link>
                                                <button
                                                    className="btn btn-outline-danger"
                                                    onClick={() => handleDelete(farm._id)}
                                                >
                                                    <FaTrash /> Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
    
                            {farms.length === 0 && (
                                <div className="col-12 text-center">
                                    <p className="text-muted">No farms found.</p>
                                </div>
                            )}
                        </div>
    
                        {selectedFarm && (
                            <div className="selected-farm mt-5 p-4 border border-success">
                                <h3>{selectedFarm.farmName}</h3>
                                <div>
                                    <span><strong>{selectedFarm.sizeOfFarm} HA</strong> . </span>
                                    <span><strong>Date Of Planting: {new Date(selectedFarm.dateOfPlanting).toLocaleDateString()}</strong></span>
                                </div>
                                <br />
                                <div>
                                    <p><strong>Soil:</strong> {selectedFarm.soilType}</p>
                                    <p><strong>Water Source:</strong> {selectedFarm.waterSource}</p>
                                    <p><strong>Farming Method:</strong> {selectedFarm.farmingMethod}</p>
                                </div>
                            </div>
                        )}
    
                        {farms.length > 2 && (
                            <div className="text-center">
                                <button
                                    onClick={() => navigate(`/my-farms?userId=${userId}`)}
                                    className="btn btn-success mt-4"
                                >
                                    View All Farms
                                </button>
                            </div>
                        )}
    
                        <div className="d-flex justify-content-center align-items-center vh-50">
                            <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
                                Go Back
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}    
export default MyFarms;
