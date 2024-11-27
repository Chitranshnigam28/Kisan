// import React, { useState } from 'react';
// import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
// import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
// import './../css/chatBot.css';

// const ChatBot = () => {
//   const [typing, setTyping] = useState(false);
//   const [messages, setMessages] = useState([
//     {
//       message: "Hello, I am Kisan AI, How may I assist you?",
//       sender: "ChatGPT"
//     }
//   ]);

//   const handleSend = async (message) => {
//     const newMessage = {
//       message: message,
//       sender: "User",
//       direction: "outgoing"
//     };
    
//     setMessages((prevMessages) => [...prevMessages, newMessage]);
//     setTyping(true);
    
//     await processMessageToChatGPT([...messages, newMessage]);
//   };

//   async function processMessageToChatGPT(chatMessages) {
//     try {
//       const response = await fetch("http://localhost:5001/api/chat", { // Backend URL
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ messages: chatMessages })
//       });

//       const data = await response.json();
      
//       if (data.message) {
//         const chatGPTResponse = {
//           message: data.message,
//           sender: "ChatGPT"
//         };

//         setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
//       }
//     } catch (error) {
//       console.error("Error communicating with backend:", error);
//       setMessages((prevMessages) => [
//         ...prevMessages,
//         { message: "Sorry, there was an error. Please try again.", sender: "ChatGPT" }
//       ]);
//     } finally {
//       setTyping(false);
//     }
//   }

//   return (
//     <div className="Container">
//       <MainContainer>
//         <ChatContainer>
//           <MessageList
//             scrollBehavior="smooth"
//             typingIndicator={typing ? <TypingIndicator content="Kisan AI is typing..." /> : null}
//           >
//             {messages.map((message, i) => (
//               <Message key={i} model={{ message: message.message, sender: message.sender }} />
//             ))}
//           </MessageList>
//           <MessageInput placeholder="Write your question here..." onSend={handleSend} />
//         </ChatContainer>
//       </MainContainer>
//     </div>
//   );
// };

// export default ChatBot;
import React, { useState } from 'react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import './../css/chatBot.css';
import aiicon from "../Assets/Images/aiicon.png"

const ChatBot = ({ isOpen, onClose }) => {
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      message: "Hello, I am Kisan AI, How may I assist you?",
      sender: "ChatGPT"
    }
  ]);

  const handleSend = async (message) => {
    const newMessage = {
      message: message,
      sender: "User",
      direction: "outgoing"
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setTyping(true);

    await processMessageToChatGPT([...messages, newMessage]);
  };

  async function processMessageToChatGPT(chatMessages) {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ messages: chatMessages })
      });

      const data = await response.json();

      if (data.message) {
        const chatGPTResponse = {
          message: data.message,
          sender: "ChatGPT"
        };

        setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);
      }
    } catch (error) {
      console.error("Error communicating with backend:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { message: "Sorry, there was an error. Please try again.", sender: "ChatGPT" }
      ]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <div className={`chatbot-container ${isOpen ? 'show' : ''}`}>
      <div className="chatbot-header">
        <h4><img src={aiicon}/>Ask Kisan</h4>
        {/* <button className="close-btn" onClick={onClose}>✕</button> */}
      </div>
      <MainContainer>
        <ChatContainer>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={typing ? <TypingIndicator content="Kisan AI is typing..." /> : null}
          >
            {messages.map((message, i) => (
              <div
                key={i}
                className={message.sender === "User" ? "user-message" : "ai-message"}
              >
                {message.message}
              </div>
            ))}
          </MessageList>
          <MessageInput placeholder="Write your question here..." onSend={handleSend} />
        </ChatContainer>
      </MainContainer>
    </div>
  );
};

export default ChatBot;