import React from 'react';
import "./App.css";
import ComponentPriceGraph from './Components/CropPriceGraph';

const App = () => {
  return (
    <Router>
    <div>
      <ComponentPriceGraph crop="wheat" />
    </div>
    </Router>
  );
};

export default App;