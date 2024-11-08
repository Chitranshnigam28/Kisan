import React from "react";
import "../../css/emptyFarms.css";
import { Link } from "react-router-dom";

const EmptyFarms = () => {
  return (
    <div className="empty-farms-container">
      <h2 className="empty-farms-title">
        Ready to Get Started?{" "}
        <span role="img" aria-label="sprout">
          🌱
        </span>
      </h2>
      <p className="empty-farms-message">
        It looks like you haven’t added any farms yet. <br />
        Add your farm to start managing it effortlessly.
      </p>
      <Link to="/my-farms">
      <button className="add-farm-button">Add your First Farm</button>
                </Link>
      <div className="hay-bales">
        <div className="hay-bale"></div>
        <div className="hay-bale"></div>
      </div>
    </div>
  );
};

export default EmptyFarms;