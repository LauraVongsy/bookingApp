import React, { useContext, useEffect, useState } from "react";
import { Context } from "./Context";

export default function Meteo() {
  const { latitude, longitude, city } = useContext(Context);
  const [cloud, setCloud] = useState(null);
  const [Temp, setTemp] = useState(null);
  const [humidity, setHumidity] = useState(null);
  const [wind, setWind] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=116f1e17b27f35c0986391a41e99707a&units=metric&lang=fr`
        );
        const data = await response.json();
        setCloud(data.weather[0].description);
        setTemp(data.main.temp);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
      } catch (error) {
        console.error("Une erreur est survenue :", error);
      }
    };

    fetchWeather();
  }, [latitude, longitude]);
  return (
    <div className="ms-4">
      <h1>{city}</h1>
      <p>{`Météo actuelle: ${cloud}`}</p>
      <p>{`Température actuelle: ${Math.floor(Temp)}°C`}</p>
      <p>{`Humidité actuelle: ${humidity}%`}</p>
      <p>{`Vent: ${Math.floor(3.6 * wind)} Km/h`}</p>
    </div>
  );
}
