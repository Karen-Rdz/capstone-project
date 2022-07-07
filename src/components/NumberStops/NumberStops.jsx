import * as React from "react";
import { Link } from "react-router-dom";
import "./NumberStops.css";
<script
  async
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc&libraries=places&callback=initMap"
></script>;

export default function NumberStops() {
  return (
    <>
      <div className="numberStops">
        <h1>Create a trip</h1>
        <div className="trip">
          <input type="text" placeholder="Origin" />
          <input type="text" placeholder="Destination" />
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
      </div>
    </>
  );
}
