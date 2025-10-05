import React, { useState, useEffect } from 'react';
import { useQuery } from '../context/QueryContext';
import axios from 'axios';
import './SolarDashboardPage.css';

// --- Sub-Component for UV Index & Safety ---
const UvIndexCard = ({ uvIndex }) => {
  const getUvInfo = (uv) => {
    if (uv <= 2) return { level: 'Low', color: '#8BC34A', precautions: ['Minimal sun protection required.'] };
    if (uv <= 5) return { level: 'Moderate', color: '#FFC107', precautions: ['Wear sunglasses and use sunscreen (SPF 30+).'] };
    if (uv <= 7) return { level: 'High', color: '#FF9800', precautions: ['Seek shade during midday hours.', 'Wear protective clothing.'] };
    if (uv <= 10) return { level: 'Very High', color: '#F4511E', precautions: ['Wear sunscreen (SPF 30+).', 'Seek shade during midday.', 'Wear protective clothing.'] };
    return { level: 'Extreme', color: '#D32F2F', precautions: ['Take all precautions.', 'Unprotected skin can burn in minutes.'] };
  };

  const uvInfo = getUvInfo(uvIndex);

  return (
    <div className="solar-card">
      <h3 className="card-title uv-title">UV Index & Safety</h3>
      <div className="uv-display" style={{ background: `linear-gradient(to top, ${uvInfo.color}, #f5f5f5 300%)` }}>
        <span className="uv-label">UV Index at Noon</span>
        <span className="uv-value">{Math.round(uvIndex)}</span>
        <span className="uv-level">{uvInfo.level}</span>
      </div>
      <div className="safety-precautions">
        <h4>Safety Precautions:</h4>
        <ul>
          {uvInfo.precautions.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
};

// --- Sub-Component for Solar Insolation ---
const SolarInsolationCard = ({ direct, diffuse }) => (
  <div className="solar-card">
    <h3 className="card-title solar-title">Solar Insolation</h3>
    <div className="radiation-box">
      <span className="radiation-label">Direct Radiation at Noon</span>
      <span className="radiation-value">{Math.round(direct)} W/m²</span>
    </div>
    <div className="radiation-box">
      <span className="radiation-label">Diffuse Radiation at Noon</span>
      <span className="radiation-value">{Math.round(diffuse)} W/m²</span>
    </div>
    <p className="solar-note">Forecasted peak conditions for solar energy generation</p>
  </div>
);

// --- Main Page Component ---
const SolarDashboardPage = () => {
  const { location, startDate } = useQuery();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location || typeof location.lat !== 'number') {
      setError("Please select a location first.");
      setLoading(false);
      return;
    }
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        const response = await axios.post('http://localhost:3001/api/weather', {
          latitude: location.lat,
          longitude: location.lng,
        });
        setWeatherData(response.data);
      } catch (err) {
        setError('Failed to fetch solar data.');
      } finally {
        setLoading(false);
      }
    };
    fetchWeatherData();
  }, [location]);

  if (loading) return <div className="status-message">Loading Solar Dashboard...</div>;
  if (error) return <div className="status-message error">{error}</div>;
  if (!weatherData) return <div className="status-message">No data available.</div>;

  const { hourly } = weatherData;
  const targetDate = new Date(startDate);
  targetDate.setHours(12, 0, 0, 0);
  const targetHourISO = targetDate.toISOString().slice(0, 13) + ":00";
  const targetIndex = hourly.time.findIndex(t => t === targetHourISO);
  const dataIndex = targetIndex !== -1 ? targetIndex : 12; // Default to noon
  
  const directRadiation = hourly.direct_radiation[dataIndex] || 0;
  const diffuseRadiation = hourly.diffuse_radiation[dataIndex] || 0;
  const uvIndex = hourly.uv_index[dataIndex] || 0;

  return (
    <div className="solar-dashboard-page">
      <div className="page-header">
        <h1>Solar & Radiative Dashboard</h1>
        <p>Solar forecast for {startDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
      </div>
      <div className="dashboard-grid">
        <SolarInsolationCard direct={directRadiation} diffuse={diffuseRadiation} />
        <UvIndexCard uvIndex={uvIndex} />
      </div>
    </div>
  );
};

export default SolarDashboardPage;
