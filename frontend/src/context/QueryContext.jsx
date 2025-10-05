// src/context/QueryContext.jsx
import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const QueryContext = createContext();

export const useQuery = () => useContext(QueryContext);

export const QueryProvider = ({ children }) => {
  const [location, setLocation] = useState({ lat: 40.7128, lng: -74.0060 });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [variables, setVariables] = useState(['T2M', 'PRECTOTCORR', 'WS10M']); // Default variables
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const fetchResults = async () => {
  //   setLoading(true);
  //   setError(null);
  //   setResults(null);

  //   // Format dates to YYYYMMDD as required by NASA POWER API
  //   const formatNasaDate = (date) => {
  //       return date.toISOString().slice(0, 10).replace(/-/g, '');
  //   }

  //   const queryParams = {
  //       latitude: location.lat,
  //       longitude: location.lng,
  //       startDate: formatNasaDate(startDate),
  //       endDate: endDate ? formatNasaDate(endDate) : formatNasaDate(startDate),
  //       variables: variables,
  //   };
    
  //   try {
  //       const response = await axios.post('http://localhost:3001/api/power', queryParams);
  //       setResults(response.data);
  //   } catch (err) {
  //       setError('Failed to fetch weather data. Please try again.');
  //       console.error(err);
  //   } finally {
  //       setLoading(false);
  //   }
  // };
  const fetchResults = async (params) => {
    setLoading(true);
    setError(null);
    setResults(null);

    // Use passed params if available, otherwise use state
    const queryLocation = params?.location || location;
    const queryStartDate = params?.startDate || startDate;
    const queryEndDate = params?.endDate || endDate;

    const formatNasaDate = (date) => date.toISOString().slice(0, 10).replace(/-/g, '');

    const queryParams = {
        latitude: queryLocation.lat,
        longitude: queryLocation.lng,
        startDate: formatNasaDate(queryStartDate),
        endDate: queryEndDate ? formatNasaDate(queryEndDate) : formatNasaDate(queryStartDate),
        variables: variables,
    };
    
    try {
        const response = await axios.post('http://localhost:3001/api/power', queryParams);
        setResults(response.data);
    } catch (err) {
        setError('Failed to fetch weather data. Please try again.');
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  const value = {
    location,
    setLocation,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    variables,
    setVariables,
    results,
    loading,
    error,
    fetchResults,
  };

  return <QueryContext.Provider value={value}>{children}</QueryContext.Provider>;
};