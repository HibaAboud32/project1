import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css"
import L from "leaflet"
// import "react-leaflet/dist/react-leaflet.css";

const ShowMap = () => {

    const customIcon = new L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        iconSize: [38, 38] // size of the icon
      });


  return (
    <MapContainer center={[33.51660829521058, 36.307618501401556]} zoom={13} scrollWheelZoom={false}>
    <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[33.51660829521058, 36.307618501401556]}
     icon={customIcon}
     >
        <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker>
    </MapContainer>
  )
}

export default ShowMap