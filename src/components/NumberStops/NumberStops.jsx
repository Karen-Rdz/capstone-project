import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Map from "../Map/Map";
import "./NumberStops.css";
import { LoadScript } from "@react-google-maps/api";
import Map2 from "../Map2/Map2";
import InitMap from "../Map3/Map3";

export default function NumberStops() {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [resultsReady, setResultsReady] = React.useState(false);
  const [originName, setOriginName] = React.useState("");
  const [destinationName, setDestinationName] = React.useState("");

  const location = {
    address: "1 Hacker Way, Menlo Park, CA 94025.",
    lat: 37.48525176224396,
    lng: -122.14830386019975,
  };

  const lib = ["places"];
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";

  function handleTrip() {
    var configOrigin = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${origin}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${key}`,
      headers: {},
    };

    var configDestination = {
      method: "get",
      url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${destination}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${key}`,
      headers: {},
    };

    axios(configOrigin)
      .then(function (responseOrigin) {
        setOriginName(responseOrigin.data.candidates[0].name);
        console.log(
          JSON.stringify(responseOrigin.data.candidates[0].geometry.location)
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(configDestination)
      .then(function (responseDestination) {
        setDestinationName(responseDestination.data.candidates[0].name);
        console.log(
          JSON.stringify(
            responseDestination.data.candidates[0].geometry.location
          )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
    setResultsReady(true);
  }

  return (
    <>
      <div className="numberStops">
        <h1>Create a trip</h1>
        <div className="trip">
          <input
            type="text"
            placeholder="Origin"
            onChange={(event) => setOrigin(event.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            onChange={(event) => setDestination(event.target.value)}
          />
          <button type="Submit" onClick={handleTrip}>
            Submit
          </button>
        </div>
        <div className="category">
          <input type="radio" /> Time
          <input type="radio" /> Distance
          <input type="radio" /> Fuel
        </div>
        <p>
          {originName} , {destinationName}
        </p>
        <div className="stops">
          <h4>Number of Stops recommended: </h4>
        </div>
        <button>
          <Link to={`/planner`}>Next</Link>
        </button>
        {/* <Map location={location} zoomLevel={17} /> */}
        {/* <LoadScript googleMapsApiKey={key} libraries={lib}> */}
        {/* <Map2 name={origin} /> */}
        {/* <InitMap /> */}
        {/* </LoadScript> */}
      </div>
    </>
  );
}
