import * as React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Map from "../Map/Map";
import "./NumberStops.css";
import { LoadScript } from "@react-google-maps/api";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";
import Distance from "../Distance/Distance";
import Time from "../Time/Time";

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc&libraries=geometry"></script>;
const lib = ["places", "geometry", "drawing"];

export default function NumberStops({
  origin,
  setOrigin,
  destination,
  setDestination,
}) {
  const [originInput, setOriginInput] = React.useState("");
  const [destinationInput, setDestinationInput] = React.useState("");
  const [distance, setDistance] = React.useState();
  const [time, setTime] = React.useState();

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
        setOrigin(responseOrigin.data.candidates[0]);
        // console.log(
        //   JSON.stringify(responseOrigin.data.candidates[0].geometry.location)
        // );
      })
      .catch(function (error) {
        console.log(error);
      });

    axios(configDestination)
      .then(function (responseDestination) {
        setDestination(responseDestination.data.candidates[0]);
        // console.log(
        //   // JSON.stringify(
        //   //   responseDestination.data.candidates[0].geometry.location
        //   // )
        // );
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
      // console.log(response)
      // console.log(response.rows[0].elements[0]);
      if (value === "distance") {
        setDistance(response.rows[0].elements[0].distance);
      } else if (value === "time") {
        console.log(response.rows[0].elements[0].duratio);
        setTime(response.rows[0].elements[0].duration);
      }
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
            <input type="radio" onClick={() => calculateDistance("time")} />{" "}
            Time
            <input
              type="radio"
              onClick={() => calculateDistance("distance")}
            />{" "}
            Distance
            <input type="radio" /> Fuel
          </div>
        </LoadScript>
        {origin ? (
          <p>
            {origin.name} , {destination.name}
          </p>
        ) : (
          <p></p>
        )}
        {time ? (
          <>
            <p> Time: {time.text}</p>
            <Time time={time} />
          </>
        ) : (
          <p></p>
        )}
        {distance ? (
          <>
            <p> Distance: {distance.text}</p>
            <Distance distance={distance} />
          </>
        ) : (
          <p></p>
        )}

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
