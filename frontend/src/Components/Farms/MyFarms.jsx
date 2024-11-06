import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MatchingTips, { deleteMyTips } from "../MatchingTips";
import farmImage from "../../Assets/Images/farm.jpg";
import MyFarmsSvg from "../../Assets/Logo/Myfarm.svg";
import '../../css/main.css';
import { IoIosAddCircleOutline } from "react-icons/io"; 
import { MdOutlineCancel } from "react-icons/md"; 
import AddFarms from "./AddFarms"; 
import { IoMdArrowBack } from "react-icons/io";

const MyFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [matchedTips, setMatchedTips] = useState([]);
  const [showAddFarm, setShowAddFarm] = useState(false);
  const [priceData, setPriceData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
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

  useEffect(() => {
    const loadPriceData = async () => {
      if (selectedFarm) {
        try {
          const response = await axios.get("http://localhost:5001/api/historical-price", {
            params: {
              crop_name: selectedFarm.cropName,
              last_crop_sowed: selectedFarm.last_crop_sowed,
            },
          });

          console.log("API Response:", response.data);
          setPriceData(response.data.crops);
        } catch (error) {
          console.error("Error fetching historical price data:", error);
          setError("Failed to load historical price data.");
        }
      } else {
        console.log("No selected farm");
      }
    };

    loadPriceData();
  }, [selectedFarm]);

  const placeholderData = [
    {
      crop_name: "Loading...",
      months: ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024", "Jul 2024", "Sept 2024", "Oct 2024"],
      prices: [0, 0, 0, 0, 0, 0, 0, 0, 0]
    }
  ];

  const chartOptions = {
    series: priceData || loading
      ? [
        {
          name: priceData ? priceData[0].crop_name : placeholderData[0].crop_name,
          data: priceData ? priceData[0].prices : placeholderData[0].prices,
        },
        {
          name: priceData ? priceData[1].crop_name : placeholderData[0].crop_name,
          data: priceData ? priceData[1].prices : placeholderData[0].prices,
        },
      ]
      : [],
    options: {
      chart: {
        type: "area",
        height: 350,
      },
      xaxis: {
        categories: priceData ? priceData[0].months : placeholderData[0].months,
        title: {
          text: "Months",
        },
      },
      yaxis: {
        title: {
          text: "Price (INR per kg)",
        },
      },
      stroke: {
        curve: "smooth",
      },
      tooltip: {
        x: {
          format: "MMM YYYY",
        },
      },
      fill: {
        opacity: 0.5,
      },
      colors: ["#008FFB", "#FEB019"],
    },
  };


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

      {showAddFarm ? (
        <AddFarms />
      ) : (
        <div className={location.pathname === "/" ? "d-flex overflow-auto" : "row g-3"}>
          {location.pathname === "/" ? (
            farms.map((farm) => (
              <div className="me-3" key={farm._id}>
                <div className="card shadow farm-card" style={{ width: "18rem" }}>
                  <img src={farmImage} alt={farm.farmName} className="card-img-top rounded-top" />
                  <div className="card-body">
                    <div className="farm-details">
                      <h5 className="farm-name">{farm.farmName}</h5>
                      <p className="farm-size">{farm.sizeOfFarm} HA</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <>
              <div className="row g-3">
                <MatchingTips matchedTips={matchedTips} setMatchedTips={setMatchedTips} />

                {farms.map((farm) => (
                  <div className="col-md-4" key={farm._id} onClick={() => setSelectedFarm(farm)}>
                    <div className="card border-success shadow">
                      <div className="card-header text-white bg-success">
                        <h5 className="card-title">{farm.farmName}</h5>
                      </div>
                      <div className="card-body">
                        <p className="card-text">
                          <strong>Size:</strong> {farm.sizeOfFarm} HA
                        </p>
                        <div className="d-flex justify-content-between mt-3">
                          <Link to={`/edit-farm/${farm._id}`} className="btn btn-outline-warning me-2">
                            <FaEdit /> Edit
                          </Link>
                          <button className="btn btn-outline-danger" onClick={() => handleDelete(farm._id)}>
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
                    <span>
                      <strong>{selectedFarm.sizeOfFarm} HA</strong> .
                    </span>
                    <span>
                      <strong>{new Date(selectedFarm.dateOfPlanting).toLocaleDateString()} Date Of Planting</strong>
                    </span>
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
                  <button onClick={() => navigate(`/my-farms?userId=${userId}`)} className="btn btn-success mt-4">
                    View All Farms
                  </button>
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
                  <IoMdArrowBack className="back-icon" />
                  Go Back
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