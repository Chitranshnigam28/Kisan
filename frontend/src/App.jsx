import React from 'react';
import "./App.css";
import ComponentPriceGraph from './Components/CropPriceGraph';
import ProfileSetup from './Components/ProfileSetup';
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import GMaps from './Components/GMaps';
import Weather from './Components/Weather';
const App = () => {
  return (
  <>
    <Router>
    <div>
      {/* <ProfileSetup/> */}
      
      <nav>
        <ul className='navbar'>
          <li><Link to="/charts">Charts</Link></li>
          <li><Link to='/maps'>Maps</Link></li>
          <li><Link to='/profilesetup'>Profile Setup</Link></li>
        </ul>
      </nav>
      

      <Routes>
        <Route path='/charts' element={<ComponentPriceGraph crop="wheat" />}/>
        <Route path='/maps' element={<GMaps/>}/>
        <Route path='/profilesetup' element={<ProfileSetup/>}/>
      </Routes>
    </div>
    </Router>
    <Weather/>
    </>
  );
};

export default App;