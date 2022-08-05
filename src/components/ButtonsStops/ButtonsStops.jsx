import * as React from "react";
import "./ButtonsStops.css";

export default function ButtonsStops({
  locationStopsDist,
  locationStopsTime,
  locationStopsFuel,
  setBounds,
}) {
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
            onClick={() =>
              setBounds({
                north: stopDist.lat() + 0.1,
                south: stopDist.lat() - 0.1,
                east: stopDist.lng() + 0.1,
                west: stopDist.lng() - 0.1,
              })
            }
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
            onClick={() =>
              setBounds({
                north: stopTime.lat() + 0.1,
                south: stopTime.lat() - 0.1,
                east: stopTime.lng() + 0.1,
                west: stopTime.lng() - 0.1,
              })
            }
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
            onClick={() =>
              setBounds({
                north: stopFuel.lat() + 0.1,
                south: stopFuel.lat() - 0.1,
                east: stopFuel.lng() + 0.1,
                west: stopFuel.lng() - 0.1,
              })
            }
          >
            {" "}
            Search on Stop #{key + 1}
          </button>
        ))}
      </div>
    </>
  );
}
