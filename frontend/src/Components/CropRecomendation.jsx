// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PropTypes from 'prop-types'; // For prop validation

// const CropRecommendation = ({ ownerId }) => {
//   const [farmDetails, setFarmDetails] = useState(null);
//   const [error, setError] = useState(null);
//   const [step, setStep] = useState(1); 

//   // Function to fetch farm and crop recommendation
//   const fetchFarmAndCropRecommendation = async () => {
//     try {
//       const ownerId = localStorage.getItem('userId');
//       console.log(ownerId, '+++++++++++++++++++++++++++++++++++++------------------------')
//       // Check if ownerId is defined
//       if (!ownerId) {
//         throw new Error('Owner ID is undefined');
//       } else {
//         console.log(ownerId)
//       }

//       const response = await axios.get(`http://localhost:5001/api/recommend-crop/${ownerId}`);
//       setFarmDetails(response.data);
//     } catch (error) {
//       console.error('Error fetching farm details:', error);
//       setError(error.message);
//     }
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     fetchFarmAndCropRecommendation();
//   }, [ownerId]);

//   // Handling loading and error states
//   if (error) return <p>{error}</p>;
//   if (!farmDetails) return <p>Loading...</p>;

//   return (
//     <div className="crWrapper">
//       <div className="farmImgWrapper">
//         <img src="./cucumberFarm.webp" id="featureImage" />

//         <div className="fieldIconWrapper">
//           <h2 id="farmName">{farmDetails.farmName} Farm</h2>
//           <img src="./tomato.png" alt="" id="fieldImage" />
//         </div>
//       </div>
//       <div className="wrcsWrapper">
//         <div className="soilWrapper">
//           <img src="./loamySoil.png" />
//           <p><span className="attrHeading"><span className="attrHeading">Soil:</span></span> <br/>{farmDetails.soilType}</p></div>
//         <div className="waterWrapper">
//           <img src="./Water.png" />
//           <p><span className="attrHeading">Water Source:</span> {farmDetails.waterSource}</p>
//         </div>
//         <div className="rcWrapper"><p><span className="attrHeading">Recommended Crop:</span> {farmDetails.recommendedCrop}</p></div>
//       </div>
//     </div>
//   );
// };

// // Prop validation
// CropRecommendation.propTypes = {
//   ownerId: PropTypes.string.isRequired, // Ensure ownerId is a required string
// };

// export default CropRecommendation;
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; // For prop validation
import barleyImg from "../Assets/Vegetables/barley.png";
import bitterGourdImg from "../Assets/Vegetables/bitter-gourd.png";
import cabbageImg from "../Assets/Vegetables/cabbage.png";
import cauliflowerImg from "../Assets/Vegetables/cauliflower.png";
import coffeeBeansImg from "../Assets/Vegetables/coffee-beans.png";
// import cornImg from "../Assets/Vegetables/Corn.svg";
import eggplantImg from "../Assets/Vegetables/eggplant.png";
import garlicImg from "../Assets/Vegetables/garlic.png";
import greenTeaImg from "../Assets/Vegetables/green-tea.png";
import jowarImg from "../Assets/Vegetables/jowar.png";
import cornImg from "../Assets/Vegetables/Corn.png";
import maizeAi from "../Assets/Vegetables/MaizeAi.png"
import onionImg from "../Assets/Vegetables/onion.png";
import peaImg from "../Assets/Vegetables/pea.png";
import potatoImg from "../Assets/Vegetables/potatobg.png";
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
import placeholderImg from "../Assets/Images/placeholderImage.webp";
import aiIcon from "../Assets/Images/aiicon.png";
import { FaSeedling, FaWater, FaLeaf,FaTint,FaArrowLeft,FaStore } from 'react-icons/fa';
import { GiMining} from 'react-icons/gi';

