import React from 'react';
import './../css/landingPage.css'; // Assuming your CSS file is named styles.css

// Import your images here
import headerImage from './../Assets/Wonders.png';
import setupImage from './../Assets/iPad.png';
import farmbg from "./../Assets/farmbg.png"
import chitransh from "./../Assets/team/Chitransh.png"
import shivam from "./../Assets/team/Shivam.png"
import prabh from "./../Assets/team/Prabh.png"
import falguni from "./../Assets/team/Falguni.png"
import mudit from "./../Assets/team/Mudit.png"
import dorsa from "./../Assets/team/Dorsa.png"
import tomo from "./../Assets/team/Tomo.png"
import ali from "./../Assets/team/Ali.png"
import logo from "./../Assets/Logo.png"
// ... other images

const LandingPage = () => {
    return (
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
    );
};

export default LandingPage;