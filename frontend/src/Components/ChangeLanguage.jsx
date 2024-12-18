import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/changeLanguage.css';

const ChangeLanguage = ({ onSelectLanguage, onClose }) => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');
  const [originalContent, setOriginalContent] = useState({});

  // Function to collect all text nodes, excluding buttons/icons
  const getTextNodes = (element) => {
    let textNodes = [];
    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName !== 'BUTTON' && !node.classList.contains('translation-icon')) {
        textNodes = textNodes.concat(getTextNodes(node));
      }
    });
    return textNodes;
  };

  // Save original content before translation
  const saveOriginalContent = () => {
    const textNodes = getTextNodes(document.body);
    const originalContentMap = {};
    textNodes.forEach((node, index) => {
      originalContentMap[index] = node.nodeValue;
    });
    setOriginalContent(originalContentMap);
  };

  // Translate and replace text on page
  const handleLanguageChange = async (language) => {
    if (currentLanguage === 'en') saveOriginalContent();
    
    localStorage.setItem('language', language);
    setCurrentLanguage(language);

    if (currentLanguage !== language) {
      window.location.reload();
    }
  };

  // Apply translation on language change
  useEffect(() => {
    if (currentLanguage !== 'en') {
      const applyTranslation = async () => {
        const textNodes = getTextNodes(document.body);
        const textToTranslate = textNodes.map((node) => node.nodeValue).join(' || ');

        try {
          const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/translate`, {
            text: textToTranslate,
            targetLanguage: currentLanguage,
          });
          console.log(response)

          const translatedTextArray = response.data.translatedText.split(' || ');
          textNodes.forEach((node, index) => {
            if (translatedTextArray[index]) {
              node.nodeValue = translatedTextArray[index];
            }
          });
        } catch (error) {
          console.error('Translation error:', error);
        }
      };
      applyTranslation();
    }
  }, [currentLanguage]);

  const languages = [
    { language: 'en', icon: "./languages/A.png" },
    { language: 'hi', icon: "./languages/Hindi.png" },
    { language: 'pa', icon: "./languages/Punjabi.png" },
    { language: 'bg', icon: "./languages/Bengali.png" },
    { language: 'tu', icon: "./languages/Telugu.png" },
    { language: 'tm', icon: "./languages/Tamil.png" },
    { language: 'gj', icon: "./languages/gujrati.png" },
    { language: 'ka', icon: "./languages/kannada.png" },
    { language: 'my', icon: "./languages/Malayalam.png" },
    { language: 'tm', icon: "./languages/Tamil.png" },
    { language: 'ur', icon: "./languages/Urdu.png" },
  ];

  return (
    <div className="change-language-overlay">
      <div className="change-language-modal">
        <h4>Choose your language</h4>
        <div className="language-options">
          {languages.map((lang) => (
            <div className="languageWrapper" key={lang.language}>
              <button
                className="language-option"
                onClick={() => handleLanguageChange(lang.language.toLowerCase())}
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
