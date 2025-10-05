// src/components/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

// You would add your logo SVG or image here
const Logo = () => (
  <div className="logo-container">
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M2 12l10 5 10-5" stroke="#4A90E2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span>SkyLytix</span>
  </div>
);


const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Logo />
        <p>Weather Intelligence</p>
      </div>
      <nav className="sidebar-nav">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/select-location">Location & Date</NavLink>
        <NavLink to="/select-variables">Variables</NavLink>
        <NavLink to="/results">Results</NavLink>
        <NavLink to="/solar-dashboard">Solar Dashboard</NavLink>
        {/* <NavLink to="/detailed-analysis">Detailed Analysis</NavLink>
        <NavLink to="/historical-trends">Historical Trends</NavLink>
        <NavLink to="/my-dashboard">My Dashboard</NavLink> */}
        <NavLink to="/about">About</NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;

// Create a corresponding CSS file: src/components/Sidebar.css