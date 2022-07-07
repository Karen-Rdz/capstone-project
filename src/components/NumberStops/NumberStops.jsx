import * as React from "react";
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import "./NumberStops.css";
import { LoadScript } from "@react-google-maps/api";
import Map2 from "../Map2/Map2";

export default function NumberStops() {
  const [origin, setOrigin] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const location = {
    address: "1 Hacker Way, Menlo Park, CA 94025.",
    lat: 37.48525176224396,
    lng: -122.14830386019975,
  };

  const lib = ["places"];
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";

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
        </div>
        <div className="category">
          <input type="radio" /> Time
          <input type="radio" /> Distance
          <input type="radio" /> Fuel
        </div>
        <div className="stops">
          <h4>Number of Stops recommended: </h4>
        </div>
        <button>
          <Link to={`/planner`}>Next</Link>
        </button>
        {/* <Map location={location} zoomLevel={17} /> */}
        <LoadScript googleMapsApiKey={key} libraries={lib}>
          <Map2 name={origin} />
        </LoadScript>
      </div>
    </>
  );
}
