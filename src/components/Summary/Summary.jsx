import * as React from "react";
import "./Summary.css";
import { Icon } from "@iconify/react";

export default function Summary({ stops, setStops }) {
  const removeStop = (index, stops) => {
    let handleStops = [...stops];
    handleStops.splice(index, 1);
    setStops(handleStops);
  };
  return (
    <>
      <div className="summary">
        <h1>Summary</h1>
        {stops.length > 0 ? (
          stops.map((stop, index) => (
            <>
              <h3>Stop #{index + 1}</h3>
              <p className="infoStopSummary">
                <b>Name: </b>
                {stop.name} <br />
                <b>Address: </b>
                {stop.address} <br />
                <b>Lat: </b>
                {stop.lat}, <b> Lng: </b> {stop.lng} <br />
                <b>Rating: </b>
                {stop.rating}
              </p>
              <button
                className="removeStopButton"
                onClick={() => removeStop(index, stops, setStops)}
              >
                <Icon className={"removeStopIcon"} icon="akar-icons:minus" />
                Remove Stop
              </button>
            </>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
