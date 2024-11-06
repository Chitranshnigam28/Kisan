import "../css/weatherPage.css";
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
import { FaMapMarkerAlt } from 'react-icons/fa';
import Forecast from '../Components/weatherComponents/Forecast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TopCropsChart from "./TopCropChart"; //Matching the location for both weather and
import { format } from 'date-fns'; 
import WeatherWidget from "./weatherWidget";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function Weather() {
  const location = useLocation();
  const [query, setQuery] = useState(location.state?.query || { q: "Delhi" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  function getWeatherIcon(condition) {
    switch (condition) {
      case 'Clear':
        return <WiDaySunny size={64} color="#FFD700" />;
      case 'Clouds':
        return <WiCloud size={64} color="#A9A9A9" />;
      case 'Rain':
        return <WiRain size={64} color="#1E90FF" />;
      case 'Snow':
        return <WiSnow size={64} color="#ADD8E6" />;
      case 'Thunderstorm':
        return <WiThunderstorm size={64} color="#00008B" />;
      default:
        return <WiCloud size={64} color="#A9A9A9" />;
    }
  }

  const getWeather = async () => {
    try {
      setLoading(true);
      const isGeolocation = query.lat && query.lon;
      const queryString = isGeolocation ? `lat=${query.lat}&lon=${query.lon}` : `q=${query.q}`;
      const cityName = query.q ? capitalizeFirstLetter(query.q) : "current location";
      toast.info(`Fetching weather data for ${isGeolocation ? "current location" : cityName}...`);

      const response = await fetch(`http://localhost:5001/api/weather?${queryString}&units=${units}`);
      if (!response.ok) throw new Error("Failed to fetch weather data");

      const data = await response.json();
      // console.log("Data 52 " + JSON.stringify(data));
      if (!data.temp || !data.hourly || !data.daily || !data.name || !data.country) throw new Error("Incomplete weather data received");

      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather({
        ...data,
        bgColor: data.weather && data.weather[0] ? getBackgroundColor(data.weather[0].main) : "#FFD700",
      });
    } catch (error) {
      toast.error(`Error fetching weather data: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);
  const tips = {
    Clear: [
      "Today’s weather is sunny! Make sure to irrigate your crops early in the morning or late in the evening to prevent excessive water evaporation during peak sunlight.",
      "With clear skies today, apply a layer of mulch around your plants. This will help lock in soil moisture and keep roots cool.",
      "It’s a bright sunny day! Consider providing shade for young or delicate plants to protect them from sunburn."
    ],
    Rain: [
      "Expect some rain today! Check your field’s drainage to avoid waterlogging, which can lead to root rot and fungal issues.",
      "Rain is on the way! Hold off on applying fertilizer, as it may get washed away, wasting nutrients and potentially harming nearby water sources.",
      "With wet conditions today, keep an eye out for pests that thrive in moist environments, and be ready to take action if needed."
    ],
    Clouds: [
      "It's cloudy today! Monitor sunlight-sensitive plants and adjust light requirements if possible.",
      "Overcast weather can cool down plants; consider reducing water frequency if soil stays moist.",
      "Clouds can affect crop growth; use supplemental lighting if you have sensitive or greenhouse plants."
    ],
    Snow: [
      "It’s snowy! Clear off snow from greenhouse roofs to maximize sunlight for your crops.",
      "Use mulch or organic covers to keep the soil insulated during snowy conditions.",
      "Check for frost protection and insulate roots with straw or other materials to avoid freezing."
    ],
    Thunderstorm: [
      "Thunderstorms expected! Secure young plants or cover them to prevent damage.",
      "Avoid working near tall metal structures during thunderstorms and stay safe indoors.",
      "Heavy rains may accompany the storm; check drainage systems to prevent waterlogging."
    ],
    Haze: [
      "The weather is hazy today! Limit water evaporation by watering early in the morning or late in the evening.",
      "Keep an eye on plant health as haze can limit sunlight exposure. Adjust supplementary lighting if necessary.",
      "If haze persists, check air quality as it may impact sensitive plants. Ensure good ventilation in greenhouses."
    ]
  };

  const currentCondition = weather?.details || "Unknown";
  console.log(currentCondition);
  console.log("tips[currentCondition] " + tips[currentCondition]);
  const displayTips = tips[currentCondition] || [];
  const tipToDisplay = Math.floor(Math.random() * 3);
  console.log("tipToDisplay " + tipToDisplay);
  console.log("displayTips " + displayTips[tipToDisplay]);


  const getCurrentDate = () => {
    return format(new Date(), "do MMMM yyyy, EEEE"); 
  };
  return (
    <div className="weather-details-container">
      <div className="weatherHeader">
        <img src="./weatherlogo.png" alt="weather logo" />
        <div className="weatherTitleWrapper">
          <h2>Weather</h2>
          <p>Explore key market trends and insights to stay ahead.</p>
        </div>
      </div>

      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        weather && (
          <div className="weather-main">
            <div className="weather-visualization" style={{ backgroundColor: weather.bgColor }}>
              <div className="location">
                <FaMapMarkerAlt size={18} color="#fff" />
                <span>{`${weather.name}, ${weather.country}`}</span>
              </div>
              <div className="dateWeatherIconWrapper">
                
                <p className="date">{getCurrentDate()}</p>
                {getWeatherIcon()}
              </div>
              <div className="temperature-display">
                {/* {getWeatherIcon()} */}
                <p className="temperature">{`${weather.temp.toFixed()}°C`}</p>
              </div>

              <Forecast title="Hourly Forecast" data={weather.hourly} />
            </div>
            {/* <WeatherWidget showSearch={false} /> */}

            <div className="weather-info">
              <div className="tipWrapper">
                <h3 className="highlights-title">Now is a good weather
                  for spraying pesticides.</h3>
                <div className="weather-tip">
                  {/* Today’s weather is sunny! Make sure to irrigate your crops early in the morning or late in the evening to prevent excessive water evaporation during peak sunlight. */}
                  <div className="imgTipWrapper">
                    <img src="./Light.svg" alt="light" />
                    {displayTips.length > 0 ? (
                      <p>{displayTips[tipToDisplay]}</p>
                    ) : (
                      <p>No specific tips for today's weather condition.</p>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="highlights-title">Today's Highlights</h3>
              <div className="highlights-grid">
                <div className="highlight-box">
                  <p>UV Index</p>
                  <p>{weather.uvi}</p>
                </div>
                <div className="highlight-box">
                  <p>Wind Status</p>
                  <p>{weather.speed} Km/hr</p>
                </div>
                <div className="highlight-box">
                  <p>Sunrise & Sunset</p>
                  <p style={{ fontSize: "1.25rem", fontWeight: "600" }}>
                    <div className="ssIconTextWrapper">
                      <BsFillSunriseFill /> {weather.sunrise}
                    </div>
                    <div className="ssIconTextWrapper"> <BsFillSunsetFill /> {weather.sunset}</div></p>
                </div>
                <div className="highlight-box">
                  <p>Humidity</p>
                  <p>{weather.humidity}%</p>
                </div>
                <div className="highlight-box">
                  <p>Visibility</p>
                  <p>{weather.visibility} Km</p>
                </div>
                <div className="highlight-box">
                  <p>Air Quality</p>
                  <p>{weather.aqi || 'N/A'}</p>
                </div>
              </div>

            </div>

          </div>

        )
      )}
      <div className="d-flex justify-content-center align-items-center vh-50">
        <Link to="/" className="btn btn-dark btn-lg rounded-pill mt-3">
          Go Back
        </Link>
      </div>

      <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored" />
    </div>
  );
}

export default Weather;

// import "../css/weatherPage.css";
// import { useEffect, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { WiDaySunny, WiCloud, WiRain, WiSnow, WiThunderstorm } from 'react-icons/wi';
// import { BsFillSunriseFill, BsFillSunsetFill } from "react-icons/bs";
// import { FaMapMarkerAlt } from 'react-icons/fa';
// import Forecast from '../Components/weatherComponents/Forecast';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { format } from 'date-fns'; 

// // Weather-related translations
// const translations = {
//   en: {
//     tips: {
//       Clear: [
//         "Today’s weather is sunny! Make sure to irrigate your crops early in the morning or late in the evening to prevent excessive water evaporation during peak sunlight.",
//         "With clear skies today, apply a layer of mulch around your plants. This will help lock in soil moisture and keep roots cool.",
//         "It’s a bright sunny day! Consider providing shade for young or delicate plants to protect them from sunburn."
//       ],
//       Rain: [
//         "Expect some rain today! Check your field’s drainage to avoid waterlogging, which can lead to root rot and fungal issues.",
//         "Rain is on the way! Hold off on applying fertilizer, as it may get washed away, wasting nutrients and potentially harming nearby water sources.",
//         "With wet conditions today, keep an eye out for pests that thrive in moist environments, and be ready to take action if needed."
//       ],
//       Clouds: [
//         "It's cloudy today! Monitor sunlight-sensitive plants and adjust light requirements if possible.",
//         "Overcast weather can cool down plants; consider reducing water frequency if soil stays moist.",
//         "Clouds can affect crop growth; use supplemental lighting if you have sensitive or greenhouse plants."
//       ],
//       Snow: [
//         "It’s snowy! Clear off snow from greenhouse roofs to maximize sunlight for your crops.",
//         "Use mulch or organic covers to keep the soil insulated during snowy conditions.",
//         "Check for frost protection and insulate roots with straw or other materials to avoid freezing."
//       ],
//       Thunderstorm: [
//         "Thunderstorms expected! Secure young plants or cover them to prevent damage.",
//         "Avoid working near tall metal structures during thunderstorms and stay safe indoors.",
//         "Heavy rains may accompany the storm; check drainage systems to prevent waterlogging."
//       ],
//       Haze: [
//         "The weather is hazy today! Limit water evaporation by watering early in the morning or late in the evening.",
//         "Keep an eye on plant health as haze can limit sunlight exposure. Adjust supplementary lighting if necessary.",
//         "If haze persists, check air quality as it may impact sensitive plants. Ensure good ventilation in greenhouses."
//       ]
//     },
//     highlights: {
//       UVIndex: "UV Index",
//       WindStatus: "Wind Status",
//       SunriseAndSunset: "Sunrise & Sunset",
//       Humidity: "Humidity",
//       Visibility: "Visibility",
//       AirQuality: "Air Quality"
//     }
//   },
//   hi: {
//     tips: {
//       Clear: [
//         "आज का मौसम धूप वाला है! सूरज की अधिक गर्मी से बचने के लिए अपने फसलों को सुबह या शाम को सिंचाई करें।",
//         "आज आसमान साफ है, अपने पौधों के चारों ओर एक परत मल्च लगाएं। इससे मिट्टी में नमी बनी रहेगी और जड़ें ठंडी रहेंगी।",
//         "यह एक तेज़ धूप वाला दिन है! युवाओं या नाजुक पौधों के लिए छांव प्रदान करने पर विचार करें ताकि वे जलने से बचें।"
//       ],
//       Rain: [
//         "आज बारिश होने की संभावना है! अपने खेत के जल निकासी की जांच करें ताकि पानी भरने से बचा जा सके, जिससे जड़ सड़न और फंगल समस्याएं हो सकती हैं।",
//         "बारिश आने वाली है! खाद डालने से बचें, क्योंकि यह धोकर बह सकती है, जिससे पोषक तत्व नष्ट हो सकते हैं और आस-पास के जल स्रोतों को नुकसान हो सकता है।",
//         "गीली स्थिति में आज, उस माहौल में पनपने वाले कीटों पर नज़र रखें, और आवश्यकता होने पर कार्रवाई करें।"
//       ],
//       Clouds: [
//         "आज बादल हैं! सूर्य के प्रति संवेदनशील पौधों पर निगरानी रखें और आवश्यकतानुसार प्रकाश की आवश्यकताओं को समायोजित करें।",
//         "आंशिक रूप से बादल वाले मौसम में पौधों में ठंडक हो सकती है; यदि मिट्टी गीली रहती है, तो पानी देने की आवृत्ति कम करने पर विचार करें।",
//         "बादल फसल की वृद्धि को प्रभावित कर सकते हैं; यदि आपके पास संवेदनशील या ग्रीनहाउस पौधे हैं तो पूरक प्रकाश व्यवस्था का उपयोग करें।"
//       ],
//       Snow: [
//         "यह बर्फबारी है! अपने ग्रीनहाउस की छत से बर्फ को हटा दें ताकि आपके फसलों के लिए सूरज की रोशनी अधिकतम हो सके।",
//         "बर्फबारी के मौसम में मिट्टी को गर्म रखने के लिए मल्च या जैविक आवरण का उपयोग करें।",
//         "पौधों के जमने से बचाने के लिए जड़ों को खोदकर या अन्य सामग्री से इंसुलेट करें।"
//       ],
//       Thunderstorm: [
//         "आंधी-तूफान की संभावना है! युवा पौधों को सुरक्षित करें या उन्हें ढक दें ताकि उनका नुकसान न हो।",
//         "आंधी के दौरान लंबी धातु संरचनाओं के पास काम करने से बचें और घर के अंदर सुरक्षित रहें।",
//         "आंधी के साथ भारी बारिश हो सकती है; जलभराव से बचने के लिए जल निकासी व्यवस्था की जांच करें।"
//       ],
//       Haze: [
//         "आज मौसम धुंधला है! पानी की वाष्पीकरण को सीमित करने के लिए सुबह या शाम को सिंचाई करें।",
//         "पौधों के स्वास्थ्य पर नजर रखें क्योंकि धुंध सूर्य के प्रकाश को सीमित कर सकती है। आवश्यकतानुसार पूरक प्रकाश व्यवस्था को समायोजित करें।",
//         "अगर धुंध बनी रहती है, तो हवा की गुणवत्ता की जांच करें क्योंकि यह संवेदनशील पौधों पर असर डाल सकता है। सुनिश्चित करें कि ग्रीनहाउस में अच्छी वेंटिलेशन हो।"
//       ]
//     },
//     highlights: {
//       UVIndex: "यूवी सूचकांक",
//       WindStatus: "हवा की स्थिति",
//       SunriseAndSunset: "सूर्योदय और सूर्यास्त",
//       Humidity: "नमी",
//       Visibility: "दृश्यता",
//       AirQuality: "वायु गुणवत्ता"
//     }
//   },
//   pa: {
//     tips: {
//       Clear: [
//         "ਅੱਜ ਦਾ ਮੌਸਮ ਸੂਰਜੀ ਹੈ! ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਪੌਧਿਆਂ ਨੂੰ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਪਾਣੀ ਦਿਓ ਤਾਂ ਜੋ ਧੂਪ ਦੀ ਤਾਪਮਾਨ ਵੱਧਣ ਨਾਲ ਪਾਣੀ ਦੀ ਬਰਬਾਦੀ ਨਾ ਹੋਵੇ।",
//         "ਅੱਜ ਆਸਮਾਨ ਸਾਫ਼ ਹੈ, ਆਪਣੇ ਪੌਧਿਆਂ ਦੇ ਆਲੇ-ਦੁਆਲੇ ਮਲਚ ਲਗਾਓ। ਇਸ ਨਾਲ ਮਿੱਟੀ ਵਿੱਚ ਨਮੀ ਬਣੀ ਰਹੇਗੀ ਅਤੇ ਜੜਾਂ ਠੰਡੀ ਰਹਿਣਗੀਆਂ।",
//         "ਇਹ ਇੱਕ ਤਿਆਰ ਧੂਪ ਵਾਲਾ ਦਿਨ ਹੈ! ਨੌਜਵਾਨ ਜਾਂ ਨਰਮ ਪੌਧਿਆਂ ਨੂੰ ਥੋੜ੍ਹੀ ਛਾਂਵ ਦੇਣਾ ਵਿਚਾਰੋ ਤਾਂ ਜੋ ਉਹ ਸੂਰਜ ਦੀ ਤਾਪਮਾਨ ਤੋਂ ਬਚ ਸਕਣ।"
//       ],
//       Rain: [
//         "ਅੱਜ ਮੀਂਹ ਹੋਣ ਦੀ ਉਮੀਦ ਹੈ! ਆਪਣੇ ਖੇਤਾਂ ਦੀ ਨਿਕਾਸੀ ਜਾਂਚੋ ਤਾਂ ਜੋ ਪਾਣੀ ਭਰਣ ਨਾਲ ਰੁਟ ਰੋਟ ਅਤੇ ਫੰਗਲ ਸਮੱਸਿਆਵਾਂ ਤੋਂ ਬਚਿਆ ਜਾ ਸਕੇ।",
//         "ਮੀਂਹ ਆਉਣ ਵਾਲਾ ਹੈ! ਖਾਦ ਪਾਉਣ ਤੋਂ ਰੁਕੋ, ਕਿਉਂਕਿ ਇਹ ਧੋ ਕੇ ਬਹਿ ਸਕਦੀ ਹੈ, ਜਿਸ ਨਾਲ ਪੋਸ਼ਕ ਤੱਤ ਖ਼ਤਮ ਹੋ ਜਾਂਦੇ ਹਨ ਅਤੇ ਨੇੜਲੇ ਪਾਣੀ ਦੇ ਸਰੋਤਾਂ ਨੂੰ ਨੁਕਸਾਨ ਹੋ ਸਕਦਾ ਹੈ।",
//         "ਗੀਲੀ ਹਾਲਤ ਵਿੱਚ ਅੱਜ, ਉਹ ਕੀੜੇ ਜਿਨ੍ਹਾਂ ਨੂੰ ਈਸ਼ਾਨੀ ਵਾਲਾ ਮਾਹੌਲ ਪਸੰਦ ਹੈ, ਉਨਾਂ 'ਤੇ ਧਿਆਨ ਰੱਖੋ ਅਤੇ ਜ਼ਰੂਰੀ ਹੋਵੇ ਤਾਂ ਕਦਮ ਉਠਾਓ।"
//       ],
//       Clouds: [
//         "ਅੱਜ ਬਾਦਲ ਹਨ! ਸੂਰਜ ਸੰਵੇਦਨਸ਼ੀਲ ਪੌਧਿਆਂ 'ਤੇ ਨਜ਼ਰ ਰੱਖੋ ਅਤੇ ਜਰੂਰਤ ਦੇ ਅਨੁਸਾਰ ਲਾਈਟ ਦੀ ਲੋੜਾਂ ਨੂੰ ਅਨੁਕੂਲ ਬਣਾਓ।",
//         "ਅਸਮਾਨ ਦੇ ਬਾਦਲ ਵਾਲੇ ਮੌਸਮ ਵਿੱਚ ਪੌਧਿਆਂ ਵਿੱਚ ਠੰਡੀ ਹੋ ਸਕਦੀ ਹੈ; ਜੇ ਮਿੱਟੀ ਗੀਲੀ ਰਹਿੰਦੀ ਹੈ, ਤਾਂ ਪਾਣੀ ਦੇਣ ਦੀ ਸਮਾਂਵਾਰੀ ਘਟਾ ਸਕਦੇ ਹੋ।",
//         "ਬਾਦਲ ਫਸਲ ਦੀ ਵਾਧੀ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰ ਸਕਦੇ ਹਨ; ਜੇ ਤੁਸੀਂ ਸੰਵੇਦਨਸ਼ੀਲ ਜਾਂ ਗ्रीनਹਾਊਸ ਪੌਧੇ ਰੱਖਦੇ ਹੋ, ਤਾਂ ਅਤਿ-ਵਿਸ਼ੇਸ਼ ਰੋਸ਼ਨੀ ਦੀ ਵਰਤੋਂ ਕਰੋ।"
//       ],
//       Snow: [
//         "ਇਹ ਬਰਫਬਾਰੀ ਹੈ! ਆਪਣੇ ਗ्रीनਹਾਊਸ ਦੀ ਛੱਤ ਤੋਂ ਬਰਫ਼ ਨੂੰ ਹਟਾਓ ਤਾਂ ਜੋ ਤੁਹਾਡੇ ਪੌਧਿਆਂ ਲਈ ਸੂਰਜ ਦੀ ਰੋਸ਼ਨੀ ਵੱਧ ਸਕੇ।",
//         "ਬਰਫ਼ ਬਾਰੀ ਦੇ ਮੌਸਮ ਵਿੱਚ ਮਿੱਟੀ ਨੂੰ ਗਰਮ ਰੱਖਣ ਲਈ ਮਲਚ ਜਾਂ ਜੈਵਿਕ ਕਵਰਿੰਗ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
//         "ਪੌਧਿਆਂ ਦੀ ਜੜ ਨੂੰ ਬਚਾਉਣ ਲਈ ਇਸਨੂੰ ਢੱਕ ਕੇ ਜਾਂ ਹੋਰ ਸਮੱਗਰੀ ਨਾਲ ਇਨਸੂਲੇਟ ਕਰੋ।"
//       ],
//       Thunderstorm: [
//         "ਬਿਜਲੀ ਵਾਲਾ ਤੂਫਾਨ ਆ ਰਿਹਾ ਹੈ! ਨੌਜਵਾਨ ਪੌਧਿਆਂ ਨੂੰ ਸੁਰੱਖਿਅਤ ਕਰੋ ਜਾਂ ਉਨਾਂ ਨੂੰ ਢੱਕੋ ਤਾਂ ਜੋ ਉਹ ਨੁਕਸਾਨ ਤੋਂ ਬਚ ਸਕਣ।",
//         "ਤੂਫਾਨ ਦੌਰਾਨ ਲੰਬੇ ਧਾਤੂ ਢਾਂਚਿਆਂ ਦੇ ਨੇੜੇ ਕੰਮ ਕਰਨ ਤੋਂ ਬਚੋ ਅਤੇ ਘਰ ਦੇ ਅੰਦਰ ਸੁਰੱਖਿਅਤ ਰਹੋ।",
//         "ਤੂਫਾਨ ਨਾਲ ਭਾਰੀ ਮੀਂਹ ਹੋ ਸਕਦਾ ਹੈ; ਪਾਣੀ ਦੇ ਭਰਾਉਣ ਤੋਂ ਬਚਣ ਲਈ ਨਿਕਾਸੀ ਪ੍ਰਣਾਲੀ ਦੀ ਜਾਂਚ ਕਰੋ।"
//       ],
//       Haze: [
//         "ਅੱਜ ਦਾ ਮੌਸਮ ਧੁੰਦਲਾ ਹੈ! ਪਾਣੀ ਦੀ ਵਾਸ਼ਪੀਕਰਨ ਨੂੰ ਸੀਮਿਤ ਕਰਨ ਲਈ ਸਵੇਰੇ ਜਾਂ ਸ਼ਾਮ ਨੂੰ ਪਾਣੀ ਦਿਓ।",
//         "ਪੌਧਿਆਂ ਦੀ ਸਿਹਤ 'ਤੇ ਧਿਆਨ ਰੱਖੋ ਕਿਉਂਕਿ ਧੁੰਦ ਸੂਰਜ ਦੀ ਰੋਸ਼ਨੀ ਨੂੰ ਸੀਮਿਤ ਕਰ ਸਕਦੀ ਹੈ। ਜਰੂਰਤ ਅਨੁਸਾਰ ਜ਼ਿਆਦਾ ਰੋਸ਼ਨੀ ਦੀ ਵਰਤੋਂ ਕਰੋ।",
//         "ਜੇ ਧੁੰਦ ਚਲਦੀ ਰਹਿੰਦੀ ਹੈ, ਤਾਂ ਹਵਾ ਦੀ ਗੁਣਵੱਤਾ ਨੂੰ ਜਾਂਚੋ ਕਿਉਂਕਿ ਇਹ ਸੰਵੇਦਨਸ਼ੀਲ ਪੌਧਿਆਂ 'ਤੇ ਅਸਰ ਪਾ ਸਕਦੀ ਹੈ। ਯਕੀਨੀ ਬਣਾਓ ਕਿ ਗ्रीनਹਾਊਸ ਵਿੱਚ ਚੰਗੀ ਹਵਾਈ ਸਹੂਲਤ ਹੋ।"
//       ]
//     },
//     highlights: {
//       UVIndex: "ਯੂਵੀ ਇੰਡੈਕਸ",
//       WindStatus: "ਹਵਾ ਦੀ ਸਥਿਤੀ",
//       SunriseAndSunset: "ਸੂਰਜ ਉਠਣਾ ਅਤੇ ਡੁੱਬਨਾ",
//       Humidity: "ਨਮੀ",
//       Visibility: "ਦਿਖਾਈ ਦੇਣਾ",
//       AirQuality: "ਹਵਾ ਦੀ ਗੁਣਵੱਤਾ"
//     }
//   }
// };

// function Weather() {
//   const [weatherData, setWeatherData] = useState({});
//   const [location, setLocation] = useState('');
//   const [forecast, setForecast] = useState([]);
//   const [currentLang, setCurrentLang] = useState(localStorage.getItem("lang") || "en");
//   const locationData = useLocation(); // Assuming this is your custom hook or library

//   const weatherTips = translations[currentLang].tips;

//   useEffect(() => {
//     if (locationData.state) {
//       const locationInfo = locationData.state;
//       setLocation(locationInfo.city);
//       fetchWeather(locationInfo.city);
//       fetchForecast(locationInfo.city);
//     }
//   }, [locationData]);

//   const fetchWeather = async (city) => {
//     // Replace with actual weather API call
//     const response = await fetch(`API_URL`);
//     const data = await response.json();
//     setWeatherData(data);
//   };

//   const fetchForecast = async (city) => {
//     // Replace with actual forecast API call
//     const response = await fetch(`API_URL`);
//     const data = await response.json();
//     setForecast(data);
//   };

//   const getFormattedTime = (timestamp) => {
//     if (!timestamp) return "N/A";
//     try {
//       return format(new Date(timestamp * 1000), 'hh:mm a');
//     } catch (error) {
//       console.error("Invalid timestamp:", timestamp);
//       return "Invalid time";
//     }
//   };

//   return (
//     <div className="weather">
//       <div className="weather-details">
//         <h1>{location} {weatherData?.weather?.[0]?.main}</h1>
//         <p>{weatherTips[weatherData?.weather?.[0]?.main]}</p>
//         <div className="highlights">
//           <p>{translations[currentLang].highlights.UVIndex}: {weatherData?.main?.uvIndex}</p>
//           <p>{translations[currentLang].highlights.WindStatus}: {weatherData?.wind?.speed} km/h</p>
//           <p>{translations[currentLang].highlights.SunriseAndSunset}: 
//             <BsFillSunriseFill /> {getFormattedTime(weatherData?.sys?.sunrise)} - <BsFillSunsetFill /> {getFormattedTime(weatherData?.sys?.sunset)}
//           </p>
//           <p>{translations[currentLang].highlights.Humidity}: {weatherData?.main?.humidity}%</p>
//           <p>{translations[currentLang].highlights.Visibility}: {weatherData?.visibility / 1000} km</p>
//           <p>{translations[currentLang].highlights.AirQuality}: {weatherData?.main?.aqi}</p>
//         </div>
//       </div>
//       <ToastContainer />
//       <Forecast forecast={forecast} />
//     </div>
//   );
// }

// export default Weather;