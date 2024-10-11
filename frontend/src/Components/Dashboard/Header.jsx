import React from 'react'
import '../../css/header.css'; 
import { FaBell } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa'; 
import KisanLogo from '../../Assets/Images/logo.jpg'


const Header = () => {
  return (
    <div>
       <header className="header">
      <div className="logo">
        <img src={KisanLogo} alt="Kisan Logo" className="logo-image" />
      </div>
      <div className="header-right">
        <div className="notification">
          <FaBell className="icon" />
          {/* Notification dot */}
          <span className="notification-dot"></span>
        </div>
        <div className="profile">
          <FaUserCircle className="icon" />
          <span className="profile-arrow">&#x25BC;</span>
        </div>
      </div>
    </header>
    </div>
  )
}

export default Header
