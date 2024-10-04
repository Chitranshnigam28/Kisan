import React, { useState } from 'react';
import axios from 'axios';

const TranslationComponent = () => {
  const [originalContent, setOriginalContent] = useState({});

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

  const saveOriginalContent = () => {
    const textNodes = getTextNodes(document.body);
    const originalContentMap = {};
    textNodes.forEach((node, index) => {
      originalContentMap[index] = node.nodeValue;
    });
    setOriginalContent(originalContentMap);
  };

  const restoreOriginalContent = () => {
    const textNodes = getTextNodes(document.body);
    Object.keys(originalContent).forEach((key) => {
      textNodes[key].nodeValue = originalContent[key];
    });
  };

  const handleLanguageChange = async (selectedLanguage) => {
    try {
      const textNodes = getTextNodes(document.body);
      const textToTranslate = textNodes.map((node) => node.nodeValue).join(' || ');

      const response = await axios.post('http://localhost:5000/api/translate', {
        text: textToTranslate,
        targetLanguage: selectedLanguage
      });

      const translatedTextArray = response.data.translatedText.split(' || ');
      textNodes.forEach((node, index) => {
        node.nodeValue = translatedTextArray[index];
      });

    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const initialize = () => {
    saveOriginalContent();
  };

  React.useEffect(() => {
    initialize();
  }, []);

  return (
    <div>
      <div>
        <label>Select Language: </label>
        <select onChange={(e) => handleLanguageChange(e.target.value)}>
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="bn">Bengali</option>
          <option value="te">Telugu</option>
          <option value="mr">Marathi</option>
          <option value="ta">Tamil</option>
          <option value="gu">Gujarati</option>
          <option value="kn">Kannada</option>
          <option value="ml">Malayalam</option>
          <option value="pa">Punjabi</option>
          <option value="ur">Urdu</option>
        </select>
      </div>

      <button onClick={restoreOriginalContent}>Switch back to English</button>
    </div>
  );
};

export default TranslationComponent;
