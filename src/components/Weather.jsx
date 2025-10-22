import React, { useEffect, useState , useRef } from 'react'
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import cloud_icon from "../assets/cloud.png";
import drizzle_icon from "../assets/drizzle.png";
import humidity_icon from "../assets/humidity.png";
import rain_icon from "../assets/rain.png";
import snow_icon from "../assets/snow.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {


  const inputRef = useRef()
  const [weatherData, setWeatherData] = useState({});
  const [query, setQuery] = useState("Madurai");

  const fetchWeather = async (city) => {

    if (city === "") {
      alert("Please enter a city name");
      return;
    }
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_APP_ID}&q=${city}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);

      setWeatherData({
        humidity: data.current.humidity,
        windSpeed: data.current.wind_kph,
        temperature: Math.floor(data.current.temp_c),
        location: data.location.name,
        conditionText: data.current.condition.text,
        icon: `https:${data.current.condition.icon}`,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };


  useEffect(() => {
    fetchWeather("madurai");
  }, []);

  return (
    <div className="weather">
      <div className="search-bar">
        <input ref={inputRef}
          type="text"
          placeholder="Search city..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          src={search_icon}
          alt="search"
          onClick={() => fetchWeather(query)}
          style={{ cursor: "pointer" }}
        />
      </div>

      {weatherData.location && (
        <>
          <img
            src={weatherData.icon}
            alt="weather icon"
            className="weather-icon"
          />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.location}</p>
          <p className="condition">{weatherData.conditionText}</p>

          <div className="weather-data">
            <div className="col">
              <img src={humidity_icon} alt="humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>

            <div className="col">
              <img src={wind_icon} alt="wind" />
              <div>
                <p>{weatherData.windSpeed} Km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;