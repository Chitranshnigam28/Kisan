import React from "react";
import "../../css/emptyFarms.css";
import { Link } from "react-router-dom";
import farmerVideo from '../../Assets/cropPlanting.mp4';
import { useNavigate } from "react-router-dom";
import EmptyFarmImage from "../../Assets/emptyfarms.webp"
const EmptyFarms = () => {
  const navigate = useNavigate();

  const handleGotoFarm = ()=>{
    navigate('/my-farms')
  }
  return (
    <div className="empty-farms-container">
      <h4 className="empty-farms-title">
        Ready To Get Started!
        <span role="img" aria-label="sprout" className="sprout-icon">
          🌱
        </span>
      </h4>
      <p className="empty-farms-message">
        It seems like your farm journey is just beginning. <br />
        Start by adding your first farm and watch it flourish!
      </p>
      <Link to="/my-farms" className="addNewEmptyFarmLink">
        <button className="add-farm-button" onClick={handleGotoFarm}>Add Your First Farm</button>
      </Link>
      <img src={EmptyFarmImage} alt="Empty Farm Image" className="emptyFarm-image" />
    </div>
  );
};

export default EmptyFarms;