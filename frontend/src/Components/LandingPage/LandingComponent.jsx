"use client";
import React,{useState,useRef,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import { motion } from "framer-motion";
import "../../css/landingPage.css";
import backgroundHeroLanding from "../../Assets/landingPage/heroBG.webp";
import LandingPage from "../../Assets/landingPage/Dashboard.webp";
import NavbarLogo from "../../Assets/landingPage/whiteNabarlogoKisan.png";
import Feature1 from "../../Assets/landingPage/feature1.png";
import Feature2 from "../../Assets/landingPage/feature2.png";
import Feature3 from "../../Assets/landingPage/feaeture3.png";
import Feature4 from "../../Assets/landingPage/feature4.png";
import { ContainerScroll } from "./ContainerScroll";
import WheatIcon from "../../Assets/Vegetables/wheat.png";
import CornIcon from "../../Assets/Vegetables/Corn.svg";
import BarleyIcon from "../../Assets/Vegetables/barley.png";
import PeaIcon from "../../Assets/Vegetables/pea.png";
import PotatoIcon from "../../Assets/Vegetables/Potato.svg";

///////////////////////////////////
import headerImage from "../../Assets/Wonders.png";
import setupImage from "../../Assets/iPad.png";
import farmbg from "../../Assets/farmbg.png";
import chitransh from "../../Assets/team/Chitransh.png";
import shivam from "../../Assets/team/Shivam.png";
import prabh from "../../Assets/team/Prabh.png";
import falguni from "../../Assets/team/Falguni.png";
import mudit from "../../Assets/team/Mudit.png";
import dorsa from "../../Assets/team/Dorsa.png";
import tomo from "../../Assets/team/Tomo.png";
import ali from "../../Assets/team/Ali.png";
import logo from "../../Assets/Logo.png";
import FeaturesSection from "./FeatureSection";
import ipImage1 from "./../../Assets/Group 143726455.png"
import ipImage2 from "./../../Assets/Group 143726456.png"
import ipImage3 from "./../../Assets/Group 143726457.png"

const LandingComponent = () => {
  const [currentImage, setCurrentImage] = useState(null);
  const sections = useRef([]);
  const navigate=useNavigate();
  const sectionData = [
    {
      id: 'setup-farm',
      title: 'Setup your Farm',
      description:
        'Start by setting up your farm details - select your crops, location, and soil type. This helps us in generating insights you can trust.',
      image: ipImage1, // Replace with the actual image URL
    },
    {
      id: 'manage-crops',
      title: 'Manage your Crops',
      description:
        'Track the health of your crops and get real-time updates on how to care for them.',
      image: ipImage2, // Replace with the actual image URL
    },
    {
      id: 'harvest',
      title: 'Harvest Efficiently',
      description:
        'Get tips on harvesting efficiently and selling at the best prices.',
      image: ipImage3, // Replace with the actual image URL
    },
  ];

  const goToLogin=()=>{
    navigate('/login');
  }
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const section = sectionData.find((sec) => sec.id === id);
            if (section) setCurrentImage(section.image);
            entry.target.classList.add('active'); // Add active class
          } else {
            entry.target.classList.remove('active'); // Remove active class
          }
        });
      },
      { threshold: 0.6 } // Trigger when 60% of the section is visible
    );

    sections.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.current.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const handleSectionClick = (image) => {
    setCurrentImage(image);
  };
  const goToSignup=()=>{
    navigate('/register');
  }
  return (
    <>
      <div>
        {/* Navbar */}
        <nav className="landing-navbar">
          <ul className="navbar-menu">
            <img src={NavbarLogo} alt="Kisan Logo" className="logoNAvk" />
            <li className="menu-item">Features</li>
            <li className="menu-item">How it works!</li>
            <li className="prop">
               <a
    className="proposal-project"
    href="/proposal.pdf" // Relative path to the file
    download="Proposal.pdf" // Trigger file download with this name
style={{    color: "white",
    text-decoration: "none"}}  >Proposal</a>
            </li>
            <li className="menu-item">
              <button className="login-button" onClick={goToLogin}>Login</button>
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

      {/* <section className="feature-sections grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="feature-div">
          <img className="feature-image" src={Feature1} alt="Feature1" />
        </div>
        <div className="feature-div">
          <img className="feature-image" src={Feature2} alt="Feature2" />
        </div>
        <div className="feature-div">
          <img className="feature-image" src={Feature3} alt="Feature3" />
        </div>
        <div className="feature-div">
          <img className="feature-image" src={Feature4} alt="Feature4" />
        </div>
      </section> */}
      <FeaturesSection />

      <div className="landing-container">
        <header className="landing-header">
          <div className="header-content">
            <h6>Easy Multi-Language Support</h6>
            <h5>
              Kisan supports 11 major languages, making it easy for farmers
              across India to access personalized insights and recommendations.
            </h5>
          </div>
          <div class="language-options">
            <span class="language-option" data-lang="en">
              അ Malayalam
            </span>
            <span class="language-option" data-lang="hi">
              অ Bengali
            </span>
            <span class="language-option" data-lang="te">
              ಅ Kannada
            </span>
            <span class="language-option" data-lang="te">
              అ Telugu
            </span>
            <span class="language-option" data-lang="te">
              அ Tamil
            </span>
            <span class="language-option" data-lang="te">
              અ Gujarati
            </span>
            <span class="language-option" data-lang="te">
              ਅ Punjabi
            </span>
            <span class="language-option" data-lang="te">
              الف Urdu
            </span>
            <span class="language-option" data-lang="te">
              अ Hindi
            </span>
            <span class="language-option" data-lang="te">
              अ Marathi
            </span>
            <span class="language-option" data-lang="te">
              A English
            </span>
          </div>
          <img src={headerImage} alt="Header Image" className="header-image" />
        </header>

        <div className="scroll-spy-container">
          <div className="text-sections">
            <h6>How it works.</h6>
            {sectionData.map((section, index) => (
              <div
                key={section.id}
                id={section.id}
                className="text-section"
                onClick={() => handleSectionClick(section.image)}
              >
                <h4>{section.title}</h4>
                <p>{section.description}</p>
              </div>
            ))}
          </div>
          <div className="image-container">
            {currentImage && (
              <img
                src={currentImage}
                alt="Current Section"
                className="section-image"
              />
            )}
          </div>
        </div>

        <section className="section-boost">
          <div>
            <h2>Ready to Boost Your Yield?</h2>
            <p>
              Sign up now to unlock self-serve features and get started with
              Kisan Farm.
            </p>
          </div>
          <div class="image-containert">
            <img src={farmbg} alt="Setup Farm Image" class="bgfarm" />
            <button class="overlay-button" onClick={goToSignup}>Sign up Today!</button>
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

        <section className="logo">
          <img src={logo} alt="Logo" className="logo" />
        </section>
      </div>
    </>
  );
};

export default LandingComponent;
