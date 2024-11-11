import React from "react";
import "../../css/emptyFarms.css";
import { Link } from "react-router-dom";
import farmerVideo from '../../Assets/cropPlanting.mp4';
import { useNavigate } from "react-router-dom";
const EmptyFarms = () => {
  const navigate = useNavigate();

  const handleGotoFarm = ()=>{
    navigate('/my-farms')
  }
  return (
    <div className="empty-farms-container">
      <h2 className="empty-farms-title">
        Let’s Grow Together!{" "}
        <span role="img" aria-label="sprout" className="sprout-icon">
          🌱
        </span>
      </h2>
      <p className="empty-farms-message">
        It seems like your farm journey is just beginning. <br />
        Start by adding your first farm and watch it flourish!
      </p>
      <Link to="/my-farms">
        <button className="add-farm-button" onClick={handleGotoFarm}>Add Your First Farm</button>
      </Link>
      <div className="farmer-animation">
        <video
          src={farmerVideo}
          autoPlay
          loop
          muted
          className="background-video"
        ></video>
      </div>
    </div>
  );
};

export default EmptyFarms;
