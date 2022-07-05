import * as React from "react";
import { Link } from "react-router-dom";
import "./Planner.css";

export default function Planner() {
  return (
    <>
      <div className="planner">
        <h1>Create your stops</h1>
        <div className="information">
          <p>Origin</p>
          <p>Destination</p>
          <button>Add Stop</button>
          <button>Remove Stop</button>
          <button>See Summary</button>
          {/* Add Link to sumary page */}
          <button>Save Trip</button>
          {/* Add Link to save page */}
        </div>
        <div className="services">
          <input type="radio" /> Gas Stations
          <input type="radio" /> Restrooms
          <input type="radio" /> Restaurants
          <input type="radio" /> Hotels
        </div>
        <div className="map">
          <h3>Map</h3>
        </div>
        <button>
          <Link to={`/finish`}>Next</Link>
        </button>
      </div>
    </>
  );
}
