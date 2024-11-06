import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/translation.css';

const TranslationComponent = () => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem('language') || 'en');
  const [translatedContent, setTranslatedContent] = useState('');
  const [showLanguageOptions, setShowLanguageOptions] = useState(false);

  // Fetch and set translated content
  const fetchTranslation = async (language) => {
    try {
      console.log(`Fetching translation for language: ${language}`);

      const originalText = document.querySelector('.content').innerText; // Get text from the specific content element

      const response = await axios.post('http://localhost:5001/api/translate', {
        text: originalText,
        targetLanguage: language,
      });

      console.log('API response:', response.data);
      if (response.data && response.data.translatedText) {
        setTranslatedContent(response.data.translatedText);
      } else {
        console.error('Unexpected response format:', response.data);
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  };

  const handleLanguageChange = (language) => {
    if (currentLanguage !== language) {
      console.log(`Changing language to: ${language}`);
      localStorage.setItem('language', language);
      setCurrentLanguage(language);
      fetchTranslation(language); // Fetch translation and set state
    }
  };

  useEffect(() => {
    if (currentLanguage !== 'en') {
      fetchTranslation(currentLanguage);
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

      {/* Render content */}
      <div className='content'>
        {translatedContent || 'Your original content here'}
      </div>
    </div>
  );
};

export default TranslationComponent;
