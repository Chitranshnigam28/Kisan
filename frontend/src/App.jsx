import React from 'react';
import "./App.css";
import ComponentPriceGraph from './Components/CropPriceGraph';
import {BrowserRouter as Router, Routes,Route,Link} from 'react-router-dom';
import GMaps from './Components/GMaps';

const App = () => {
  return (
    <Router>
    <div>
      
      <nav>
        <ul className='navbar'>
          <li><Link to="/charts">Charts</Link></li>
          <li><Link to='/maps'>Maps</Link></li>
        </ul>
      </nav>
      

      <Routes>
        <Route path='/charts' element={<ComponentPriceGraph crop="wheat" />}/>
        <Route path='/maps' element={<GMaps/>}/>
      </Routes>
    </div>
    </Router>
  );
};

export default App;