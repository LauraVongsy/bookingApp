import React, { useContext } from "react";
import Map from "./components/Map";
import { Routes, Route } from "react-router-dom";
import Wiki from "./components/Wiki";
import Meteo from "./components/Meteo";
import Booking from "./components/Booking";
import Login from "./components/Login";
import { Calendrier2 } from "./components/Calendrier2";
import User from "./components/User";
import { UserContext } from "./components/UserContext";
import Header from "./components/Header";
import Profil from "./components/Profil";
import Home from "./components/Home";

function App() {
  const { isLogged } = useContext(UserContext);

  console.log(isLogged);
  return (
    <div className="App">
      {!isLogged ? (
        <Login />
      ) : (
        <>
          <Routes>
            <Route exact path="/" element={<Home />} />

            <Route path="/profil" element={<Profil />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;
