import React from 'react';
import ComponentPriceGraph from './Components/CropPriceGraph';
import TranslationComponent from './Components/TranslationComponent';

const App = () => {
  return (
    <div>
      <ComponentPriceGraph crop="wheat" />
      <TranslationComponent />
    </div>
  );
};

export default App;