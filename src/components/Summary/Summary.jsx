import * as React from "react";
import "./Summary.css";

export default function Summary(stops) {
  // console.log(stops.length);
  // console.log(stops.stops.length);
  return (
    <>
      <div className="summary">
        <h1>Summary</h1>
        {stops.stops.length > 0 ? (
          stops.stops.map((stop) => (
            <p>
              <b>Name: </b>
              {stop.name} <br />
              <b>Address: </b>
              {stop.address} <br />
              <b>Lat: </b>
              {stop.lat}, <b> Lng: </b> {stop.lng}
            </p>
          ))
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
