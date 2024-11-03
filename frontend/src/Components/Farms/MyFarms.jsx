import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import MatchingTips, { deleteMyTips } from "../MatchingTips";
import farmImage from "../../Assets/Images/farm.jpg";
import MyFarmsSvg from "../../Assets/Logo/Myfarm.svg"
import '../../css/main.css'
// import MatchingTips from "../MatchingTips";

const MyFarms = () => {
  const [farms, setFarms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [matchedTips, setMatchedTips] = useState([]); // State for matched tips
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

    // Fetch farms initially and set an interval for polling
    fetchFarms();
    const intervalId = setInterval(fetchFarms, 1000); // Poll every 5 seconds

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, [userId, location.pathname]);

  const handleDelete = async (farmId) => {
    try {
      await deleteMyTips(farmId); // Call deleteMyTips
      setFarms((prevFarms) => prevFarms.filter((farm) => farm._id !== farmId)); // Update state after deletion

      // Remove the corresponding matched tips
      setMatchedTips((prevTips) => prevTips.filter((tip) => tip.farmId !== farmId));
    } catch (err) {
      console.error("Error deleting farm:", err);
      alert("Failed to delete farm: " + err.message);
    }
  };

  if (loading) return <p>Loading farms...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container my-5">
      <div className="MyFarmsHeading">
        <h4>
          <img src={MyFarmsSvg} alt="My Farm" style={{ width: '40px', height: '40px' }} />
          My Farms
        </h4>
      </div>
      <div
        className={
          location.pathname === "/" ? "d-flex overflow-auto" : "row g-3"
        }
      >
        {location.pathname === "/" ? (
          farms.slice(0, 3).map((farm) => (
            <div className="me-3" key={farm._id}>

              <div className="card border-success shadow farm-card" style={{ width: "18rem" }}>
                <img
                  src={farmImage}
                  alt={farm.farmName}
                  className="card-img-top rounded-top"
                />
                <div className="card-body">
                  {/* Farm Name and Size in Separate Halves */}
                  <div className="farm-details">
                    <h5 className="farm-name">{farm.farmName}</h5>
                    <p className="farm-size">
                      <strong>Size:</strong> {farm.sizeOfFarm} HA
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <>
            <div className="row g-3">
              {farms.map((farm) => (
                <div
                  className="col-md-4"
                  key={farm._id}
                  onClick={() => setSelectedFarm(farm)}
                >
                  <div className="card border-success shadow">
                    <MatchingTips matchedTips={matchedTips} setMatchedTips={setMatchedTips} />
                    <div className="card-header text-white bg-success">
                      <h5 className="card-title">{farm.farmName}</h5>
                    </div>
                    <div className="card-body">
                      <p className="card-text">
                        <strong>Size:</strong> {farm.sizeOfFarm} HA
                      </p>
                      <div className="d-flex justify-content-between mt-3">
                        <Link
                          to={`/edit-farm/${farm._id}`}
                          className="btn btn-outline-warning me-2"
                        >
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
                  <span>
                    <strong>{selectedFarm.sizeOfFarm} HA</strong> .
                  </span>
                  <span>
                    <strong>
                      {new Date(
                        selectedFarm.dateOfPlanting
                      ).toLocaleDateString()}{" "}
                      Date Of Planting
                    </strong>
                  </span>
                </div>
                <br />
                <div>
                  <p>
                    <strong>Soil:</strong> {selectedFarm.soilType}
                  </p>
                  <p>
                    <strong>Water Source:</strong> {selectedFarm.waterSource}
                  </p>
                  <p>
                    <strong>Farming Method:</strong>{" "}
                    {selectedFarm.farmingMethod}
                  </p>
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
};
export default MyFarms;
