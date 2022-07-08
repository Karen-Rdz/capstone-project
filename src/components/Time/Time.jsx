import * as React from "react";
import "./Time.css";

export default function Time({ time }) {
  const [timeInput, setTimeInput] = React.useState();
  const [stops, setStops] = React.useState(0);

  function calculateStops() {
    setStops(Math.round(time.value / 60 / timeInput));
  }

  return (
    <>
      <div className="time">
        <input
          type="text"
          placeholder="Time"
          onChange={(event) => setTimeInput(event.target.value)}
        />
        {"  "}
        Minutes
        <button type="submit" onClick={calculateStops}>
          Submit
        </button>
        {stops > 0 ? <h4>Number of Stops recommended: {stops} </h4> : <p></p>}
      </div>
    </>
  );
}
