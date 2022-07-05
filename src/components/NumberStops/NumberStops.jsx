import * as React from "react";
import { Link } from "react-router-dom";
import "./NumberStops.css";

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
          <Link to={`/stops`}>Next</Link>
        </button>
      </div>
    </>
  );
}
