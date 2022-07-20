import * as React from "react";
import { Link } from "react-router-dom";
import "./NumberStops.css";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import Distance from "../Distance/Distance";
import Time from "../Time/Time";
import Fuel from "../Fuel/Fuel";

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

  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];

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

  return (
    <>
      <div className="numberStops">
        <h1>Create your trip</h1>
        <div className="trip">
          <LoadScript googleMapsApiKey={key} libraries={lib}>
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
          </LoadScript>
          <div className="originDestination">
            {origin ? <p>From: {origin.name}</p> : <p></p>}
            {destination ? <p>, To: {destination.name}</p> : <p></p>}
          </div>
        </div>
        <LoadScript googleMapsApiKey={key} libraries={lib}>
          <div className="category">
            <div className="time">
              <input
                className="inputRadio"
                type="radio"
                onClick={() => calculateDistance("time")}
              />{" "}
              Time
              <div className="infoStops">
                {time ? (
                  <>
                    <p> Time: {time.text}</p>
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
              <input
                className="inputRadio"
                type="radio"
                onClick={() => calculateDistance("distance")}
              />{" "}
              Distance
              <div className="infoStops">
                {distance && !fuelActivated ? (
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
              <input className="inputRadio" type="radio" onClick={fuelInput} />{" "}
              Fuel
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
        </LoadScript>
        <button className="nextButton">
          <Link className="linkPlanner" to={`/planner`}>
            Next
          </Link>
        </button>
      </div>
    </>
  );
}
