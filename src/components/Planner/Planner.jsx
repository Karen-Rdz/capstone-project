import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./Planner.css";
import Map from "../Map/Map";
import MapStops from "../MapStops/MapStops";
import axios from "axios";

export default function Planner({
  origin,
  destination,
  user,
  stopsTime,
  stopsDist,
  stopsFuel,
  stops,
  setStops,
}) {
  const [showMapStops, setShowMapStops] = React.useState(false);
  const [tripSaved, setTripSaved] = React.useState(false);

  async function saveTrip() {
    try {
      await axios.post("http://localhost:3001/trip", {
        trip: {
          user: user,
          origin: origin,
          destination: destination,
          stops: stops,
          stopsTime: stopsTime,
          stopsDist: stopsDist,
          stopsFuel: stopsFuel,
        },
      });
      setTripSaved(true);
      alert("Trip saved successfully");
    } catch (err) {
      alert("Error saving trip");
      console.log(err);
    }
  }

  let navigate = useNavigate();
  function toFinish() {
    navigate(`../finish`);
  }

  return (
    <>
      <div className="planner">
        <h1>Create your stops</h1>
        {stops.length > 0 ? (
          <>
            {tripSaved ? (
              <progress class="progress" value="66" max="100"></progress>
            ) : (
              <progress class="progress" value="45" max="100"></progress>
            )}
          </>
        ) : (
          <progress class="progress" value="33" max="100"></progress>
        )}

        <div className="accions">
          <div className="infoOriginDestination">
            <p className="infoRoute">
              {" "}
              <b> Origin:</b> {origin.name}{" "}
            </p>
            <p className="infoRoute">
              {" "}
              <b> Destination: </b> {destination.name}{" "}
            </p>
          </div>
          <div className="infoStopsTimeDistance">
            <h3>Stops recommended depending on:</h3>
            <p className="info">
              <b> Time: </b> {stopsTime} <p></p>
              <b> Distance: </b> {stopsDist} <p></p>
              <b> Fuel: </b> {stopsFuel}
            </p>
          </div>
        </div>
        <p>Use the search bar to find the places you want to stop</p>
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
        <button
          className="mapStopsButton"
          onClick={() => setShowMapStops(!showMapStops)}
        >
          Show Map with Stops
        </button>
        {showMapStops ? (
          <MapStops
            origin={origin}
            destination={destination}
            stops={stops}
            setStops={setStops}
          />
        ) : (
          <p></p>
        )}
        <div className="accionButtons">
          <button className="saveTripButton" onClick={saveTrip}>
            Save Trip
          </button>
          <button className="nextFinishButton" onClick={toFinish}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}
