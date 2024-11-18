import React, { useState } from "react";
import Header from "./Header";
import "../../css/dashboard.css";
import { Footer } from "./Footer";
import Main from './Main';
import ChatBot from '../ChatBot';
import aiicon from "../../Assets/Images/aiicon.png";

const Dashboard = () => {
  const [showChatBot, setShowChatBot] = useState(false);

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
      <Main />
      {/* Display overlay and chatbot only if open */}
      {showChatBot && <div className="background-overlay show" onClick={toggleChatBot}></div>}
      <ChatBot isOpen={showChatBot} onClose={toggleChatBot} />
      <Footer />
    </>
  );
};

export default Dashboard;
