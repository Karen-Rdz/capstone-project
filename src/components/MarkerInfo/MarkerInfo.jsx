import React from "react";
import { Marker, InfoBox } from "@react-google-maps/api";
import { Icon } from "@iconify/react";
import "./MarkerInfo.css";

export default function MarkerInfo({
  position,
  stops,
  setStops,
  isAddStopsActivated,
}) {
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
    let index = stops.findIndex((stop) => {
      if (stop === position) {
        return true;
      }
    });
    if (index === -1) {
      setStops((stops) => [...stops, position]);
    } else {
      alert("Stop already added");
    }
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
          <div className="infoBox">
            <p>
              <b>Name: </b>
              {position.name} <br />
              <b>Address: </b>
              {position.address} <br />
              <b>Lat: </b>
              {position.lat}, <b> Lng: </b> {position.lng} <br />
              <b>Rating: </b>
              {position.rating}
            </p>
            <Icon
              className="infoBoxCloseButton"
              icon="ep:circle-close"
              onClick={handleCloseCall}
            />
            {isAddStopsActivated ? (
              <button className="addStopButton" onClick={addStop}>
                <Icon className="infoBoxAddStop" icon="akar-icons:plus" />
                Add Stop
              </button>
            ) : (
              ""
            )}
          </div>
        </InfoBox>
      )}
    </Marker>
  );
}
