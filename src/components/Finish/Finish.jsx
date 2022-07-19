import * as React from "react";
import { Link } from "react-router-dom";
import "./Finish.css";

export default function Finish() {
  return (
    <>
      <div className="finish">
        <h1>Thank you!</h1>
        <p>
          If you want to check all your saved trips. Click on the button below
        </p>
        <button>
          <Link to={`/trips`}>All Trips</Link>
        </button>
        <p>If you want to create another trip. Click on the button below</p>
        <button>
          <Link to={`/route`}>Create Trip</Link>
        </button>
      </div>
    </>
  );
}
