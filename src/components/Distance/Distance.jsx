import * as React from "react";
import "./Distance.css";

export default function Distance({ distance }) {
  const [distanceInput, setDistanceInput] = React.useState();
  const [stops, setStops] = React.useState(0);

  function calculateStops() {
    setStops(Math.round(distance.value / 1000 / distanceInput));
  }

  return (
    <>
      <div className="distanceInput">
        <input
          type="text"
          placeholder="Distance"
          onChange={(event) => setDistanceInput(event.target.value)}
        />
        {"  "}
        Km
        <button type="submit" onClick={calculateStops}>
          Submit
        </button>
        {stops > 0 ? <h4>Number of Stops recommended: {stops} </h4> : <p></p>}
      </div>
    </>
  );
}
