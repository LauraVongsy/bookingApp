import React from "react";
import Map from "./components/Map";
import SearchInput from "./components/SearchInput";
import Wiki from "./components/Wiki";
import Meteo from "./components/Meteo";
import Booking from "./components/Booking";

function App() {
  return (
    <div className="App">
      <SearchInput />
      <Map />
      <Wiki />
      <Meteo />
      <Booking />
    </div>
  );
}

export default App;
