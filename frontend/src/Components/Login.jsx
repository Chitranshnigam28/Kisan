import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../css/loginsignup.css";
import { FcGoogle } from "react-icons/fc";
import logo from "../Assets/loginpagelogo.png";
import logoVideo from "../Assets/logoVideo.mp4";
import MobileLayout from "./MobileLayout";
import Modal from "./Modal";
import "../css/mobileLayout.css";

const Login = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 800);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 800);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleContinue = () => {
    setShowLogin(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = { email, password };
                                                    
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      });
      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userId", data.userId);
        setModalType("success");
        setModalMessage("Login successful! Redirecting...");
        setIsModalOpen(true);

        // Redirect after a short delay
        setTimeout(() => {
          setIsModalOpen(false);
          navigate("/");
        }, 2000);
      } else {
        setModalType("error");
        setModalMessage(data.message || "Login failed. Please try again.");
        setIsModalOpen(true);
      }
    } catch (err) {
      console.error(err);
      setModalType("error");
      setModalMessage("An error occurred during login. Please try again.");
      setIsModalOpen(true);
    }
  };

  const handleGoogleLogin = () => {
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");
  };

  return (
    <>
      {isMobile && !showLogin ? (
        <MobileLayout handleContinue={handleContinue} />
      ) : (
        <div className="all-content">
          {isModalOpen && (
            <Modal
              message={modalMessage}
              type={modalType} 
              onClose={() => setIsModalOpen(false)}
            />
          )}


          <div className="containerlogin">
            <div className="login-items">
              <h2>Hi, Kisan</h2>
              <p className="login-subtitle">Please login to your account</p>
              <form onSubmit={handleSubmit}>
                <label htmlFor="uname">
                  Email
                  <input
                    type="text"
                    name="uname"
                    id="uname"
                    placeholder="Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    placeholder="Your Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                <button type="submit" className="authBtn">
                  Login
                </button>
                <div className="optionsWrapper">
                  <div>
                    <input type="checkbox" />
                    <p>Remember Me</p>
                  </div>
                  <p>
                    <Link to="/forgotpassword" className="forgot-password-link">
                      Forgot Password?
                    </Link>
                  </p>
                </div>
                <button onClick={handleGoogleLogin} id="googleBtn">
                  <FcGoogle id="googleIcon" /> <span>Sign in with Google</span>
                </button>
                <p id="hvact" className="signup-prompt">
                  Don't have an account?{" "}
                  <Link to="/register" className="signup-btn">
                    <b>Sign up</b>
                  </Link>
                </p>
              </form>
            </div>
          </div>
          <div className="image-logo-container">
            <img src={logo} className="logo" alt="Logo" />
            <video
              src={logoVideo}
              autoPlay
              loop
              muted
              className="background-video"
            ></video>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
