import React, { useState } from "react";

function WeatherApp() {
    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeather = async () => {
        if (!city.trim()) return;
        setLoading(true); // Show loading message
        try {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=57609c2e5147422caf7183741252603&q=${city}`);
            if (!response.ok) throw new Error("Failed to fetch weather data");
            const data = await response.json();
            setWeather(data);
        } catch (error) {
            alert("Failed to fetch weather data");
        } finally {
            setLoading(false); // Hide loading message
        }
    };

    return (
        <div>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city" />
            <button onClick={fetchWeather}>Search</button>
            {loading && <p>Loading data…</p>}
            {weather && (
                <div className="weather-cards">
                    <div className="weather-card"><strong>Temperature:</strong> {weather.current.temp_c}°C</div>
                    <div className="weather-card"><strong>Humidity:</strong> {weather.current.humidity}%</div>
                    <div className="weather-card"><strong>Condition:</strong> {weather.current.condition.text}</div>
                    <div className="weather-card"><strong>Wind Speed:</strong> {weather.current.wind_kph} kph</div>
                </div>
            )}
        </div>
    );
}

export default WeatherApp;
