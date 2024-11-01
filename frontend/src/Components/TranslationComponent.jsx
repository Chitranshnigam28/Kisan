import React, { useState } from 'react';
import axios from 'axios';
import '../css/translation.css';

const TranslationComponent = () => {
  const [originalContent, setOriginalContent] = useState({});
  const [showLanguageOptions, setShowLanguageOptions] = useState(false); // State to show/hide language options
  const [isTranslated, setIsTranslated] = useState(false);

  // Function to collect all text nodes from the page, excluding buttons and icons
  const getTextNodes = (element) => {
    let textNodes = [];
    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Skip buttons and icons
        if (node.tagName !== 'BUTTON' && !node.classList.contains('translation-icon')) {
          textNodes = textNodes.concat(getTextNodes(node));
        }
      }
    });
    return textNodes;
  };

  // Save the original content before translating
  const saveOriginalContent = () => {
    const textNodes = getTextNodes(document.body);
    const originalContentMap = {};
    textNodes.forEach((node, index) => {
      originalContentMap[index] = node.nodeValue;
    });
    setOriginalContent(originalContentMap);
  };

  // Restore the original content to English
  const restoreOriginalContent = () => {
    const textNodes = getTextNodes(document.body);
    Object.keys(originalContent).forEach((key) => {
      // Ensure we do not access out-of-bounds
      if (textNodes[key]) {
        textNodes[key].nodeValue = originalContent[key];
      }
    });
    setIsTranslated(false);
  };

  // Handle language change and translation
  const handleLanguageChange = async (language) => {
    if (!isTranslated) {
      saveOriginalContent();
    }

    try {
      const textNodes = getTextNodes(document.body);
      const textToTranslate = textNodes.map((node) => node.nodeValue).join(' || ');

      console.log(`Translating text: "${textToTranslate}" to ${language}`); // Log the text to be translated

      const response = await axios.post('http://localhost:5001/api/translate', {
        text: textToTranslate,
        targetLanguage: language,
      });

      console.log(`Response from API: `, response.data); // Log the API response

      const translatedTextArray = response.data.translatedText.split(' || ');
      textNodes.forEach((node, index) => {
        if (translatedTextArray[index]) {
          node.nodeValue = translatedTextArray[index];
        }
      });
      setIsTranslated(true);
      setShowLanguageOptions(false);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  // Initialize on page load
  React.useEffect(() => {
    saveOriginalContent();
  }, []);

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

      {/* Restore button to revert to English */}
      {isTranslated && (
        <button className="reset-button" onClick={restoreOriginalContent}>
          Restore to English
        </button>
      )}
    </div>
  );
};

export default TranslationComponent;
