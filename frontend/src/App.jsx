import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import all the necessary components
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import LocationDatePage from './pages/LocationDatePage';
import VariablesPage from './pages/VariablesPage';
import ResultsPage from './pages/ResultsPage';
import SolarDashboardPage from './pages/SolarDashboardPage';
// import DetailedAnalysisPage from './pages/DetailedAnalysisPage';
// import HistoricalTrendsPage from './pages/HistoricalTrendsPage';
// import MyDashboardPage from './pages/MyDashboardPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <main className="main-content">
          <Routes>
            {/* Define a route for every page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/select-location" element={<LocationDatePage />} />
            <Route path="/select-variables" element={<VariablesPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/solar-dashboard" element={<SolarDashboardPage />} />
            {/* <Route path="/detailed-analysis" element={<DetailedAnalysisPage />} />
            <Route path="/historical-trends" element={<HistoricalTrendsPage />} />
            <Route path="/my-dashboard" element={<MyDashboardPage />} /> */}
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

