import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Map from "../Map/Map";
import "./NumberStops.css";
import { LoadScript } from "@react-google-maps/api";
import Map2 from "../Map2/Map2";
import InitMap from "../Map3/Map3";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc&libraries=geometry"></script>;
const lib = ["places", "geometry"];

export default function NumberStops() {
  "use strict";
  const [originInput, setOriginInput] = React.useState("");
  const [destinationInput, setDestinationInput] = React.useState("");
  const [origin, setOrigin] = React.useState();
  const [destination, setDestination] = React.useState();
  const [originName, setOriginName] = React.useState("Origin");
  const [destinationName, setDestinationName] = React.useState("Destination");

  const location = {
    address: "1 Hacker Way, Menlo Park, CA 94025.",
    lat: 37.48525176224396,
    lng: -122.14830386019975,
  };

  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";

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
        setOriginName(responseOrigin.data.candidates[0].name);
        setOrigin(responseOrigin.data.candidates[0]);
        console.log(
          // JSON.stringify(responseOrigin.data.candidates[0].geometry.location)
          origin
        );
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(configDestination)
      .then(function (responseDestination) {
        setDestinationName(responseDestination.data.candidates[0].name);
        setDestination(responseDestination.data.candidates[0]);
        console.log(
          destination
          // JSON.stringify(
          //   responseDestination.data.candidates[0].geometry.location
          // )
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function calculateDistance() {
    // console.log(origin);
    let destinationLatLng = new window.google.maps.LatLng(
      destination.geometry.location.lat,
      destination.geometry.location.log
    );
    let originLatLng = new window.google.maps.LatLng(
      origin.geometry.location.lat,
      origin.geometry.location.long
    );
    let service = new window.google.maps.DistanceMatrixService();
    console.log(originLatLng);
    service.getDistanceMatrix(
      {
        origins: [originName],
        destinations: [destinationName],
        travelMode: "DRIVING",
      },
      callback
    );
    function callback(response, status) {
      // console.log(response)
      console.log(response.rows[0].elements[0]);
    }
  }

  return (
    <>
      <div className="numberStops">
        <h1>Create a trip</h1>
        <div className="trip">
          <input
            type="text"
            placeholder="Origin"
            onChange={(event) => setOriginInput(event.target.value)}
          />
          <input
            type="text"
            placeholder="Destination"
            onChange={(event) => setDestinationInput(event.target.value)}
          />
          <button type="Submit" onClick={handleTrip}>
            Submit
          </button>
        </div>
        <LoadScript googleMapsApiKey={key} libraries={lib}>
          <div className="category">
            <input type="radio" /> Time
            <input type="radio" onClick={calculateDistance} /> Distance
            <input type="radio" /> Fuel
          </div>
        </LoadScript>

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
