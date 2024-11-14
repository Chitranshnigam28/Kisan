import React from 'react';
import { useNavigate } from 'react-router-dom';
import './../../css/firstPage.css'
import bgImage from './../../Assets/bg.webp'

const FirstPage = ({ imageUrl }) => {
    const navigate = useNavigate();

    const handleSetupClick = () => {
        navigate('/second'); 
    };

    const handleSetupLaterClick = () => {
        navigate('/');
    };

    return (
        <div className="welcome-container">
            <div className="welcome-content">
                <h1>Welcome to Kisan</h1>
                <p>
                    We're excited to have you on board! Let’s get your farms set up to start receiving recommendations and insights.
                </p>
                <img src= {bgImage} alt="Farm illustration" className="welcome-image" />
                
                <div className="button-container">
                    <button className="main-Btn" onClick={handleSetupClick}>Set up your farms →</button>
                    <button className="setup-later-btn" onClick={handleSetupLaterClick}>I'll set up later</button>
                </div>
            </div>
        </div>
    );
};

export default FirstPage;
