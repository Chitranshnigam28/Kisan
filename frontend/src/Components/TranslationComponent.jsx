import React, { useState } from 'react';
import axios from 'axios';

const TranslationComponent = () => {
  const [originalContent, setOriginalContent] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('en');  
  const [isTranslated, setIsTranslated] = useState(false);

  // Function to collect all text nodes from the page
  const getTextNodes = (element) => {
    let textNodes = [];
    element.childNodes.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && node.nodeValue.trim() !== '') {
        textNodes.push(node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        textNodes = textNodes.concat(getTextNodes(node));
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
      textNodes[key].nodeValue = originalContent[key];
    });
    setIsTranslated(false);
  };

  // Handle language change and translation
  const handleLanguageChange = async () => {
    if (!isTranslated) {
      saveOriginalContent();
    }

    try {
      const textNodes = getTextNodes(document.body);
      const textToTranslate = textNodes.map((node) => node.nodeValue).join(' || ');

      const response = await axios.post('http://localhost:5001/api/translate', {
        text: textToTranslate,
        targetLanguage: selectedLanguage
      });

      const translatedTextArray = response.data.translatedText.split(' || ');
      textNodes.forEach((node, index) => {
        node.nodeValue = translatedTextArray[index];
      });
      setIsTranslated(true);
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  // Initialize on page load
  React.useEffect(() => {
    saveOriginalContent();
  }, []);

  return (
    <div>
      <h1>Welcome to the Translation feature of Kisan App</h1>
      <p>This is a demo of a simple translation feature.</p>

      <div>
        <label>Select Language: </label>
        <select value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
          <option value="en">English (अंग्रेज़ी)</option>
          <option value="hi">Hindi (हिन्दी)</option>
          <option value="bn">Bengali (বাংলা)</option>
          <option value="te">Telugu (తెలుగు)</option>
          <option value="mr">Marathi (मराठी)</option>
          <option value="ta">Tamil (தமிழ்)</option>
          <option value="gu">Gujarati (ગુજરાતી)</option>
          <option value="kn">Kannada (ಕನ್ನಡ)</option>
          <option value="ml">Malayalam (മലയാളം)</option>
          <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
          <option value="ur">Urdu (اردو)</option>
        </select>

        <button onClick={handleLanguageChange} disabled={isTranslated}>
          {isTranslated ? "Translated!" : "Translate"}
        </button>
        <button onClick={restoreOriginalContent}>Restore to English</button>
      </div>
    </div>
  );
};

export default TranslationComponent;
