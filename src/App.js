import React, { useState } from "react";
import Map from "./components/Map";
import SearchInput from "./components/SearchInput";
import Wiki from "./components/Wiki";
import Meteo from "./components/Meteo";
import Booking from "./components/Booking";
import useLocalStorage from "./components/useLocalStorage";
import Login from "./components/Login";
import { Calendrier2 } from "./components/Calendrier2";

function App() {
  const [id, setId] = useLocalStorage("login");
  const [pass, setPass] = useLocalStorage("password");
  const [isLogged, setIsLogged] = useLocalStorage("isLogged", false);

  const handleSubmit = (e) => {
    const login = e.target.login.value;
    const password = e.target.password.value;
    if (login === "admin" && password === "mdp") {
      setId(login);
      setPass(password);
      setIsLogged(true);
    }
  };
  return (
    <div className="App">
      {!isLogged ? (
        <Login onSubmit={handleSubmit} />
      ) : (
        <>
          <SearchInput />
          <Map />
          <Wiki />
          <Meteo />
          <Booking />
          <div className="calendar-container">
            <Calendrier2 />
          </div>
        </>
      )}
    </div>
  );
}

export default App;
