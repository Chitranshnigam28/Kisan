import React, { useState } from 'react';
import '../../css/header.css'; 
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ProfileSetup from '../ProfileSetup';
import ChangeLanguage from '../ChangeLanguage';
import TranslationComponent from '../TranslationComponent';
import ChangePassword from '../ChangePassword';

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showChangeLanguage, setShowChangeLanguage] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English'); // State for selected language
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const handleProfileClick = () => {
    setShowProfileForm(true);
    setShowDropdown(false);
  };

  const handleChangeLanguageClick = () => {
    setShowChangeLanguage(true);
    setShowDropdown(false);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
    setShowDropdown(false);
  };

  // Function to handle language selection
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowChangeLanguage(false); // Close language modal after selection
  };

  return (
    <div>
      <header className="header">
        <div className="logo">
          <img src="./logo.png" alt="Kisan Logo" className="logo-image" />
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
              <div className="changePasswordWrapper">
                <img src="./changePassword.png" alt="changePassword" />
                <button onClick={handleChangePasswordClick} className="change-password">
                  Change Password
                </button>
              </div>
              <div className="changeLanguageWrapper">
                <img src="./changeLanguage.png" alt="changeLanguage"/>
                <button onClick={handleChangeLanguageClick} className="change-language">
                  Change Language
                </button>
              </div>
              <div className="helpAndSupportWrapper">
                <img src="./helpAndSupport.png" alt="helpAndSupport"/>
                <button onClick={handleProfileClick} className="helpAndSupport">
                  Help and Support
                </button>
              </div>
              <div className="logoutWrapper">
                <img src="./logout.png" alt="logout"/>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {showProfileForm && (
        <div className="profile-setup-container">
          <ProfileSetup />
          <button 
            onClick={() => setShowProfileForm(false)} 
            className="close-profile-btn"
          >
            Close
          </button>
        </div>
      )}

{/* Show Change Password Modal */}
{showChangePassword && (
        <div className="modal-overlay">
          <div className="modal-content">
            <ChangePassword onClose={() => setShowChangePassword(false)} />
            {/* <button className="close-button" onClick={() => setShowChangePassword(false)}>&times;</button> */}
          </div>
        </div>
      )}

      {showChangeLanguage && (
        <ChangeLanguage onSelectLanguage={handleLanguageSelect} onClose={() => setShowChangeLanguage(false)} />
      )}

      {/* Pass the selected language to the TranslationComponent */}
      {/* <TranslationComponent selectedLanguage={selectedLanguage} /> */}
    </div>
  );
};

export default Header;

// import React, { useState } from 'react';
// import '../../css/header.css'; 
// import { FaBell } from 'react-icons/fa';
// import { FaUserCircle } from 'react-icons/fa'; 
// // import KisanLogo from '../../Assets/Images/logo.jpg';
// import { useNavigate } from 'react-router-dom';
// import ProfileSetup from '../ProfileSetup'; // Import ProfileSetup component

// const Header = () => {
//   const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
//   const [showProfileForm, setShowProfileForm] = useState(false); // State to toggle profile form
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem('token');  // Clear token
//     localStorage.removeItem('userId'); // Clear userId if you're storing it
//     navigate('/login');                // Redirect to login page
//   };

//   const handleProfileClick = () => {
//     setShowProfileForm(true);  // Show the profile setup form
//     setShowDropdown(false);     // Hide the dropdown
//   };

//   return (
//     <div>
//       <header className="header">
//         <div className="logo">
//           <img src="./logo.png" alt="Kisan Logo" className="logo-image" />
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
//               <div className="changePasswordWrapper">
                
//                 <img src="./changePassword.png" alt="changePassword"/>
//                 <button onClick={handleProfileClick} className="change-password">
//                   Change Password
//                 </button>
//               </div>
//               <div className="changeLanguageWrapper">
                
//                 <img src="./changeLanguage.png" alt="changeLanguage"/>
//                 <button onClick={handleProfileClick} className="change-language">
//                   Change Language
//                 </button>
//               </div>
//               <div className="helpAndSupportWrapper">
                
//                 <img src="./helpAndSupport.png" alt="helpAndSupport"/>
//                 <button onClick={handleProfileClick} className="helpAndSupport">
//                 Help and Support
//                 </button>
//               </div>
//               <div className="logoutWrapper">
//                 <img src="./logout.png" alt="logout"/>
//                 <button onClick={handleLogout} className="logout-btn">
//                   Logout
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </header>

//       {/* Show Profile Setup Form when showProfileForm is true */}
//       {showProfileForm && (
//         <div className="profile-setup-container">
//           <ProfileSetup /> {/* Reuse ProfileSetup component */}
//           <button 
//             onClick={() => setShowProfileForm(false)} 
//             className="close-profile-btn"
//           >
//             Close
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;

// // import React, { useState } from 'react';
// // import '../../css/header.css'; 
// // import { FaBell } from 'react-icons/fa';
// // import { FaUserCircle } from 'react-icons/fa'; 
// // import KisanLogo from '../../Assets/Images/logo.jpg';
// // import { useNavigate } from 'react-router-dom';

// // const Header = () => {
// //   const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility
// //   const navigate = useNavigate();

// //   const handleLogout = () => {
// //     localStorage.removeItem('token');  // Clear token
// //     localStorage.removeItem('userId'); // Clear userId if you're storing it
// //     navigate('/login');                // Redirect to login page
// //   };

// //   return (
// //     <div>
// //       <header className="header">
// //         <div className="logo">
// //           <img src={KisanLogo} alt="Kisan Logo" className="logo-image" />
// //         </div>
// //         <div className="header-right">
// //           <div className="notification">
// //             <FaBell className="icon" />
// //             <span className="notification-dot"></span>
// //           </div>
// //           <div className="profile" onClick={() => setShowDropdown(!showDropdown)}>
// //             <FaUserCircle className="icon" />
// //             <span className="profile-arrow">&#x25BC;</span>
// //           </div>
// //           {showDropdown && (
// //             <div className="dropdown">
// //               <button onClick={handleLogout} className="logout-btn">
// //                 Logout
// //               </button>
// //             </div>
// //           )}
// //         </div>
// //       </header>
// //     </div>
// //   );
// // };

// // export default Header;