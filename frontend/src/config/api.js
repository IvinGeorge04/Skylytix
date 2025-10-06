// src/config/api.js

// Get the backend URL from environment variable with a fallback
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// API endpoints
const ENDPOINTS = {
    WEATHER: BACKEND_URL + '/api/weather',
    HISTORICAL: BACKEND_URL + '/api/historical',
};

export { BACKEND_URL, ENDPOINTS };