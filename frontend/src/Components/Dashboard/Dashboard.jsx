import React from "react";
import {useState} from "react"
import Header from "./Header";
import "../../css/dashboard.css";
import { Footer } from "./Footer";
import Main from './Main'
const Dashboard = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleSetShowOverlay = setShowOverlay || (() => {});
  return (
    <>
    <Header />
    <Main />
    {showOverlay && <div className="background-overlay show" onClick={() => setShowOverlay(false)}></div>}
    <Footer setShowOverlay={handleSetShowOverlay}/>
    </>
  );
};

export default Dashboard;
