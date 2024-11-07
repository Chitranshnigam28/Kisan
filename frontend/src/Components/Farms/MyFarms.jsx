import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MatchingTips, { deleteMyTips } from "../MatchingTips";
import farmImage from "../../Assets/Images/farm.jpg";
import MyFarmsSvg from "../../Assets/Logo/Myfarm.svg";
import '../../css/myFarms.css';
import { IoIosAddCircleOutline } from "react-icons/io";
import { MdOutlineCancel } from "react-icons/md";
import AddFarms from "./AddFarms";
import { IoMdArrowBack } from "react-icons/io";
import { MdDelete } from "react-icons/md";

const MyFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [matchedTips, setMatchedTips] = useState([]);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  
  useEffect(() => {
    if (!userId) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    const fetchFarms = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Token not found");
          setLoading(false);
          return;
        }

        const response = await axios.get("http://localhost:5001/api/farms", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const userFarms = response.data.filter((farm) => farm.owner === userId);
        setFarms(userFarms);

        if (userFarms.length > 0 && location.pathname === "/my-farms") {
          setSelectedFarm(userFarms[0]);
        }
      } catch (err) {
        console.error("Error fetching farms:", err);
        setError(err.response ? err.response.data.message : err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFarms();
    const intervalId = setInterval(fetchFarms, 1000);

    return () => clearInterval(intervalId);
  }, [userId, location.pathname]);

  const handleDelete = async (farmId) => {
    try {
      await deleteMyTips(farmId);
      setFarms((prevFarms) => prevFarms.filter((farm) => farm._id !== farmId));
      setMatchedTips((prevTips) => prevTips.filter((tip) => tip.farmId !== farmId));
    } catch (err) {
      console.error("Error deleting farm:", err);
      alert("Failed to delete farm: " + err.message);
    }
  };

  if (loading) return <p>Loading farms...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <div className="container">
      <div className="MyFarmsHeading">
        <h4>
          <img src={MyFarmsSvg} alt="My Farm" style={{ width: '40px', height: '40px' }} />
          My Farms
        </h4>


        {location.pathname === "/my-farms" && (
          showAddFarm ? (
            <MdOutlineCancel
              className="add-icon"
              onClick={() => setShowAddFarm(false)}
              style={{ fontSize: '1.5em', cursor: 'pointer', marginLeft: '10px', color: 'black' }}
            />
          ) : (
            <IoIosAddCircleOutline
              className="add-icon"
              onClick={() => setShowAddFarm(true)}
              style={{ fontSize: '1.5em', cursor: 'pointer', marginLeft: '10px', color: 'black' }}
            />
          )
        )}
      </div>
      <h5 className="h5">Track crops, monitor soil, and get personalized insigh</h5>

      {showAddFarm ? (
        <AddFarms />
      ) : (
        <div className={location.pathname === "/" ? "d-flex overflow-auto" : "row g-3"}>
          {location.pathname === "/" ? (
            farms.map((farm) => (
              <div className="col-md-4" key={farm._id} onClick={() => setSelectedFarm(farm)}>
                <div className="card shadow farm-card">
                  <img src={farmImage} alt={farm.farmName} className="card-img-top rounded-top" />
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex flex-column">
                        <h5 className="card-title mb-0">{farm.farmName}</h5>
                        <p className="card-text mb-0"><strong>Size:</strong> {farm.sizeOfFarm} HA</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            ))
          ) : (
            <>
              <div className="overflow-x-auto">
                <div className="flex gap-3">
                  {farms.map((farm) => (
                    <div className="flex-none w-64" key={farm._id} onClick={() => setSelectedFarm(farm)}>
                      <div className="card shadow farm-card">
                        <img src={farmImage} alt={farm.farmName} className="card-img-top rounded-top" />
                        <div className="card-header d-flex justify-content-between align-items-center">
                          <div className="d-flex flex-column">
                            <h5 className="card-title mb-0">{farm.farmName}</h5>
                            <p className="card-text mb-0"><strong>Size:</strong> {farm.sizeOfFarm} HA</p>
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
              </div>


              {selectedFarm && (
                <div className="selected-farm mt-5 p-4 border border-success">
                  <h3>{selectedFarm.farmName}</h3>
                  <div>
                    <span>
                      <strong>{selectedFarm.sizeOfFarm} HA</strong> .
                    </span>

                  </div>
                  <br />
                  <div className="totalBox">
                    <div className="soilBox">
                      <h2>🏜️</h2>
                      <p><strong>Soil:</strong> {selectedFarm.soilType}</p>
                    </div>
                    <div className="waterBox">
                      <h2>💧</h2>
                      <p><strong>Water Source:</strong> {selectedFarm.waterSource}</p>
                    </div>
                    <div className="farmBox">
                      <h2>🚜</h2>
                      <p><strong>Farming Method:</strong> {selectedFarm.farmingMethod}</p>
                    </div>
                  </div>
                  <div className="tipsBox">
                    <h1>💡</h1>
                    <MatchingTips matchedTips={matchedTips} setMatchedTips={setMatchedTips} />
                  </div>
                </div>
              )}

              {
                priceData && priceData.length >= 2 && (
                  <div id="chart" style={{ marginTop: "20px" }}>
                    {loading ? (
                      <p>Loading data...</p>
                    ) : error ? (
                      <p>{error}</p>
                    ) : (
                      <Chart
                        options={chartOptions.options}
                        series={chartOptions.series}
                        type="area"
                        height={350}
                      />
                    )}
                  </div>
                )}

              <div className="d-flex justify-content-center align-items-center vh-50">
                <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
                  Back
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MyFarms;