import React, { useContext } from "react";
import Map from "./components/Map";
import SearchInput from "./components/SearchInput";
import Wiki from "./components/Wiki";
import Meteo from "./components/Meteo";
import Booking from "./components/Booking";
import Login from "./components/Login";
import { Calendrier2 } from "./components/Calendrier2";
import User from "./components/User";
import { UserContext } from "./components/UserContext";

function App() {
  const { isLogged } = useContext(UserContext);

  console.log(isLogged);
  return (
    <div className="App">
      {!isLogged ? (
        <Login />
      ) : (
        <>
          <User />
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
