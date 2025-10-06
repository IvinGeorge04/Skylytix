// src/pages/HomePage.jsx
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import { ENDPOINTS } from '../config/api';
import axios from 'axios'; // Import axios to make API calls
import './HomePage.css';

// A new, simpler summary component for Open-Meteo data
const ResultsSummary = ({ results }) => {
  // Extract the 'daily' data from the API response
  const { daily } = results;

  // Get the data for the first day in the forecast (index 0)
  const date = daily.time[0];
  const maxTemp = daily.temperature_2m_max[0];
  const minTemp = daily.temperature_2m_min[0];
  const precipitation = daily.precipitation_sum[0];

  return (
    <div className="results-summary-container">
      <div className="card">
        <h3>Forecast for {date}</h3>
        <div className="metrics-grid">
          <div className="metric-item"><strong>Max Temp:</strong> {maxTemp}°C</div>
          <div className="metric-item"><strong>Min Temp:</strong> {minTemp}°C</div>
          <div className="metric-item"><strong>Precipitation:</strong> {precipitation} mm</div>
        </div>
      </div>
    </div>
  );
};


const HomePage = () => {
  // State for this component
  const [localCoords, setLocalCoords] = useState('9.5916, 76.5222'); // Default to Kerala, India
  const [localDate, setLocalDate] = useState(new Date());
  
  // State for handling API response
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuery = async () => {
    const [lat, lon] = localCoords.split(',').map(coord => parseFloat(coord.trim()));
    if (isNaN(lat) || isNaN(lon)) {
      alert("Invalid coordinates. Please use the format 'lat, lon'.");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setResults(null);
      
      // Make a direct call to your new Open-Meteo backend endpoint
      const response = await axios.post(ENDPOINTS.WEATHER, {
        latitude: lat,
        longitude: lon
      });
      
      setResults(response.data);

    } catch (err) {
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>SkyLytix Weather Intelligence</h1>
        <p>Your personalized weather query engine. Get simple answers and detailed data.</p>
      </div>

      <div className="card query-card">
        <div className="query-form">
          <div className="input-group">
            <label htmlFor="location">Location Coordinates (Lat, Lon)</label>
            <input 
              type="text" 
              id="location" 
              value={localCoords}
              onChange={(e) => setLocalCoords(e.target.value)}
              placeholder="e.g., 9.5916, 76.5222" 
            />
          </div>
          <div className="input-group">
            <label>Select Date</label>
            <DatePicker 
              selected={localDate} 
              onChange={(date) => setLocalDate(date)} 
              dateFormat="MMMM d, yyyy" 
            />
          </div>
          <button className="primary-btn" onClick={handleQuery} disabled={loading}>
            {loading ? 'Analyzing...' : 'Get Forecast'}
          </button>
        </div>
      </div>
      
      {error && <div className="status-message error">{error}</div>}
      {results && !loading && <ResultsSummary results={results} />}
    </div>
  );
};

export default HomePage;