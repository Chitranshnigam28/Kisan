// // ChangeLanguage.js
// import React from 'react';
// import '../css/changeLanguage.css';

// const ChangeLanguage = ({ onSelectLanguage, onClose }) => {
//   const languages = [
//     {language:'English',icon:"./languages/A.png"},{language: 'Hindi',icon:"./languages/Hindi.png"}, 
//     {language:'Bengali',icon:"./languages/Bengali.png"},
//     {language:'Telugu',icon:"./languages/Telugu.png"},
//     {language:'Marathi', icon:"./languages/Hindi.png"},
//     {language:'Tamil',icon:"./languages/Tamil.png"},
//     {language:'Gujarati',icon:"./languages/gujrati.png"},
//     {language:'Kannada',icon:"./languages/kannada.png"},
//     {language:'Malayalam',icon:"./languages/Malayalam.png"},
//     {language:'Punjabi',icon:"./languages/Punjabi.png"},
//     {language:'Urdu',icon:"./languages/Urdu.png"}
//   ];

//   return (
//     <div className="change-language-overlay">
//       <div className="change-language-modal">
//         <h4>Choose your language</h4>
//         <div className="language-options">
//           {languages.map(language => (
//             <div className="languageWrapper">
              
//               <button
//                 key={language.language}
//                 className="language-option"
//                 onClick={() => onSelectLanguage(language)} // Call onSelectLanguage
//               >
//                 <img src={language.icon}/>
//                 {language.language}
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//         <button onClick={onClose} className="close-button">X</button>
//     </div>
//   );
// };

// export default ChangeLanguage;

import React from 'react';
import '../css/changeLanguage.css';

const ChangeLanguage = ({ onSelectLanguage, onClose }) => {
  const languages = [
    { language: 'English', icon: "./languages/A.png" },
    { language: 'Hindi', icon: "./languages/Hindi.png" },
    { language: 'Bengali', icon: "./languages/Bengali.png" },
    { language: 'Telugu', icon: "./languages/Telugu.png" },
    { language: 'Marathi', icon: "./languages/Hindi.png" },
    { language: 'Tamil', icon: "./languages/Tamil.png" },
    { language: 'Gujarati', icon: "./languages/gujrati.png" },
    { language: 'Kannada', icon: "./languages/kannada.png" },
    { language: 'Malayalam', icon: "./languages/Malayalam.png" },
    { language: 'Punjabi', icon: "./languages/Punjabi.png" },
    { language: 'Urdu', icon: "./languages/Urdu.png" },
  ];

  return (
    <div className="change-language-overlay">
      <div className="change-language-modal">
        <h4>Choose your language</h4>
        <div className="language-options">
          {languages.map(lang => (
            <div className="languageWrapper" key={lang.language}>
              <button
                className="language-option"
                onClick={() => onSelectLanguage(lang.language)}
              >
                <img src={lang.icon} alt={lang.language} />
                {lang.language}
              </button>
            </div>
          ))}
        </div>
      </div>
      <button onClick={onClose} className="close-button">X</button>
    </div>
  );
};

export default ChangeLanguage;