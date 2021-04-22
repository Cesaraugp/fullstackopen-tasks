import { React, useEffect, useState } from "react";
import axios from "axios";
const Weather = ({ capital }) => {
  const [weather, setWeather] = useState("");
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const params = {
      access_key: api_key,
      query: capital,
    };

    axios
      .get("http://api.weatherstack.com/current", { params })
      .then((resp) => setWeather(resp.data.current));
  }, [capital, api_key]);

  return (
    <div>
      <h2>{capital}'s Weather</h2>
      {weather ? (
        <>
          <p>
            <b>Temperature:</b> {weather.temperature}ºC
          </p>
          <img src={weather.weather_icons[0]} alt="Weather icon" />
          <p>
            <b>Wind:</b> {weather.wind_speed} mph, direction {weather.wind_dir}
          </p>
        </>
      ) : (
        <p>fetching weather data...</p>
      )}
    </div>
  );
};
export default Weather;
