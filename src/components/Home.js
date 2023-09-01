import React from "react";
import Header from "./Header";
import User from "./User";
import Map from "./Map";
import Wiki from "./Wiki";
import Meteo from "./Meteo";
import Booking from "./Booking";
import { Calendrier2 } from "./Calendrier2";
import Footer from "./Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <User />
      <Map />
      <Wiki />

      <Booking />
      <div className="calendar-container">
        <Calendrier2 />
      </div>
      <Footer />
    </div>
  );
}
