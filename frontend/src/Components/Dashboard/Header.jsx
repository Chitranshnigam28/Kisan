import React, { useState } from 'react';
import '../../css/header.css'; 
import { FaBell, FaUserCircle } from 'react-icons/fa';
import KisanLogo from '../../Assets/Images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import ProfileSetup from '../ProfileSetup'; // Import ProfileSetup component

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);   // Toggle dropdown visibility
  const [dropdownView, setDropdownView] = useState('menu');  // 'menu' or 'profile'
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token
    localStorage.removeItem('userId'); // Clear userId if you're storing it
    navigate('/login');                // Redirect to login page
  };

  const handleProfileClick = () => {
    setDropdownView('profile');  // Switch to profile setup view
  };

  const handleBackClick = () => {
    setDropdownView('menu');     // Return to main menu view without closing the dropdown
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setDropdownView('menu');     // Reset to menu view each time dropdown is opened
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
          <div className="profile" onClick={toggleDropdown}>
            <FaUserCircle className="icon" />
            <span className="profile-arrow">&#x25BC;</span>
          </div>
          
          {showDropdown && (
            <div className={`dropdown ${showDropdown ? 'show' : ''}`}  style={{ width: dropdownView === 'menu' ? '12%' : '21%' }}>
              {dropdownView === 'menu' ? (
                // Main dropdown menu with Personal Information and Logout
                <>
                  <button onClick={handleProfileClick} className="profile-btn">
                    Personal Information
                  </button>
                  <button onClick={handleLogout} className="logout-btn">
                    Logout
                  </button>
                </>
              ) : (
                // Profile setup view with Back button in the same dropdown
                <div className="profile-setup-view">
                  <button onClick={handleBackClick} className="back-btn">Back</button>
                  <ProfileSetup /> {/* Render ProfileSetup inside the dropdown */}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Header;