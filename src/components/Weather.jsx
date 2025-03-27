import React, { useState } from "react";
import axios from "axios";
import "../components/Weather.css";

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setError("");
    setLoading(true); // Show loading text

    const API_KEY = "57609c2e5147422caf7183741252603"; // Replace with your OpenWeather API Key
    const API_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`;

    try {
      const response = await axios.get(API_URL);
      setWeather(response.data);
    } catch (error) {
      setError("Failed to fetch weather data. Please enter a valid city.");
      setWeather(null);
    }

    setLoading(false); // Hide loading text
  };

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">
          Search
        </button>
      </div>

      {loading && <p className="loading-message">Loading data…</p>} 
      {error && <p className="error-message">{error}</p>}

      {weather && !loading && (
        <div className="weather-cards"> {/* ✅ Using "weather-cards" class */}
          <WeatherCard title="Temperature" value={`${weather.current.temp_c}°C`} />
          <WeatherCard title="Humidity" value={`${weather.current.humidity}%`} />
          <WeatherCard title="Condition" value={weather.current.condition.text} />
          <WeatherCard title="Wind Speed" value={`${weather.current.wind_kph} kph`} />
        </div>
      )}
    </div>
  );
};

const WeatherCard = ({ title, value }) => (
  <div className="weather-card"> {/* ✅ Using "weather-card" class */}
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

export default Weather;
