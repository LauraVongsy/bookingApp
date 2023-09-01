import React, { useContext } from "react";
import { Context } from "./Context";

export default function Booking() {
  const { city } = useContext(Context);

  return (
    <div>
      <h1>{`Réservez votre visite de ${city}`}</h1>
    </div>
  );
}
