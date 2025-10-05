const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// --- Endpoint for FORECAST Data ---
app.post('/api/weather', async (req, res) => {
  const { latitude, longitude } = req.body;

  if (!latitude || !longitude) {
    return res.status(400).json({ error: 'Missing latitude or longitude.' });
  }

  const url = 'https://api.open-meteo.com/v1/forecast';
  const params = {
    latitude,
    longitude,
    daily: 'temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,uv_index_max',
    hourly: 'temperature_2m,relative_humidity_2m,dew_point_2m,surface_pressure,wind_speed_10m,direct_radiation,diffuse_radiation,uv_index',
    timezone: 'auto'
  };

  try {
    console.log(`Fetching FORECAST data from Open-Meteo`);
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Open-Meteo forecast data:', error.message);
    res.status(500).json({ error: 'Failed to fetch forecast weather data.' });
  }
});

// --- Endpoint for HISTORICAL Data ---
app.post('/api/historical', async (req, res) => {
  const { latitude, longitude, startDate, endDate } = req.body;

  if (!latitude || !longitude || !startDate || !endDate) {
    return res.status(400).json({ error: 'Missing required parameters.' });
  }

  const url = 'https://archive-api.open-meteo.com/v1/archive';
  const params = {
    latitude,
    longitude,
    start_date: startDate,
    end_date: endDate,
    daily: 'temperature_2m_max,precipitation_sum',
    timezone: 'auto'
  };

  try {
    console.log(`Fetching HISTORICAL data from Open-Meteo`);
    const response = await axios.get(url, { params });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching Open-Meteo historical data:', error.message);
    res.status(500).json({ error: 'Failed to fetch historical weather data.' });
  }
});

app.listen(PORT, () => {
  console.log(`SkyLytix server running on http://localhost:${PORT}`);
});

