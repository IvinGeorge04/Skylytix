import React, { useState } from 'react';
import { useQuery } from '../context/QueryContext';
import { ENDPOINTS } from '../config/api';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Line } from 'react-chartjs-2';
import './HistoricalTrendsPage.css';

const HistoricalTrendsPage = () => {
  const { location } = useQuery();
  // Default to a valid past date range
  const [startDate, setStartDate] = useState(new Date('2023-01-01'));
  const [endDate, setEndDate] = useState(new Date('2023-01-31'));
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatApiDate = (date) => date.toISOString().slice(0, 10);

  const fetchHistoricalData = async () => {
    if (!location || typeof location.lat !== 'number') {
      setError("Please select a location first.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(ENDPOINTS.HISTORICAL, {
        latitude: location.lat,
        longitude: location.lng,
        startDate: formatApiDate(startDate),
        endDate: formatApiDate(endDate)
      });
      setHistoricalData(response.data);
    } catch (err) {
      setError('Failed to fetch historical data. Please try a different date range.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = historicalData ? {
    labels: historicalData.daily.time,
    datasets: [
        {
            label: `Max Temperature (°C)`,
            data: historicalData.daily.temperature_2m_max,
            borderColor: '#E24A4A',
            backgroundColor: 'rgba(226, 74, 74, 0.2)',
            fill: true,
            yAxisID: 'y'
        },
        {
            label: 'Precipitation (mm)',
            data: historicalData.daily.precipitation_sum,
            borderColor: '#4A90E2',
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            fill: true,
            yAxisID: 'y1'
        }
    ]
  } : null;

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        y: {
            type: 'linear',
            display: true,
            position: 'left',
            title: {
                display: true,
                text: 'Temperature (°C)'
            }
        },
        y1: {
            type: 'linear',
            display: true,
            position: 'right',
            title: {
                display: true,
                text: 'Precipitation (mm)'
            },
            grid: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
        },
    },
  };

  return (
    <div className="historical-trends-page">
      <div className="page-header">
        <h2>Historical Trends</h2>
        <p>Analyze past weather data for your selected location.</p>
      </div>

      <div className="card trends-controls">
        <div className="input-group">
          <label>Start Date</label>
          {/* FIX: Prevent selecting dates after today */}
          <DatePicker selected={startDate} onChange={date => setStartDate(date)} dateFormat="yyyy-MM-dd" maxDate={new Date()} />
        </div>
        <div className="input-group">
          <label>End Date</label>
          {/* FIX: Prevent selecting dates after today */}
          <DatePicker selected={endDate} onChange={date => setEndDate(date)} dateFormat="yyyy-MM-dd" maxDate={new Date()} />
        </div>
        <button className="primary-btn" onClick={fetchHistoricalData} disabled={loading}>
          {loading ? 'Loading...' : 'Get Historical Data'}
        </button>
      </div>

      <div className="card trends-chart">
        {error && <div className="status-message error">{error}</div>}
        {loading && <div className="status-message">Fetching data...</div>}
        {chartData && <Line data={chartData} options={chartOptions} />}
        {!chartData && !loading && <div className="status-message">Select a date range and click "Get Historical Data" to see a trend chart.</div>}
      </div>
    </div>
  );
};

export default HistoricalTrendsPage;

