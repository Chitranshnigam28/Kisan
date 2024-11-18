import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/translation.css';

const TranslationComponent = () => {
  const [originalContent, setOriginalContent] = useState({});
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');

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

  // Save original content
  const saveOriginalContent = () => {
    const textNodes = getTextNodes(document.body);
    const originalContentMap = {};
    textNodes.forEach((node, index) => {
      originalContentMap[index] = node.nodeValue;
    });
    setOriginalContent(originalContentMap);
  };

  // Translate and replace text without modifying layout
  const handleLanguageChange = async (language) => {
    if (currentLanguage === 'en') saveOriginalContent();

    localStorage.setItem('language', language); 
    setShowLanguageOptions(false);

    if (currentLanguage !== language) {
      window.location.reload(); 
    }
  };

  // Apply saved language on page load
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

  return (
    <div className='translate'>
      <div
        className="translation-icon"
        style={{ fontSize: '3rem', position: 'fixed', bottom: '20px', right: '20px', cursor: 'pointer' }}
        onClick={() => setShowLanguageOptions(!showLanguageOptions)}
      >
        🌐
      </div>

      {showLanguageOptions && (
        <div className='button-Separation'>
          <button onClick={() => handleLanguageChange('en')}>English (अंग्रेज़ी)</button>
          <button onClick={() => handleLanguageChange('hi')}>Hindi (हिन्दी)</button>
          <button onClick={() => handleLanguageChange('pa')}>Punjabi (ਪੰਜਾਬੀ)</button>
        </div>
      )}
    </div>
  );
};

export default TranslationComponent;