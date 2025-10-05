// src/pages/AboutPage.jsx
import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h2>About SkyLytix</h2>
        <p>Leveraging Earth Observation Data for Actionable Insights</p>
      </div>
      <div className="card">
        <h3>Our Data Source</h3>
        <p>SkyLytix is powered by the NASA POWER (Prediction of Worldwide Energy Resources) project. These datasets contain solar and meteorological information derived from NASA's Earth observation satellites.</p>
        <p>This provides globally consistent data that is invaluable for a wide range of applications, from agriculture and renewable energy to academic research.</p>
        
        <h3>Our Mapping Technology</h3>
        <p>The interactive maps throughout SkyLytix are provided by <strong>OpenStreetMap</strong>, a collaborative, open-source mapping project. We utilize the Leaflet.js library to deliver a seamless and responsive map experience.</p>

        <h3>How to Interpret Results</h3>
        <p>Our goal is to translate complex scientific data into easy-to-understand, actionable insights. The "Uncomfortable Conditions" forecast uses established thresholds to give you a quick overview, while the detailed charts allow for deeper analysis of specific weather variables.</p>
        
        <div className="api-links">
            <a href="https://power.larc.nasa.gov/" target="_blank" rel="noopener noreferrer" className="primary-btn">NASA POWER Project</a>
            <a href="https://www.openstreetmap.org/" target="_blank" rel="noopener noreferrer" className="primary-btn">OpenStreetMap</a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;