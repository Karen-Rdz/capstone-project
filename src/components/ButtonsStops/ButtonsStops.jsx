import * as React from "react";
import "./ButtonsStops.css";

export default function ButtonsStops({
  locationStopsDist,
  locationStopsTime,
  locationStopsFuel,
  setBounds,
  clickedButton,
}) {
  function onClick(stop, key, param) {
    switch (param) {
      case "distance":
        clickedButton.current = { distance: key };
        break;
      case "time":
        clickedButton.current = { time: key };
        break;
      case "fuel":
        clickedButton.current = { fuel: key };
        break;
      default:
        clickedButton.current = { other: 0 };
        break;
    }
    setBounds({
      north: stop.lat() + 0.1,
      south: stop.lat() - 0.1,
      east: stop.lng() + 0.1,
      west: stop.lng() - 0.1,
    });
  }

  return (
    <>
      <div className="buttonStops">
        {locationStopsDist.current.length > 0 ? (
          <h3>Search on Stops depending on Distance</h3>
        ) : (
          ""
        )}
        {locationStopsDist.current.map((stopDist, key) => (
          <button
            className="buttonStop"
            onClick={() => onClick(stopDist, key, "distance")}
          >
            {" "}
            Search on Stop #{key + 1}
          </button>
        ))}
        {locationStopsTime.current.length > 0 ? (
          <h3>Search on Stops depending on Time</h3>
        ) : (
          ""
        )}
        {locationStopsTime.current.map((stopTime, key) => (
          <button
            className="buttonStop"
            onClick={() => onClick(stopTime, key, "time")}
          >
            {" "}
            Search on Stop #{key + 1}
          </button>
        ))}
        {locationStopsFuel.current.length > 0 ? (
          <h3>Search on Stops depending on Fuel</h3>
        ) : (
          ""
        )}
        {locationStopsFuel.current.map((stopFuel, key) => (
          <button
            className="buttonStop"
            onClick={() => onClick(stopFuel, key, "fuel")}
          >
            {" "}
            Search on Stop #{key + 1}
          </button>
        ))}
      </div>
    </>
  );
}
