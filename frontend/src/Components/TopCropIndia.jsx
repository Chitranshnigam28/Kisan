import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/insigtsAiData.css";
import barleyImg from "../Assets/Vegetables/barley.png";
import bitterGourdImg from "../Assets/Vegetables/bitter-gourd.png";
import cabbageImg from "../Assets/Vegetables/cabbage.png";
import cauliflowerImg from "../Assets/Vegetables/cauliflower.png";
import coffeeBeansImg from "../Assets/Vegetables/coffee-beans.png";
import cornImg from "../Assets/Vegetables/Corn.svg";
import eggplantImg from "../Assets/Vegetables/eggplant.png";
import garlicImg from "../Assets/Vegetables/garlic.png";
import greenTeaImg from "../Assets/Vegetables/green-tea.png";
import jowarImg from "../Assets/Vegetables/jowar.png";
import maizeImg from "../Assets/Vegetables/maize.svg";
import onionImg from "../Assets/Vegetables/onion.png";
import peaImg from "../Assets/Vegetables/pea.png";
import potatoImg from "../Assets/Vegetables/Potato.svg";
import pumpkinImg from "../Assets/Vegetables/pumpkin.png";
import sesameImg from "../Assets/Vegetables/sesame.png";
import soyImg from "../Assets/Vegetables/Soy.svg";
import soybeanImg from "../Assets/Vegetables/soyabean.png";
import spinachImg from "../Assets/Vegetables/spinach.png";
import sugarCaneImg from "../Assets/Vegetables/sugar-cane.png";
import tobaccoImg from "../Assets/Vegetables/tobacco.png";
import tomatoImg from "../Assets/Vegetables/tomato.png";
import wheatImg from "../Assets/Vegetables/wheat.png";
import bajra from "../Assets/Vegetables/plant.png";
import cotton from "../Assets/Vegetables/cotton.png";
import rice from "../Assets/Vegetables/rice.png";
import ragi from "../Assets/Vegetables/ragi.png";
import groundnut from "../Assets/Vegetables/groundnut.png";
import marketInsights from "../Assets/marketinsights.svg";
import SimpleLoader from "./SimpleLoader";

