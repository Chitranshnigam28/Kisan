import React from "react";
import "./App.css";
import ComponentPriceGraph from "./Components/CropPriceGraph";
import ProfileSetup from "./Components/ProfileSetup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GMaps from "./Components/GMaps";
import TranslationComponent from "./Components/TranslationComponent";
import Dashboard from "./Components/Dashboard/Dashboard";
import Weather from './Components/Weather';
import FunFact from "./Components/FunFacts";
import Tips from './Components/Tips';

import AddFarms from "./Components/Farms/AddFarms";
import MyFarms from "./Components/Farms/MyFarms";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import CropRecommendation from "./Components/CropRecomendation";
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
  <>  
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path='/charts' element={<ComponentPriceGraph crop="wheat" />}/>
          <Route path="/maps" element={<GMaps />} />
          <Route path="/profilesetup" element={<ProfileSetup />} />
          <Route path="/translate" element={<TranslationComponent />} />
          <Route path='/weather' element={<Weather />}/>
          <Route path='/funfacts' element={<FunFact />}/>
          <Route path='/tips' element={<Tips />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<SignUp />}/>

          <Route path="/add-farm" element={<AddFarms />} />
          <Route path="/my-farms" element={<MyFarms />} />
        </Routes>
        <CropRecommendation />
      </div>
    </Router>
    </>
  );
};

export default App;
