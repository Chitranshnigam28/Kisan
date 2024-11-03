import React, { useState } from 'react';
import axios from 'axios';
import '../css/translation.css';

const TranslationComponent = () => {
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  // Function to collect all text nodes from the page, excluding buttons and icons
  const getTextNodes = (element) => {
    let textNodes = [];
    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.tagName !== 'BUTTON' && !node.classList.contains('translation-icon')) {
          textNodes = textNodes.concat(getTextNodes(node));
        }
      }
    });
    return textNodes;
  };

  // Handle language change and translation
  const handleLanguageChange = async (language) => {
    try {
      const textNodes = getTextNodes(document.body);
      const textToTranslate = textNodes.map((node) => node.nodeValue).join(' || ');

      const response = await axios.post('http://localhost:5001/api/translate', {
        text: textToTranslate,
        targetLanguage: language,
      });

      const translatedTextArray = response.data.translatedText.split(' || ');
      textNodes.forEach((node, index) => {
        if (translatedTextArray[index]) {
          node.nodeValue = translatedTextArray[index];
        }
      });

      setShowLanguageOptions(false);

      // Reload only when switching back to English to reset layout
      if (language === 'en') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  return (
    <div className='translate'>
      {/* Translation Icon */}
      <div className="translation-icon" onClick={() => setShowLanguageOptions(!showLanguageOptions)}>
        🌐 {/* You can replace this with an actual icon if you have one */}
      </div>

      {/* Language Options */}
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
