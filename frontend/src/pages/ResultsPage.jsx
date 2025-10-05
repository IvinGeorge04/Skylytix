import React, { useState, useEffect } from 'react';
import { useQuery } from '../context/QueryContext';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import './ResultsPage.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const ResultsPage = () => {
  const { location } = useQuery();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch data if a valid location is selected
    if (!location || typeof location.lat !== 'number') {
      setError("Please select a location first.");
      setLoading(false);
      return;
    }

    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        // Call the forecast endpoint on your server
        const response = await axios.post('http://localhost:3001/api/weather', {
          latitude: location.lat,
          longitude: location.lng
        });
        setWeatherData(response.data);
      } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [location]);

  if (loading) return <div className="status-message">Loading Weather Insights...</div>;
  if (error) return <div className="status-message error">{error}</div>;
  if (!weatherData) return <div className="status-message">No data available.</div>;
  
  // --- Data parsing for Open-Meteo ---
  const { daily } = weatherData;
  const chartData = {
      labels: daily.time,
      datasets: [
          {
              label: 'Maximum Temperature (°C)',
              data: daily.temperature_2m_max,
              borderColor: '#E24A4A',
              backgroundColor: 'rgba(226, 74, 74, 0.2)',
              fill: true
          },
          {
              label: 'Minimum Temperature (°C)',
              data: daily.temperature_2m_min,
              borderColor: '#4A90E2',
              backgroundColor: 'rgba(74, 144, 226, 0.2)',
              fill: true
          }
      ]
  };

  const summaryText = `The forecast for ${daily.time[0]} shows a high of ${daily.temperature_2m_max[0]}°C and a low of ${daily.temperature_2m_min[0]}°C, with ${daily.precipitation_sum[0]} mm of precipitation expected.`;
  
  return (
    <div className="results-page">
      <div className="page-header">
        <h2>Weather Forecast</h2>
        <p>Displaying results for: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</p>
      </div>
      
      <div className="results-grid">
        <div className="card summary-card">
            <h3>Forecast Summary</h3>
            <p>{summaryText}</p>
        </div>

        <div className="card chart-card">
            <h3>7-Day Temperature Trend</h3>
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' }}}} />
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;
