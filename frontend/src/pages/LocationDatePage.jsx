// src/pages/LocationDatePage.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '../context/QueryContext'; // 1. Import useQuery

import 'leaflet/dist/leaflet.css';
import 'react-datepicker/dist/react-datepicker.css';
import L from 'leaflet';

import './LocationDatePage.css';

// Fix for default marker icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


const LocationMarker = ({ position, setPosition }) => {
  const map = useMapEvents({
    click(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}></Marker>
  );
};

const LocationDatePage = () => {
  // 2. Get the context setters
  const { location, setLocation, startDate, setStartDate, endDate, setEndDate } = useQuery();
  const navigate = useNavigate();

  // Local state to manage the map marker position
  const [position, setPosition] = useState(location);


  // 3. CORRECTED handleContinue function
  const handleContinue = () => {
    // Save the selected data to the global context
    setLocation(position);
    // The startDate and endDate are already updated in context via their onChange handlers
    
    // Navigate to the next page in the workflow
    navigate('/select-variables');
  };

  return (
    <div className="location-date-page">
      <div className="page-header">
        <h2>Select Location & Date</h2>
        <p>Choose where and when you want to check weather conditions</p>
      </div>
      <div className="content-grid">
        <div className="location-selection">
          <div className="card">
            <h3>Location Selection</h3>
            <div className="input-group">
              <label htmlFor="search">Search Location</label>
              <input type="text" id="search" placeholder="Click on the map to select a location" readOnly />
            </div>
            <div className="map-wrapper">
              <MapContainer center={position} zoom={10} scrollWheelZoom={true} style={{ height: '350px', width: '100%', borderRadius: '8px' }}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker position={position} setPosition={setPosition} />
              </MapContainer>
            </div>
          </div>
        </div>
        <div className="right-panel">
          <div className="date-selection card">
            <h3>Date Selection</h3>
            <div className="input-group">
              <label>Start Date</label>
              {/* Ensure DatePicker updates the global context directly */}
              <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} dateFormat="MMMM d, yyyy" className="date-picker-input"/>
            </div>
            <div className="input-group">
              <label>End Date (Optional)</label>
               <DatePicker selected={endDate} onChange={(date) => setEndDate(date)} dateFormat="MMMM d, yyyy" placeholderText="Select end date" isClearable className="date-picker-input"/>
            </div>
          </div>
          <div className="query-summary card">
            <h3>Query Summary</h3>
            <p><strong>Location:</strong> {position ? 'Selected on map' : 'Not selected'}</p>
            <p><strong>Coordinates:</strong> {position ? `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}` : 'N/A'}</p>
            <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
            {endDate && <p><strong>End Date:</strong> {endDate.toLocaleDateString()}</p>}
          </div>
          <button className="primary-btn" onClick={handleContinue}>
            Continue to Variables →
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationDatePage;