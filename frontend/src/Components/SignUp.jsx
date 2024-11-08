import React from "react";
import "../css/signup.css";
import { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import logo from "../Assets/loginpagelogo.png";
import logoVideo from "../Assets/logoVideo.mp4";

const SignUp = () => {
  const [uname, setUname] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const usrname = uname;
    const eml = email;
    const pwd = password;
    const cpwd = cpassword;
    console.log("usrname " + usrname);
    console.log("email " + email);
    console.log("pwd " + pwd);
    console.log("cpwd " + cpwd);
    if (pwd === cpwd) {
      console.log("matched");

      const registerData = {
        username: uname,
        email: email,
        password: password,
      };
      console.log("registerData " + JSON.stringify(registerData));
      try {
        const res = await fetch(`http://localhost:5001/api/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(registerData),
        });
        const data = await res.json();
        if (res.status === 200) {
          console.log("registration succesfull");
          console.log("${data.userId} " + data.userId);
          // navigate(`/add-farm?userId=${data.userId}`);
          navigate(`/add-farm?userId=${data.userId}&fromSignup=true`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleGoogleLogin = () => {
    window.open("http://localhost:5001/auth/google", "_self");
  };
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 800) {
        setShowSignup(false); // Hide signup by default on small screens
      } else {
        setShowSignup(true); // Show signup by default on larger screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Call initially to set the state based on the current window size

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
                onChange={(e) => {
                  setUname(e.target.value);
                }}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
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
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
                onChange={(e) => {
                  setCPassword(e.target.value);
                }}
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
    </div>
  );
};

export default SignUp;
