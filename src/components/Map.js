import React, { useContext, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "../styles/map.css";
import { Context } from "./Context";

export default function Map() {
  const { latitude, longitude, fetchedData, fetchLocationData } =
    useContext(Context);

  useEffect(() => {
    fetchLocationData();
  }, []);
  return (
    <>
      {fetchedData ? (
        <div className="map-container">
          <div className="map">
            <MapContainer
              center={[latitude, longitude]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
