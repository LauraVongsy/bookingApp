import React, { useState, createContext } from "react";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [inputAddress, setInputAddress] = useState("");
  const [locationData, setLocationData] = useState(null);
  const [latitude, setLatitude] = useState(48.866667);
  const [longitude, setLongitude] = useState(2.333333);
  const [city, setCity] = useState("Paris");
  const [fetchedData, setFetchedData] = useState(null);

  const fetchLocationData = async (inputAddress) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${inputAddress}&format=json`
      );
      const data = await response.json();
      setLocationData(data);
      console.log(data[1].name);
      setLatitude(data[1].lat);
      setLongitude(data[1].lon);
      setCity(data[1].name);
      setFetchedData(data);
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
    }
  };

  const data = {
    latitude,
    longitude,
    city,
    locationData,
    fetchLocationData,
    inputAddress,
    setInputAddress,
    fetchedData,
  };

  return <Context.Provider value={data}>{children}</Context.Provider>;
};
