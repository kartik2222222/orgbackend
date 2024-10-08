import React, { useState } from 'react';


import BuildingModel from './components/buildingmodel';
import ImageUpload from './components/imageupload';

function App() {
  const [buildingId, setBuildingId] = useState('');
  const [roofArea, setRoofArea] = useState('');
  const [solarPotential, setSolarPotential] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/calculate-potential', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ buildingId, roofArea }),
      });

      const data = await response.json();
      setSolarPotential(data.solarPotential);
    } catch (error) {
      console.error('Error fetching solar potential:', error);
    }
  };

  return (
    <div>
      


    
        
      <h1>BIPV Project</h1>
      <ImageUpload />
      <BuildingModel />
    
      <h1>BIPV Potential Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Building ID:
          <input
            type="text"
            value={buildingId}
            onChange={(e) => setBuildingId(e.target.value)}
          />
        </label>
        <br />
        <label>
          Roof Area (m²):
          <input
            type="number"
            value={roofArea}
            onChange={(e) => setRoofArea(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Calculate</button>
      </form>
      {solarPotential !== null && (
        <div>
          <h2>Solar Potential: {solarPotential} W</h2>
        </div>
      )}

    </div>
  );
}

export default App;