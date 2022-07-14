import React from "react";
import { Marker, InfoBox } from "@react-google-maps/api";

export default function MarkerInfo({ position }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggleOpen = () => {
    console.log("open");
    setIsOpen(true);
  };

  const handleCloseCall = () => {
    console.log("close");
    setIsOpen(false);
  };
  console.log("markerInfo");
  return (
    <Marker
      position={{ lat: position.lat, lng: position.lng }}
      icon={{
        url: `http://maps.google.com/mapfiles/ms/icons/${position.color}-dot.png`,
      }}
      onClick={handleToggleOpen}
    >
      {isOpen && (
        <InfoBox
          onCloseClick={handleCloseCall}
          position={{ lat: position.lat, lng: position.lng }}
        >
          <div style={{ backgroundColor: "white", opacity: 0.75, padding: 5 }}>
            <div style={{ fontSize: 10, fontColor: `#08233B` }}>
              <p>
                <b>Name: </b>
                {position.name} <br />
                <b>Address: </b>
                {position.address} <br />
                <b>Lat: </b>
                {position.lat}, <b> Lng: </b> {position.lng}
              </p>
            </div>
          </div>
        </InfoBox>
      )}
    </Marker>
  );
}
