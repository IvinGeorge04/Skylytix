// src/config/api.js

// Get the backend URL from environment variable with a fallback
export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001';

// API endpoints
export const ENDPOINTS = {
    WEATHER: `${BACKEND_URL}/api/weather`,
    HISTORICAL: `${BACKEND_URL}/api/historical`,
};------------------------------------------------------------------------------------------