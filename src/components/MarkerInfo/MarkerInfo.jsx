import React from "react";
import { Marker, InfoBox } from "@react-google-maps/api";
import { Icon } from "@iconify/react";
import "./MarkerInfo.css";

export default function MarkerInfo({ position, stops, setStops }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [animation, setAnimation] = React.useState(2);

  const handleToggleOpen = () => {
    setIsOpen(true);
    setAnimation(1);
  };

  const handleCloseCall = () => {
    setIsOpen(false);
    setAnimation(null);
  };

  const addStop = () => {
    setStops((stops) => [...stops, position]);
  };

  return (
    <Marker
      position={{ lat: position.lat, lng: position.lng }}
      icon={{
        url: `http://maps.google.com/mapfiles/ms/icons/${position.color}-dot.png`,
      }}
      onClick={handleToggleOpen}
      animation={animation}
    >
      {isOpen && (
        <InfoBox
          options={{ closeBoxURL: "", enableEventPropagation: true }}
          position={{ lat: position.lat, lng: position.lng }}
        >
          <div style={{ backgroundColor: "white", opacity: 0.8, padding: 5 }}>
            <div style={{ fontSize: 12, fontColor: `#08233B` }}>
              <p>
                <b>Name: </b>
                {position.name} <br />
                <b>Address: </b>
                {position.address} <br />
                <b>Lat: </b>
                {position.lat}, <b> Lng: </b> {position.lng}
              </p>
              <Icon
                className="infoBoxCloseButton"
                icon="ep:circle-close"
                onClick={handleCloseCall}
              />
              <button className="addStopButton" onClick={addStop}>
                <Icon className="infoBoxAddStop" icon="akar-icons:plus" />
                Add Stop
              </button>
            </div>
          </div>
        </InfoBox>
      )}
    </Marker>
  );
}
