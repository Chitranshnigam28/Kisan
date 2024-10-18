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


const App = () => {
  return (
  <>  
    <Router>
      <div>
        <Routes>
        <Route path='/charts' element={<ComponentPriceGraph crop="wheat" />}/>
          <Route path="/maps" element={<GMaps />} />
          <Route path="/profilesetup" element={<ProfileSetup />} />
          <Route path="/translate" element={<TranslationComponent />} />
          <Route path="/" element={<Dashboard />} />
          <Route path='/weather' element={<Weather />}/>
          <Route path='/funfacts' element={<FunFact />}/>
          <Route path='/tips' element={<Tips />}/>
        </Routes>
      </div>
    </Router>
    </>
  );
};

export default App;
