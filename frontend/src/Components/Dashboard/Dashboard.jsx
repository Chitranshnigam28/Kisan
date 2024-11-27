import React, { useState } from "react";
import Header from "./Header";
import "../../css/dashboard.css";
import { Footer } from "./Footer";
import Main from './Main';
import ChatBot from '../ChatBot';
import aiicon from "../../Assets/bot.png";

const Dashboard = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const toggleChatBot = () => {
    setShowChatBot((prev) => !prev);
  };

  return (
    <>
      <Header />
      {/* Conditional rendering of the button */}
      <button className="chat-toggle-btn" onClick={toggleChatBot}>
        {showChatBot ? (
          <div className="close-btn-chat">X</div>
        ) : (
          <img src={aiicon} alt="AI Icon" />
        )}
      </button>
      <div
        style={{
          filter: showOverlay ? "blur(10px)" : "none",
          transition: "filter 0.3s ease-in-out",
        }}
      >
      <Main />
      {/* Display overlay and chatbot only if open */}
      {showChatBot && <div className="background-overlay show" onClick={toggleChatBot}></div>}
      <ChatBot isOpen={showChatBot} onClose={toggleChatBot} />
      </div>
      {/* Dark Overlay */}
      {showOverlay && <div className="overlay-dark"></div>}
      <Footer setShowOverlay={setShowOverlay}/>
    </>
  );
};

export default Dashboard;
