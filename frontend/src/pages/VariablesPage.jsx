// src/pages/VariablesPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../context/QueryContext';
import './VariablesPage.css';

const availableVariables = [
  { id: 'T2M', name: 'Temperature at 2m' },
  { id: 'PRECTOTCORR', name: 'Precipitation' },
  { id: 'RH2M', name: 'Relative Humidity at 2m' },
  { id: 'WS10M', name: 'Wind Speed at 10m' },
  { id: 'WD10M', name: 'Wind Direction at 10m' },
  { id: 'PS', name: 'Surface Pressure' },
  { id: 'ALLSKY_SFC_SW_DWN', name: 'Solar Insolation' },
];

const VariablesPage = () => {
  const navigate = useNavigate();
  const { variables, setVariables } = useQuery();
  const [selected, setSelected] = useState(variables);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelected((prev) => [...prev, value]);
    } else {
      setSelected((prev) => prev.filter((v) => v !== value));
    }
  };

  const handleContinue = () => {
    setVariables(selected);
    navigate('/results');
  };

  return (
    <div className="variables-page">
      <div className="page-header">
        <h2>Select Weather Variables</h2>
        <p>Customize the weather conditions you want to analyze.</p>
      </div>
      <div className="card">
        <h3>Available Variables</h3>
        <div className="variables-grid">
          {availableVariables.map((variable) => (
            <div key={variable.id} className="checkbox-item">
              <input
                type="checkbox"
                id={variable.id}
                value={variable.id}
                checked={selected.includes(variable.id)}
                onChange={handleCheckboxChange}
              />
              <label htmlFor={variable.id}>{variable.name}</label>
            </div>
          ))}
        </div>
      </div>
       <button className="primary-btn continue-btn" onClick={handleContinue}>
        Analyze Weather →
      </button>
    </div>
  );
};

export default VariablesPage;