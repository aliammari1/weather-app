import React, { useState } from "react";
import "./weather.css";

function Weather() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}`
    );
    const responseData = await response.json();
    setData(responseData);
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="location">Location:</label>
        <input
          type="text"
          name="location"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      {Object.keys(data).length !== 0 && location !== "" && (
        <div>
          <p>
            The current temperature in {location} is {data.current.temp_c}°C
          </p>
          <img
            src={"https:" + data.current.condition.icon}
            alt={data.current.condition.text}
          />
        </div>
      )}
    </div>
  );
}

export default Weather;
