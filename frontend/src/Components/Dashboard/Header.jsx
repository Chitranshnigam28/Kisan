import React, { useState } from 'react';
import '../../css/header.css'; 
import { FaBell } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa'; 
import KisanLogo from '../../Assets/Images/logo.jpg';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  
    localStorage.removeItem('userId'); 
    navigate('/login');               
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src={KisanLogo} alt="Kisan Logo" className="logo-image" />
        </div>
        <div className="header-right">
          <div className="notification">
            <FaBell className="icon" />
            <span className="notification-dot"></span>
          </div>
          <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
            <FaUserCircle className="icon" />
            <span className="profile-arrow">&#x25BC;</span>
          </div>
          {showDropdown && (
            <div className="dropdown">
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;