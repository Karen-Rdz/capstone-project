import * as React from "react";
import "./Time.css";

export default function Time({ time, stopsTime, setStopsTime }) {
  const [timeInput, setTimeInput] = React.useState();

  function calculateStops() {
    setStopsTime(Math.round(time.value / 60 / timeInput));
  }

  return (
    <>
      <div className="timeInput">
        <input
          className="timeText"
          type="text"
          placeholder="Time"
          onChange={(event) => setTimeInput(event.target.value)}
        />
        {"  "}
        Minutes
        <button className="submitTime" type="submit" onClick={calculateStops}>
          Submit
        </button>
        {stopsTime > 0 ? (
          <h4>Number of Stops recommended: {stopsTime} </h4>
        ) : (
          <p></p>
        )}
      </div>
    </>
  );
}
