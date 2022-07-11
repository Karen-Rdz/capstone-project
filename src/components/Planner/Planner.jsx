import * as React from "react";
import { Link } from "react-router-dom";
import "./Planner.css";
import Map from "../Map/Map";
import { LoadScript } from "@react-google-maps/api";

export default function Planner({ origin, destination }) {
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];

  return (
    <>
      <div className="planner">
        <h1>Create your stops</h1>
        <div className="accions">
          <p>Origin: {origin.name} </p>
          <p> Destination: {destination.name} </p>
          <button>Add Stop</button>
          <button>Remove Stop</button>
          <button>
            <Link to={`/summary`}>Summary</Link>
          </button>
          <button>Save Trip</button>
        </div>
        <div className="services">
          <input type="radio" /> Gas Stations
          <input type="radio" /> Restrooms
          <input type="radio" /> Restaurants
          <input type="radio" /> Hotels
        </div>
        <div className="map">
          <h3>Map</h3>
          <Map origin={origin} destination={destination} />
        </div>
        <button>
          <Link to={`/finish`}>Next</Link>
        </button>
      </div>
    </>
  );
}
