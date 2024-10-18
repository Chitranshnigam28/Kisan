import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const MyFarms = ({ userId: propUserId }) => {
    const [farms, setFarms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    const userId = localStorage.getItem('userId');

    useEffect(() => {
        if (!userId) {
            setError('User ID not found');
            setLoading(false);
            return;
        }

        localStorage.setItem('userId', userId);

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

                console.log('Farms data:', response.data);
                setFarms(response.data);
            } catch (err) {
                console.error('Error fetching farms:', err);
                setError(err.response ? err.response.data.message : err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchFarms();
    }, [userId]);

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

    const userFarms = farms.filter(farm => farm.owner === userId);

    if (loading) return <p>Loading farms...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container my-5">

            <div className={location.pathname === '/' ? "d-flex overflow-auto" : "row g-3"}>
                {location.pathname === '/' ? (
                    userFarms.slice(0, 2).map(farm => (
                        <div className="me-3" key={farm._id}>
                            <div className="card border-success shadow" style={{ width: '18rem' }}>
                                <div className="card-header text-white bg-success">
                                    <h5 className="card-title">{farm.farmName}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text"><strong>Crop Type:</strong> {farm.cropType}</p>
                                    <p className="card-text"><strong>Soil Type:</strong> {farm.soilType}</p>
                                    <p className="card-text"><strong>Location:</strong> {farm.location}</p>
                                    <p className="card-text"><strong>Size:</strong> {farm.sizeOfFarm} hectares</p>
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
                    userFarms.map(farm => (
                        <div className="col-md-4" key={farm._id}>
                            <div className="card border-success shadow">
                                <div className="card-header text-white bg-success">
                                    <h5 className="card-title">{farm.farmName}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text"><strong>Crop Type:</strong> {farm.cropType}</p>
                                    <p className="card-text"><strong>Soil Type:</strong> {farm.soilType}</p>
                                    <p className="card-text"><strong>Location:</strong> {farm.location}</p>
                                    <p className="card-text"><strong>Size:</strong> {farm.sizeOfFarm} hectares</p>
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
                )}

                {userFarms.length === 0 && (
                    <div className="col-12 text-center">
                        <p className="text-muted">No farms found.</p>
                    </div>
                )}
            </div>

            {location.pathname === '/' && userFarms.length > 2 && (
                <div className="text-center">
                    <button
                        onClick={() => navigate(`/my-farms?userId=${userId}`)}
                        className="btn btn-success mt-4"
                    >
                        View All Farms
                    </button>
                </div>
            )}
        </div>
    );
};

export default MyFarms;
