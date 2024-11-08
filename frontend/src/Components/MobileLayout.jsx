import React from 'react';
import logo from '../Assets/loginpagelogo.png';
import logoVideo from '../Assets/logoVideo.mp4';
import '../css/mobileLayout.css';

const MobileLayout = ({ handleContinue }) => {
  return (
    <div className="mobile-login">
      <video src={logoVideo} autoPlay loop muted className="background-video"></video>
      <div className="logo-and-button">
        <img src={logo} className="logo" alt="Logo" />
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default MobileLayout;
