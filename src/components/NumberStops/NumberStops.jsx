import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./NumberStops.css";
import { LoadScript } from "@react-google-maps/api";
import Distance from "../Distance/Distance";
import Time from "../Time/Time";

export default function NumberStops({
  origin,
  setOrigin,
  destination,
  setDestination,
  stopsTime,
  setStopsTime,
  stopsDist,
  setStopsDist,
}) {
  const [originInput, setOriginInput] = React.useState("");
  const [destinationInput, setDestinationInput] = React.useState("");
  const [distance, setDistance] = React.useState();
  const [time, setTime] = React.useState();

  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];

  function handleTrip() {
    var configOrigin = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${originInput}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${key}`,
      headers: {},
    };

    var configDestination = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${destinationInput}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${key}`,
      headers: {},
    };

    axios(configOrigin)
      .then(function (responseOrigin) {
        setOrigin(responseOrigin.data.candidates[0]);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(configDestination)
      .then(function (responseDestination) {
        setDestination(responseDestination.data.candidates[0]);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // TODO: Error message when status is not okay
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
  return (
    <>
      <div className="numberStops">
        <h1>Create your trip</h1>
        <div className="trip">
          <div className="origin">
            <b>Origin:</b>
            <input
              className="inputLocation"
              type="text"
              placeholder="Origin"
              onChange={(event) => setOriginInput(event.target.value)}
            />
          </div>
          <div className="destination">
            <b>Destination:</b>
            <input
              className="inputLocation"
              type="text"
              placeholder="Destination"
              onChange={(event) => setDestinationInput(event.target.value)}
            />
          </div>
          <div className="submit">
            <p></p>
            <button
              className="buttonLocation"
              type="Submit"
              onClick={handleTrip}
            >
              Submit
            </button>
          </div>
          <div className="originDestination">
            {origin ? (
              <p>
                From: {origin.name}, To: {destination.name}
              </p>
            ) : (
              <p></p>
            )}
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
                {distance ? (
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
            {/* TODO: Depending on Fuel */}
            {/* <div className="fuel">
              <input className="inputRadio" type="radio" /> Fuel
            </div> */}
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
