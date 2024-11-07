import React from "react";
import "./App.css";
import ComponentPriceGraph from "./Components/CropPriceGraph";
import ProfileSetup from "./Components/ProfileSetup";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GMaps from "./Components/GMaps";
import TranslationComponent from "./Components/TranslationComponent";
import Dashboard from "./Components/Dashboard/Dashboard";
import Weather from './Components/Weather';
import WeatherWidget from './Components/weatherWidget'
import FunFact from "./Components/FunFacts";
import Tips from './Components/Tips';
import AddFarms from "./Components/Farms/AddFarms";
import MyFarms from "./Components/Farms/MyFarms";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import CropRecommendation from "./Components/CropRecomendation";
import 'bootstrap/dist/css/bootstrap.min.css';
import PrivateRoute from "./Components/PrivateRoute";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import ForgotPassword from "./Components/ForgotPassword";



const userId = localStorage.getItem('userId');
console.log(userId);

const App = () => {
  return (
    <Router>
      <AppRoutes /> {/* Moved all routes into a new component */}
      {/* <FloatingDockDemo /> */}
    </Router>
  );
};

const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    console.log('Token received:', token);


    if (token) {
      localStorage.setItem('token', token);
      navigate('/');  // Redirect to a protected route
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<SignUp />} />
        <Route path='/profilesetup' element={<ProfileSetup />} />
        <Route path="/forgotpassword" element={<ForgotPassword/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/maps" element={<GMaps />} />
          <Route path='/charts' element={<ComponentPriceGraph crop="wheat" />} />
          <Route path="/crop-recommendation" element={<CropRecommendation ownerId={userId} />} />
          <Route path="/translate" element={<TranslationComponent />} />
          <Route path='/weather' element={<Weather />} />
          <Route path="/add-farm" element={<AddFarms />} />
          <Route path="/my-farms" element={<MyFarms />} />
          <Route path='/funfacts' element={<FunFact />} />
          <Route path='/tips' element={<Tips />} />
          <Route path="/profilesetup" element={<ProfileSetup />} />
    
        </Route>
      </Routes>
    </>
  );
};
export default App;
