import React, { useState } from 'react';
import '../../css/header.css'; 
import { FaBell } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa'; 
import KisanLogo from '../../Assets/Images/logo.jpg';
import { useNavigate } from 'react-router-dom';
import ProfileSetup from '../ProfileSetup'; // Import ProfileSetup component

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
  const [showProfileForm, setShowProfileForm] = useState(false); // State to toggle profile form
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token
    localStorage.removeItem('userId'); // Clear userId if you're storing it
    navigate('/login');                // Redirect to login page
  };

  const handleProfileClick = () => {
    setShowProfileForm(true);  // Show the profile setup form
    setShowDropdown(false);     // Hide the dropdown
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
              <button onClick={handleProfileClick} className="profile-btn">
                Personal Information
              </button>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Show Profile Setup Form when showProfileForm is true */}
      {showProfileForm && (
        <div className="profile-setup-container">
          <ProfileSetup /> {/* Reuse ProfileSetup component */}
          <button 
            onClick={() => setShowProfileForm(false)} 
            className="close-profile-btn"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;

// import React, { useState } from 'react';
// import '../../css/header.css'; 
// import { FaBell } from 'react-icons/fa';
// import { FaUserCircle } from 'react-icons/fa'; 
// import KisanLogo from '../../Assets/Images/logo.jpg';
// import { useNavigate } from 'react-router-dom';

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');  // Clear token
//     localStorage.removeItem('userId'); // Clear userId if you're storing it
//     navigate('/login');                // Redirect to login page
//   };

//   return (
//     <div>
//       <header className="header">
//         <div className="logo">
//           <img src={KisanLogo} alt="Kisan Logo" className="logo-image" />
//         </div>
//         <div className="header-right">
//           <div className="notification">
//             <FaBell className="icon" />
//             <span className="notification-dot"></span>
//           </div>
//           <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
//             <FaUserCircle className="icon" />
//             <span className="profile-arrow">&#x25BC;</span>
//           </div>
//           {showDropdown && (
//             <div className="dropdown">
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             </div>
//           )}
//         </div>
//       </header>
//     </div>
//   );
// };

// export default Header;