// Map crop names to images
const cropImageMap = {
  "Barley": barleyImg,
  "Bitter Gourd": bitterGourdImg,
  "Cabbage": cabbageImg,
  "Cauliflower": cauliflowerImg,
  "Coffee Beans": coffeeBeansImg,
  "Corn": cornImg,
  "Eggplant": eggplantImg,
  "Garlic": garlicImg,
  "Green Tea": greenTeaImg,
  "Jowar": jowarImg,
  "Maize": maizeAi,
  "Onion": onionImg,
  "Pea": peaImg,
  "Potato": potatoImg,
  "Pumpkin": pumpkinImg,
  "Sesame": sesameImg,
  "Soy": soyImg,
  "Soybean": soybeanImg,
  "Spinach": spinachImg,
  "Sugarcane": sugarCaneImg,
  "Tobacco": tobaccoImg,
  "Tomato": tomatoImg,
  "Wheat": wheatImg,
  "Bajra": bajra,
  "Cotton": cotton,
  "Rice": rice,
  "Ragi": ragi,
  "Groundnut": groundnut
};

const soilImg={
  "Sandy":<FaLeaf style={{ color: '#FFC107', fontSize: '24px' }}/>,
  "Clay":<FaWater style={{ color: '#2196F3', fontSize: '24px' }} />,
  "Loamy": <FaSeedling style={{ color: '#4CAF50', fontSize: '24px' }} />
}
const CropRecommendation = ({ ownerId }) => {
  const [farmDetails, setFarmDetails] = useState(null);
  const [farms, setFarms] = useState([]); // For multiple farms
  const [selectedFarm, setSelectedFarm] = useState(null);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1); // Step control
  

  // Ref for the farmCardWrapper div to control scroll
  const farmCardWrapperRef = useRef(null);

  // Function to fetch all farms
  const fetchFarms = async () => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      
      if (!token || !userId) {
        throw new Error("Authorization token or User ID not found");
      }

      const response = await axios.get("http://localhost:5001/api/farms", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userFarms = response.data.filter(farm => farm.owner === userId);
      setFarms(userFarms);
    } catch (error) {
      console.error('Error fetching farms:', error);
      setError(error.message);
    }
  };

  // Function to fetch crop recommendation for a specific farm
  const fetchCropRecommendation = async (farmId) => {
    try {
      const ownerId = localStorage.getItem('userId'); // Retrieve ownerId from local storage

      if (!ownerId) {
        throw new Error('Owner ID is undefined or not found in local storage');
      }
  
      console.log('Fetching recommendation for owner ID:', ownerId); // Debug log

    const response = await axios.get(`http://localhost:5001/api/recommend-crop/${ownerId}`);
    console.log('Crop recommendation response:', response.data); // Debug log
    setFarmDetails(response.data);
    } catch (error) {
      console.error('Error fetching crop recommendation:', error);
      setError(error.message);
    }
  };

  // Fetch farms on component mount
  useEffect(() => {
    fetchFarms();
  }, []);


  const closeRecommendationFlow = () => {
    setStep(1); // Reset to the first step or exit the flow
    
  };

  // Select a farm and move to the next step
  const handleSelectFarm = (farm) => {
    setSelectedFarm(farm);
    setStep(2);
  };

  // Handle recommending crops for the selected farm
  const handleRecommendCrops = async () => {
    if (selectedFarm) {
      await fetchCropRecommendation();
      setStep(3);
      
    }
  };

  // Scroll the farmCardWrapper to the left
  const scrollLeft = () => {
    farmCardWrapperRef.current.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
  };

  // Scroll the farmCardWrapper to the right
  const scrollRight = () => {
    farmCardWrapperRef.current.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
  };

  // Error and loading states
  if (error) return <p>{error}</p>;

  return (
    
    <div className="crWrapper">
         
      {step === 1 && (
        <div>
          <div className="carouselHeaderWrapper">
            <h4>Choose your farms where<br/> you want to grow a crop?</h4>
            <div className="carouselBtnWrapper">
              <button className="carousel-button left" onClick={scrollLeft}><img src="./buttons/leftBtn.png" alt="Scroll Left" /></button>
              <button className="carousel-button right" onClick={scrollRight}><img src="./buttons/rightBtn.png" alt="Scroll Right" /></button>
            </div>
          </div>
          <div className="carousel">
            <div className="farmCardWrapper" ref={farmCardWrapperRef}>
              {farms.length > 0 ? (
                farms.map((farm) => (<>
                  
                  <div key={farm._id} onClick={() => handleSelectFarm(farm)} className="farm-card-cr">
                    <img src={placeholderImg} alt="placeholderImg" className="placeholderImg"/>
                    <div className="farmTitleSizeImgWrapper">
                      <div className="farmTitleSize">
                        <p>{farm.farmName}</p>
                        <p>{farm.sizeOfFarm} HA</p>
                      </div>
                                        <img src={cropImageMap[farm.cropName] || "./default-image.png"} alt={farm.cropName} className="cropImage"/>
                    </div>
                  
                  </div>
                  </>
                ))
              ) : (
                <p>No farms found. Please add a farm to proceed.</p>
              )}
            </div>
          </div>
        </div>
      )}
      
      {step === 2 && selectedFarm && (
        <div className="farm-details">
          <h4>Overview</h4>
          <div className="farm-card-ov">
            <div className="farmCardWrapper" ref={farmCardWrapperRef}>
            
            
                    <div key={selectedFarm._id}  className="farm-card-cr">
                      <img src={placeholderImg} alt="placeholderImg" className="placeholderImg"/>
                      <div className="farmTitleSizeImgWrapper">
                        <div className="farmTitleSize">
                          <p>{selectedFarm.farmName}</p>
                          <p>{selectedFarm.sizeOfFarm} HA</p>
                        </div>
                                          <img src={cropImageMap[selectedFarm.cropName] || "./default-image.png"} alt={selectedFarm.cropName} className="cropImage"/>
                      </div>
            
                    </div>
            
            
              </div>
            {/* <h2>{selectedFarm.farmName} Details</h2> */}
            <div className="ov-details">
              <div className="soilWrapper">
                {soilImg[selectedFarm.soilType]}
              <div className="ovDetailsWrapper">
                <p><strong>Soil:</strong> {selectedFarm.soilType}</p>
              </div>
              </div>
              <div className="waterWrapper">
                <FaTint style={{ color: '#2196F3', fontSize: '24px' }} />
                <div className="ovDetailsWrapper">
                  <p><strong>Water Source:</strong> {selectedFarm.waterSource}</p>
                </div>
              </div>
              <div className="farmingMethodWrapper">
              <FaSeedling style={{ color: '#4CAF50', fontSize: '24px' }} />
                <div className="ovDetailsWrapper">
                  <p><strong>Farming Method:</strong> {selectedFarm.farmingMethod}</p>
                </div>
              </div>
              
            </div>
            <div className="crBtnWrapper">
                <button onClick={() => setStep(1)}><FaArrowLeft style={{ color: '#FFF', fontSize: '24px' }} /><span>Go Back</span></button>

                  
                  <button onClick={handleRecommendCrops}><img src={aiIcon} alt="" /> <span className="rcBtn">Recommend Crops</span></button>
                
              </div>
                    </div>
          </div>
      )}
      
      {step === 3 && farmDetails && (
        <div className="crop-recommendation-result">
          <h4><img src={aiIcon} alt="" />You should Grow!</h4>
          
           {console.log(farmDetails)}
            <div className="rcWrapper">
              <div className="rcImgText">
              {console.log("img step 3 "+cropImageMap[JSON.parse(farmDetails.recommendedCrop)[0]])}
                <img src={cropImageMap[JSON.parse(farmDetails.recommendedCrop)[0]]} alt="" />
                <p> {JSON.parse(farmDetails.recommendedCrop)[0]}</p>
              </div>
              <div className="rcDetails">
                <div className="seedCost">
                <FaSeedling style={{ color: '#4CAF50', fontSize: '24px' }} />
                  <div className="seedText">
                    <p>Seed Cost</p>
                    <p>{JSON.parse(farmDetails.recommendedCrop)[1]}/Qt</p>
                  </div>
                </div>
                <div className="harvest">
                <GiMining style={{ fontSize: '24px', color: '#A0522D' }} />
                  <div className="seedText">
                    <p>Harvest Period</p>
                    <p>{JSON.parse(farmDetails.recommendedCrop)[2]}</p>
                  </div></div>
                <div className="currMarketPrice">
                <FaStore style={{ fontSize: '24px', color: '#FFA500' }} />
                  <div className="seedText">
                    <p>Current Market Price</p>
                    <p>{JSON.parse(farmDetails.recommendedCrop)[3]}/Qt</p>
                  </div>
                </div>
              </div>
            </div>

          {/* <button onClick={() => setStep(1)}>Start Over</button> */}
        </div>
      )}
    </div>
  );
};

// Prop validation
CropRecommendation.propTypes = {
  ownerId: PropTypes.string.isRequired,
};

export default CropRecommendation;