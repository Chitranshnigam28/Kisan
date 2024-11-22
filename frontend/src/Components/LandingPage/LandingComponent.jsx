"use client";
import React from "react";
import { motion } from "framer-motion";
import "../../css/landingPage.css";
import backgroundHeroLanding from "../../Assets/landingPage/heroBG.webp";
import LandingPage from "../../Assets/landingPage/Dashboard.webp";
import NavbarLogo from "../../Assets/Logo/Logo.png";
import { ContainerScroll } from "./ContainerScroll";
import WheatIcon from "../../Assets/Vegetables/wheat.png";
import CornIcon from "../../Assets/Vegetables/Corn.svg";
import BarleyIcon from "../../Assets/Vegetables/barley.png";
import PeaIcon from "../../Assets/Vegetables/pea.png";
import PotatoIcon from "../../Assets/Vegetables/Potato.svg";


///////////////////////////////////
import headerImage from '../../Assets/Wonders.png';
import setupImage from '../../Assets/iPad.png';
import farmbg from "../../Assets/farmbg.png"
import chitransh from "../../Assets/team/Chitransh.png"
import shivam from "../../Assets/team/Shivam.png"
import prabh from "../../Assets/team/Prabh.png"
import falguni from "../../Assets/team/Falguni.png"
import mudit from "../../Assets/team/Mudit.png"
import dorsa from "../../Assets/team/Dorsa.png"
import tomo from "../../Assets/team/Tomo.png"
import ali from "../../Assets/team/Ali.png"
import logo from "../../Assets/Logo.png"

const LandingComponent = () => {
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="landing-navbar">
          <ul className="navbar-menu">
            <img
              src={NavbarLogo}
              alt="Kisan Logo"
              className="logoNAvk"
              // style={{ background: "white" }}
            />
            <li className="menu-item">Features</li>
            <li className="menu-item">How it works!</li>
            <li className="prop">
              <button className="proposal-project">Proposal</button>
            </li>
            <li className="menu-item">
              <button className="login-button">Login</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hero Section */}
      <section
        className="landing-page"
        style={{ backgroundImage: `url(${backgroundHeroLanding})` }}
      >
        {/* Hero Section Animation */}
        <motion.div
          className="hero-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="hero-images">
            {/* Crop icons */}
            {/* <img src={WheatIcon} alt="Wheat" className="crop-icon wheat" />
            <img src={CornIcon} alt="Corn" className="crop-icon corn" />
            <img src={BarleyIcon} alt="Barley" className="crop-icon barley" />
            <img src={PeaIcon} alt="Pea" className="crop-icon pea" />
            <img src={PotatoIcon} alt="Potato" className="crop-icon potato" /> */}
          </div>

          {/* Hero Title */}
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            Grow the <br />
            Right Crops <br />
            with Real-Time Insights
          </motion.h1>
        </motion.div>

        {/* Main Content */}
        <ContainerScroll>
          <div className="dashboard-container">
            <img
              src={LandingPage}
              alt="Dashboard Preview"
              className="dashboard-image"
            />
          </div>
        </ContainerScroll>

        {/* Text Below Hero Section */}
        <motion.div
          className="hero-description"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <p className="description-text">
            We enable farmers to cultivate smarter decisions by providing
            data-driven insights, personalized crop recommendations, and market
            updates all with transparency and efficiency at the core.
          </p>
        </motion.div>
      </section>

      <div className="container">
            <header className="header">
                <div className="header-content">
                    <h6>Easy Multi-Language Support</h6>
                    <h5>Kisan supports 11 major languages, making it easy for farmers across India to access personalized insights and recommendations.</h5>
                </div>
                <div class="language-options">
                    <span class="language-option" data-lang="en">അ Malayalam</span>
                    <span class="language-option" data-lang="hi">অ Bengali</span>
                    <span class="language-option" data-lang="te">ಅ Kannada</span>
                    <span class="language-option" data-lang="te">అ Telugu</span>
                    <span class="language-option" data-lang="te">அ Tamil</span>
                    <span class="language-option" data-lang="te">અ Gujarati</span>
                    <span class="language-option" data-lang="te">ਅ Punjabi</span>
                    <span class="language-option" data-lang="te">الف Urdu</span>
                    <span class="language-option" data-lang="te">अ Hindi</span>
                    <span class="language-option" data-lang="te">अ Marathi</span>
                    <span class="language-option" data-lang="te">A English</span>
                </div>
                <img src={headerImage} alt="Header Image" className="header-image" />

            </header>

            <section className="section-setup">
                <div>
                    <h6>How it works.</h6>
                    <h4>Setup your Farm</h4>
                    <p>Start by setting up your farm details - select your crops, location, and soil type. This helps us in generating insights you can trust.</p>
                </div>
                <div class="image-containerp">
                    <img src={setupImage} alt="Setup Farm Image" className="section-image" />
                </div>
            </section>

            <section className="section-boost">
                <div>
                <h2>Ready to Boost Your Yield?</h2>
                <p>Sign up now to unlock self-serve features and get started with Kisan Farm.</p>
                </div>
                <div class="image-container">
                    <img src={farmbg} alt="Setup Farm Image" class="bgfarm" />
                    <button class="overlay-button">Sign up Today!</button>
                </div>
            </section>

            <section className="section-team">
                <h2>Meet the people who make up Kisan</h2>
                <div className="team-members">
                    <div className="team-member">
                        <img src={chitransh} alt="Setup Farm Image" class="teamImage" />
                        <h3>Chitransh Nigam</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="team-member">
                        <img src={shivam} alt="Setup Farm Image" class="teamImage" />
                        <h3>Shivam</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="team-member">
                        <img src={prabh} alt="Setup Farm Image" class="teamImage" />
                        <h3>Prabh Singh</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="team-member">
                        <img src={falguni} alt="Setup Farm Image" class="teamImage" />
                        <h3>Falguni Saini</h3>
                        <p>Full Stack Developer</p>
                    </div>
                    <div className="team-member">
                        <img src={mudit} alt="Setup Farm Image" class="teamImage" />
                        <h3>Mudit Dhangar</h3>
                        <p>PM/ UI UX Designer</p>
                    </div>
                    <div className="team-member">
                        <img src={dorsa} alt="Setup Farm Image" class="teamImage" />
                        <h3>Dorsa Ghorbani</h3>
                        <p>UI UX Designer</p>
                    </div>
                    <div className="team-member">
                        <img src={tomo} alt="Setup Farm Image" class="teamImage" />
                        <h3>Tomohiro</h3>
                        <p>UI Designer</p>
                    </div>
                    <div className="team-member">
                        <img src={ali} alt="Setup Farm Image" class="teamImage" />
                        <h3>Ali Teimouri</h3>
                        <p>UI UX Designer</p>
                    </div>
                    {/* Add more team members as needed */}
                </div>
            </section>

            <section className='logo'>
                <img src={logo} alt="Logo" className='logo'/>
            </section>
        </div>
    </>
    
  );
};

export default LandingComponent;
