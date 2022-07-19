import * as React from "react";
import { Link } from "react-router-dom";
import "./Planner.css";
import Map from "../Map/Map";
import axios from "axios";

export default function Planner({
  origin,
  destination,
  user,
  stopsTime,
  stopsDist,
  stops,
  setStops,
}) {
  async function saveTrip() {
    try {
      await axios.post("http://localhost:3001/trip", {
        trip: {
          user: user,
          origin: origin,
          destination: destination,
          stops: stops,
        },
      });
      alert("Trip saved successfully");
    } catch (err) {
      alert("Error saving trip");
      console.log(err);
    }
  }

  return (
    <>
      <div className="planner">
        <h1>Create your stops</h1>
        <div className="accions">
          <p className="info">
            {" "}
            <b> Origin:</b> {origin.name}{" "}
          </p>
          <p className="info">
            {" "}
            <b> Destination: </b> {destination.name}{" "}
          </p>
          <p className="info">
            <b> Stops recommended depending on time: </b> {stopsTime}
          </p>
          <p className="info">
            <b> Stops recommended depending on distance: </b>
            {stopsDist}
          </p>
          <button className="saveTripButton" onClick={saveTrip}>
            Save Trip
          </button>
        </div>
        <div className="services">
          <img
            src="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
            alt="red-marker"
          />{" "}
          Gas Stations
          <img
            src="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            alt="blue-marker"
          />{" "}
          Hotels
          <img
            src="http://maps.google.com/mapfiles/ms/icons/green-dot.png"
            alt="greem-marker"
          />{" "}
          Restaurants
          <img
            src="http://maps.google.com/mapfiles/ms/icons/yellow-dot.png"
            alt="yellow-marker"
          />{" "}
          Other
        </div>
        <div className="map">
          <Map
            origin={origin}
            destination={destination}
            stops={stops}
            setStops={setStops}
          />
        </div>
        <button className="nextFinishButton">
          <Link className="linkFinish" to={`/finish`}>
            Next
          </Link>
        </button>
      </div>
    </>
  );
}