const MarketInsights = () => {
  const [insights, setInsights] = useState([]);
  const [translatedInsights, setTranslatedInsights] = useState([]);
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    console.log("Top INdia running ")
    const fetchMarketInsights = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5001/api/get-market-insights/"
        );
        console.log("checking if topCropIndia is coming ", response);
        if (response.data && response.data.crops) {
          setInsights(response.data.crops);
          translateMarketInsights(response.data.crops, language);
          // onLoaded("working"); // Call onLoaded only after data is successfully fetched
        } else {
          console.error("Unexpected response format:", response.data);
          setInsights([]); // Set to empty if the response is not in the expected format
          // onLoaded("working"); // Still call onLoaded after error, if needed
        }
      } catch (error) {
        console.error("Error fetching market insights:", error);
        setInsights([]); // Set to empty on error
        // onLoaded("working"); // Ensure onLoaded is called after error
      } finally {
        setLoading(false);
      }
    };

    fetchMarketInsights();
  }, [language]);

  const translateText = async (text, targetLanguage) => {
    try {
      const response = await axios.post("http://localhost:5001/api/translate", {
        text: text,
        targetLanguage: targetLanguage,
      });
      return response.data.translatedText;
    } catch (error) {
      console.error("Error translating text:", error);
      return text;
    }
  };

  const translateMarketInsights = async (crops, targetLanguage) => {
    try {
      const translatedCrops = await Promise.all(
        crops.map(async (crop) => {
          const translatedCrop = {
            ...crop,
            crop_name: await translateText(crop.crop_name, targetLanguage),
            state: await translateState(crop.state, targetLanguage),
          };
          return translatedCrop;
        })
      );
      setTranslatedInsights(translatedCrops);

      // onload for the loader
      // onLoaded && onLoaded();
    } catch (error) {
      console.error("Error translating market insights:", error);
    }
  };

  const stateTranslationMapping = {
    "Andhra Pradesh": { hi: "आंध्र प्रदेश", pa: "ਅੰਦ੍ਰਾ ਪ੍ਰਦੇਸ਼" },
    "Arunachal Pradesh": { hi: "अरुणाचल प्रदेश", pa: "ਅਰੁਣਾਚਲ ਪ੍ਰਦੇਸ਼" },
    Assam: { hi: "असम", pa: "ਅਸਮ" },
    Bihar: { hi: "बिहार", pa: "ਬਿਹਾਰ" },
    Chhattisgarh: { hi: "छत्तीसगढ़", pa: "ਛੱਤੀਸਗੜ੍ਹ" },
    Goa: { hi: "गोवा", pa: "ਗੋਆ" },
    Gujarat: { hi: "गुजरात", pa: "ਗੁਜਰਾਤ" },
    Haryana: { hi: "हरियाणा", pa: "ਹਰਿਆਣਾ" },
    "Himachal Pradesh": { hi: "हिमाचल प्रदेश", pa: "ਹਿਮਾਚਲ ਪ੍ਰਦੇਸ਼" },
    Jharkhand: { hi: "झारखंड", pa: "ਝਾਰਖੰਡ" },
    Karnataka: { hi: "कर्नाटका", pa: "ਕਰਨਾਟਕਾ" },
    Kerala: { hi: "केरल", pa: "ਕੇਰਲ" },
    "Madhya Pradesh": { hi: "मध्य प्रदेश", pa: "ਮੱਧ ਪ੍ਰਦੇਸ਼" },
    Maharashtra: { hi: "महाराष्ट्र", pa: "ਮਹਾਰਾਸ਼ਟਰ" },
    Manipur: { hi: "मणिपुर", pa: "ਮਣੀਪੁਰ" },
    Meghalaya: { hi: "मेघालय", pa: "ਮੇਘਾਲਯਾ" },
    Mizoram: { hi: "मिजोरम", pa: "ਮਿਜ਼ੋਰਮ" },
    Nagaland: { hi: "नगालैंड", pa: "ਨਾਗਾਲੈਂਡ" },
    Odisha: { hi: "ओडिशा", pa: "ਓਡੀਸ਼ਾ" },
    Punjab: { hi: "पंजाब", pa: "ਪੰਜਾਬ" },
    Rajasthan: { hi: "राजस्थान", pa: "ਰਾਜਸਥਾਨ" },
    Sikkim: { hi: "सिक्किम", pa: "ਸਿਕਕਿਮ" },
    "Tamil Nadu": { hi: "तमिलनाडु", pa: "ਤਮਿਲਨਾਡੁ" },
    Telangana: { hi: "तेलंगाना", pa: "ਤੇਲੰਗਾਨਾ" },
    Tripura: { hi: "त्रिपुरा", pa: "ਤ੍ਰਿਪੁਰਾ" },
    "Uttar Pradesh": { hi: "उत्तर प्रदेश", pa: "ਉੱਤਰ ਪ੍ਰਦੇਸ਼" },
    Uttarakhand: { hi: "उत्तराखंड", pa: "ਉੱਤਰਾਖੰਡ" },
    "West Bengal": { hi: "पश्चिम बंगाल", pa: "ਪਸ਼ਚਿਮ ਬੰਗਾਲ" },
  };

  const translateState = (stateName, targetLanguage) => {
    if (stateTranslationMapping[stateName]) {
      return stateTranslationMapping[stateName][targetLanguage] || stateName;
    }
    return stateName;
  };

  const getCropIcon = (cropName) => {
    switch (cropName.toLowerCase()) {
      case "rice":
      case "चावल": // Hindi translation for Rice
      case "ਚਾਵਲ": // Punjabi translation for Rice
        return rice;
      case "wheat":
      case "गेहूँ": // Hindi translation for Wheat
      case "ਕਣਕ": // Punjabi translation for Wheat
        return wheatImg;
      case "maize":
      case "मक्का": // Hindi translation for Maize
      case "ਮੱਕੀ": // Punjabi translation for Maize
        return cornImg;
      case "cotton":
      case "कपास": // Hindi translation for Cotton
      case "ਕਪਾਹ": // Punjabi translation for Cotton
        return cotton;
      case "sugarcane":
      case "गन्ना": // Hindi translation for Sugarcane
      case "ਗੰਨਾ": // Punjabi translation for Sugarcane
        return sugarCaneImg;
      case "barley":
      case "जौ": // Hindi translation for Barley
      case "ਜੌ": // Punjabi translation for Barley
        return barleyImg;
      case "millet":
      case "बाजरा": // Hindi translation for Millet
      case "ਬਾਜਰਾ": // Punjabi translation for Millet
        return cornImg; // Same icon for millet
      case "tobacco":
      case "तंबाकू": // Hindi translation for Tobacco
      case "ਤਮਾਕੂ": // Punjabi translation for Tobacco
        return tobaccoImg;
      case "cabbage":
      case "पत्ता गोभी": // Hindi translation for Cabbage
      case "ਪੱਤਾ ਗੋਭੀ": // Punjabi translation for Cabbage
        return cabbageImg;
      case "onion":
      case "प्याज": // Hindi translation for Onion
      case "ਪਿਆਜ਼": // Punjabi translation for Onion
        return onionImg;
      case "garlic":
      case "लहसुन": // Hindi translation for Garlic
      case "ਲਹਸੁਨ": // Punjabi translation for Garlic
        return garlicImg;
      case "cauliflower":
      case "फूलगोभी": // Hindi translation for Cauliflower
      case "ਫੂਲਗੋਭੀ": // Punjabi translation for Cauliflower
        return cauliflowerImg;
      case "spinach":
      case "पालक": // Hindi translation for Spinach
      case "ਪਾਲਕ": // Punjabi translation for Spinach
        return spinachImg;
      case "tomato":
      case "टमाटर": // Hindi translation for Tomato
      case "ਟਮਾਟਰ": // Punjabi translation for Tomato
        return tomatoImg;
      case "pumpkin":
      case "कद्दू": // Hindi translation for Pumpkin
      case "ਕਦੂ": // Punjabi translation for Pumpkin
        return pumpkinImg;
      case "eggplant":
      case "बैंगन": // Hindi translation for Eggplant
      case "ਬੈੰਗਣ": // Punjabi translation for Eggplant
        return eggplantImg;
      case "bitter gourd":
      case "करेला": // Hindi translation for Bitter Gourd
      case "ਕਰੇਲਾ": // Punjabi translation for Bitter Gourd
        return bitterGourdImg;
      case "tea":
      case "चाय": // Hindi translation for Tea
      case "ਚਾਹ": // Punjabi translation for Tea
        return greenTeaImg;
      case "coffee":
      case "कॉफी": // Hindi translation for Coffee
      case "ਕਾਫੀ": // Punjabi translation for Coffee
        return coffeeBeansImg;
      case "jowar":
      case "ज्वार": // Hindi translation for Jowar
      case "ਜਵਾਰ": // Punjabi translation for Jowar
        return jowarImg;
      case "bajra":
      case "बाजरा": // Hindi translation for Bajra
      case "ਬਾਜਰਾ": // Punjabi translation for Bajra
        return bajra;
      case "potato":
      case "आलू": // Hindi translation for Potato
      case "ਆਲੂ": // Punjabi translation for Potato
        return potatoImg;
      case "peas":
      case "मटर": // Hindi translation for Peas
      case "ਮਟਰ": // Punjabi translation for Peas
        return peaImg;
      case "ragi":
      case "रागी": // Hindi translation for Ragi
      case "ਰਾਗੀ": // Punjabi translation for Ragi
        return ragi;
      case "soybean":
      case "सोयाबीन": // Hindi translation for Soybean
      case "ਸੋਯਾਬੀਨ": // Punjabi translation for Soybean
        return soybeanImg;
      case "sesame":
      case "तिल": // Hindi translation for Sesame
      case "ਤਿਲ": // Punjabi translation for Sesame
        return sesameImg;
      case "groundnut":
      case "मूंगफली": // Hindi translation for Groundnut
      case "ਮੂੰਗਫਲੀ": // Punjabi translation for Groundnut
        return groundnut;
      default:
        return "🌿"; // Default icon for any undefined crop
    }
  };

  return (
    <div className="market-insights-container">
      <h4 className="market-insights-title">
        <img
          src={marketInsights}
          alt="Market Insights"
          className="market-insights-icon"
        />
        {language === "en"
          ? "Market Insights"
          : language === "hi"
          ? "बाजार जानकारी"
          : "ਬਾਜਾਰ ਜਾਣਕਾਰੀ"}
      </h4>
      {translatedInsights.length > 0 ? (
        <ul className="market-insights-list">
          {translatedInsights.map((crop, index) => (
            <li key={index} className="market-insights-item">
              <img
                src={getCropIcon(crop.crop_name)}
                alt={crop.crop_name}
                className="crop-icon"
              />
              <div className="crop-info">
                <h3 className="crop-name">{crop.crop_name}</h3>
                <p className="crop-location">{crop.state}</p>
              </div>
              <p
                className={`price-trend ${
                  crop.price_trend.startsWith("+") ? "positive" : "negative"
                }`}
              >
                {crop.price_trend}
              </p>
              <p className="current-price">{crop.current_price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <SimpleLoader />
)}
    </div>
  );
};

export default MarketInsights;
