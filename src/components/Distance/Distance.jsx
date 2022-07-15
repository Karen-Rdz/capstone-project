import * as React from "react";
import "./Distance.css";

export default function Distance({ distance, stopsDist, setStopsDist }) {
  const [distanceInput, setDistanceInput] = React.useState();

  function calculateStops() {
    setStopsDist(Math.round(distance.value / 1000 / distanceInput));
  }

  return (
    <>
      <div className="distanceInput">
        <input
          className="distanceText"
          type="text"
          placeholder="Distance"
          onChange={(event) => setDistanceInput(event.target.value)}
        />
        {"  "}
        Km
        <button
          className="submitDistance"
          type="submit"
          onClick={calculateStops}
        >
          Submit
        </button>
        {stopsDist > 0 ? (
          <h4>Number of Stops recommended: {stopsDist} </h4>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
