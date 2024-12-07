import React, { useState, useEffect } from "react";
import axios from "axios";
import '../css/funfacts.css';
import FunFactsLoader from "./FunFactsLoader";

const FunFacts = () => {
  const [funFact, setFunFact] = useState(null);
  const [translatedFunFact, setTranslatedFunFact] = useState(null);
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en'); 

  const fetchRandomFunFact = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/funfacts`);
      setFunFact(response.data);
      translateFunFact(response.data, language); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const translateFunFact = async (fact, targetLanguage) => {
    try {
      const scientificNameTranslation = await translateText(fact.scientificName, targetLanguage);
      const generalTranslation = await translateText(fact.funFact.general, targetLanguage);
      const environmentalImpactTranslation = await translateText(fact.funFact.environmentalImpact, targetLanguage);
      const translatedFact = {
        ...fact,
        scientificName: scientificNameTranslation,
        funFact: {
          general: generalTranslation,
          environmentalImpact: environmentalImpactTranslation,
        },
      };
  
      setTranslatedFunFact(translatedFact);
    } catch (error) {
      console.error("Error translating text:", error.response || error);
    }
  };

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/translate`, {
        text: text,
        targetLanguage: targetLanguage, 
      });

      return response.data.translatedText; 
    } catch (error) {
      console.error("Error translating text:", error);
      return text; 
    }
  };

  const headingTranslationMapping = {
    'didYouKnow': {
      en: 'Did you know?',
      hi: 'क्या आप जानते हैं?',
      pa: 'ਕੀ ਤੁਸੀਂ ਜਾਣਦੇ ਹੋ?'
    },
    'scientificName': {
      en: 'Scientific Name',
      hi: 'वैज्ञानिक नाम',
      pa: 'ਵਿਗਿਆਨਿਕ ਨਾਂ'
    },
    'funFact': {
      en: 'Fun Fact',
      hi: 'रोमांचक तथ्य',
      pa: 'ਮਜ਼ੇਦਾਰ ਤੱਥ'
    },
    'environmentalImpact': {
      en: 'Environmental Impact',
      hi: 'पर्यावरणीय प्रभाव',
      pa: 'ਵਾਤਾਵਰਨੀ ਅਸਰ'
    }
  };

  const getTranslatedHeading = (headingKey) => {
    return headingTranslationMapping[headingKey] ? headingTranslationMapping[headingKey][language] : headingKey;
  };

  useEffect(() => {
    fetchRandomFunFact();
    const intervalId = setInterval(fetchRandomFunFact, 5000);
    return () => clearInterval(intervalId);
  }, [language]);

  return (
    <div className="funfacts-container">
      {funFact ? (
        <div className="funFactsDiv">
          <p className="funFactstitle">{getTranslatedHeading('didYouKnow')}</p>
          <div className="fun-fact-card">
            <p className="fact-item"><strong>{getTranslatedHeading('scientificName')}:</strong> {translatedFunFact ? translatedFunFact.scientificName : funFact.scientificName}</p>
            <p className="fact-item"><strong>{getTranslatedHeading('funFact')}:</strong> {translatedFunFact ? translatedFunFact.funFact.general : funFact.funFact.general}</p>
            <p className="fact-item"><strong>{getTranslatedHeading('environmentalImpact')}:</strong> {translatedFunFact ? translatedFunFact.funFact.environmentalImpact : funFact.funFact.environmentalImpact}</p>
          </div>
        </div>
      ) : (
        <FunFactsLoader />
      )}
    </div>
  );
};

export default FunFacts;
