import React, { useState, useEffect } from "react";
import "../css/signup.css";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../Assets/loginpagelogo.png";
import logoVideo from "../Assets/logoVideo.mp4";
import Modal from "./Modal";

const SignUp = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const [modalMessage, setModalMessage] = useState(""); 
  const [modalType, setModalType] = useState(""); 
  const [showModal, setShowModal] = useState(false); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (password !== cpassword) {
      setModalMessage("Passwords do not match. Please check your passwords.");
      setModalType("error");
      setShowModal(true);
      return;
    }
  
    const registerData = {
      username: uname,
      email: email,
      password: password,
    };
  
    console.log("Sending request with data: ", registerData);
  
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
  
      const data = await res.json();
      console.log("Response status:", res.status);
      console.log("Response data:", data);
  
      if (res.status === 400) {
        setModalMessage(data.message || "Email already exists. Please try again with a different email");
        setModalType("error");
        setShowModal(true);
      } else if (res.status === 200) {
        setModalMessage("Registration successful!");
        setModalType("success");
        setShowModal(true);
  
        setTimeout(() => {
          navigate(`/add-farm?userId=${data.userId}`);
        }, 1000); 
      } else {
        setModalMessage("An error occurred while signing up. Please try again.");
        setModalType("error");
        setShowModal(true);
      }
    } catch (error) {
      console.log("Error:", error);
      setModalMessage("An error occurred while signing up. Please try again.");
      setModalType("error");
      setShowModal(true);
    }
  };
  
  
  
  const handleGoogleLogin = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setShowSignup(false); 
      } else {
        setShowSignup(true); 
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="container-signup">
      <div className="signup-items">
        <div className="containersignup">
          <h3>Create Your Account</h3>
          <p style={{ color: "#818898", fontWeight: 400 }}>
            Please Enter your account details
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="uname">
              Name
              <input
                type="text"
                name="uname"
                placeholder="Your Name"
                id="uname"
                value={uname}
                onChange={(e) => setUname(e.target.value)}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                type="text"
                name="email"
                placeholder="Your Email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label htmlFor="password">
              Create Password
              <input
                type="password"
                placeholder="Your Password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <label htmlFor="password">
              Confirm Password
              <input
                type="password"
                placeholder="Re-Enter Password"
                name="password"
                id="password"
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              />
            </label>
            <p id="hvact" style={{ color: "#818898", fontWeight: 600 }}>
              By creating an account, you agree to our Privacy Policy
            </p>

            <button type="submit" className="authBtn">
              Next
            </button>
            <p id="hvact" style={{ color: "#818898", fontWeight: 600 }}>
              Already have an account?{" "}
              <Link to="/login" className="logIn-btn">
                <b>Log In</b>
              </Link>
            </p>
            <div className="or-signin"></div>
            <button onClick={handleGoogleLogin} id="googleBtn">
              <FcGoogle id="googleIcon" /> <span>Sign in with Google</span>
            </button>
          </form>
        </div>
      </div>
      <div className="imagelogo-container-signup">
        <img src={logo} className="logo" alt="Logo" />
        <video
          src={logoVideo}
          autoPlay
          loop
          muted
          className="background-video"
        ></video>
      </div>

      {showModal && (
        <Modal message={modalMessage} type={modalType} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default SignUp;
