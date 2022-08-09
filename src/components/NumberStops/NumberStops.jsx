import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./NumberStops.css";
import { Autocomplete } from "@react-google-maps/api";
import Distance from "../Distance/Distance";
import Time from "../Time/Time";
import Fuel from "../Fuel/Fuel";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

export default function NumberStops({
  origin,
  setOrigin,
  destination,
  setDestination,
  stopsTime,
  setStopsTime,
  stopsDist,
  setStopsDist,
  stopsFuel,
  setStopsFuel,
}) {
  const [originInput, setOriginInput] = React.useState("");
  const [destinationInput, setDestinationInput] = React.useState("");
  const [distance, setDistance] = React.useState();
  const [time, setTime] = React.useState();
  const [fuelActivated, setFuelActivated] = React.useState(false);
  const [toggleTime, setToggleTime] = React.useState(false);
  const [toggleDist, setToggleDist] = React.useState(false);

  function onLoadOrigin(autocompleteOrigin) {
    setOriginInput(autocompleteOrigin);
  }

  function onLoadDestination(autocompleteDestination) {
    setDestinationInput(autocompleteDestination);
  }

  function onOriginChange() {
    if (originInput !== null) {
      setOrigin(originInput.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  function onDestinationChange() {
    if (destinationInput !== null) {
      setDestination(destinationInput.getPlace());
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }

  function calculateDistance(value) {
    let service = new window.google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin.name],
        destinations: [destination.name],
        travelMode: "DRIVING",
      },
      callback
    );
    function callback(response, status) {
      if (value === "distance") {
        setDistance(response.rows[0].elements[0].distance);
      } else if (value === "time") {
        setTime(response.rows[0].elements[0].duration);
      }
    }
  }

  function fuelInput() {
    setFuelActivated(true);
    calculateDistance("distance");
  }

  let navigate = useNavigate();
  function toPlanner() {
    navigate(`../planner`);
  }
  return (
    <>
      <div className="numberStops">
        <h1>Create your trip</h1>
        {!destination ? (
          <progress className="progress" value="0" max="100"></progress>
        ) : (
          <>
            {time || distance || fuelActivated ? (
              <progress className="progress" value="33" max="100"></progress>
            ) : (
              <progress className="progress" value="15" max="100"></progress>
            )}
          </>
        )}

        <div className="trip">
          <div className="origin">
            <b>Origin:</b>
            <Autocomplete
              onLoad={onLoadOrigin}
              onPlaceChanged={() => onOriginChange()}
            >
              <input
                className="inputLocation"
                type="text"
                placeholder="Origin"
              />
            </Autocomplete>
          </div>
          <div className="destination">
            <b>Destination:</b>
            <Autocomplete
              onLoad={onLoadDestination}
              onPlaceChanged={() => onDestinationChange("destination")}
            >
              <input
                className="inputLocation"
                type="text"
                placeholder="Destination"
              />
            </Autocomplete>
          </div>
          <div className="originDestination">
            {origin ? <p>From: {origin.name}</p> : <p></p>}
            {destination ? <p>, To: {destination.name}</p> : <p></p>}
          </div>
        </div>
        <p>
          Choose a category to calculate the number of stops you should make
        </p>
        <div className="category">
          <div className="time">
            <ToggleSwitch
              label="Time"
              toggleVar={toggleTime}
              setToggleVar={setToggleTime}
            />
            {toggleTime ? calculateDistance("time") : ""}
            <div className="infoStops">
              {toggleTime && time ? (
                <>
                  <p> Total time: {time.text}</p>
                  <Time
                    time={time}
                    stopsTime={stopsTime}
                    setStopsTime={setStopsTime}
                  />
                </>
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="distance">
            <ToggleSwitch
              label="Distance"
              toggleVar={toggleDist}
              setToggleVar={setToggleDist}
            />
            {toggleDist ? calculateDistance("distance") : ""}
            <div className="infoStops">
              {distance && toggleDist ? (
                <>
                  <p> Distance: {distance.text}</p>
                  <Distance
                    distance={distance}
                    stopsDist={stopsDist}
                    setStopsDist={setStopsDist}
                  />
                </>
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <div className="fuel">
            <ToggleSwitch
              label="Fuel"
              toggleVar={fuelActivated}
              setToggleVar={setFuelActivated}
            />
            {fuelActivated && !distance ? calculateDistance("distance") : ""}
            <div className="infoStops">
              {fuelActivated ? (
                <Fuel
                  distance={distance}
                  stopsFuel={stopsFuel}
                  setStopsFuel={setStopsFuel}
                />
              ) : (
                <p></p>
              )}
            </div>
          </div>
        </div>
        <button className="nextButton" onClick={toPlanner}>
          Next
        </button>
      </div>
    </>
  );
}
