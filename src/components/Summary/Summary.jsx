import * as React from "react";
import "./Summary.css";

export default function Summary({ stops, setStops }) {
  // console.log(stops.length);
  // console.log(stops.stops.length);
  const removeStop = (index, stops) => {
    let handleStops = [...stops];
    console.log(handleStops);
    handleStops.splice(index, 1);
    console.log(handleStops);
    setStops(handleStops);
  };
  return (
    <>
      <div className="summary">
        <h1>Summary</h1>
        {stops.length > 0 ? (
          stops.map((stop, index) => (
            <>
              <p>
                <b>Name: </b>
                {stop.name} <br />
                <b>Address: </b>
                {stop.address} <br />
                <b>Lat: </b>
                {stop.lat}, <b> Lng: </b> {stop.lng}
              </p>
              <button onClick={() => removeStop(index, stops, setStops)}>
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
