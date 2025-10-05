// src/utils/weatherUtils.js

// This function generates plain-language summaries from AccuWeather data.
export const analyzeConditions = (results) => {
  // Safety check: Ensure the DailyForecasts array exists and is not empty.
  if (!results || !results.DailyForecasts || results.DailyForecasts.length === 0) {
    return [];
  }
  
  const summaries = [];
  const forecast = results.DailyForecasts[0]; // Analyze the first day's forecast.

  const maxTemp = forecast.Temperature.Maximum.Value;
  const phrase = forecast.Day.IconPhrase.toLowerCase();

  // Analyze temperature.
  if (maxTemp > 35) {
    summaries.push({ level: 'High', text: `Very hot conditions expected, with a high of ${maxTemp}°C.` });
  } else if (maxTemp > 30) {
    summaries.push({ level: 'Moderate', text: `Warm conditions expected, with a high of ${maxTemp}°C.` });
  }

  // Analyze precipitation from the forecast phrase.
  if (phrase.includes('thunderstorm') || phrase.includes('showers') || phrase.includes('rain')) {
    summaries.push({ level: 'High', text: `High chance of rain (${forecast.Day.IconPhrase}).` });
  }
  
  // Analyze wind, checking if wind data exists first to prevent crashes.
  if (forecast.Day.Wind && forecast.Day.Wind.Speed.Value > 25) { 
     summaries.push({ level: 'Moderate', text: `It may be windy, with gusts up to ${forecast.Day.Wind.Speed.Value} km/h.` });
  }

  if (summaries.length === 0) {
    summaries.push({ level: 'Low', text: 'Conditions appear to be calm and clear.' });
  }

  return summaries;
};

// This function formats AccuWeather data for use in charts.
export const formatChartData = (results) => {
    // Safety check: Ensure the DailyForecasts array exists.
    if (!results || !results.DailyForecasts) {
        return { labels: [], datasets: [] };
    }

    const labels = results.DailyForecasts.map(day => {
        const date = new Date(day.Date);
        // Format date to MM/DD.
        return `${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    });

    const datasets = [
        {
            label: 'Maximum Temperature (°C)',
            data: results.DailyForecasts.map(day => day.Temperature.Maximum.Value),
            borderColor: '#E24A4A',
            backgroundColor: 'rgba(226, 74, 74, 0.2)',
            fill: true,
            tension: 0.3
        },
        {
            label: 'Minimum Temperature (°C)',
            data: results.DailyForecasts.map(day => day.Temperature.Minimum.Value),
            borderColor: '#4A90E2',
            backgroundColor: 'rgba(74, 144, 226, 0.2)',
            fill: true,
            tension: 0.3
        }
    ];

    return { labels, datasets };
}