import * as React from "react";
import "./EditTrip.css";
import { LoadScript } from "@react-google-maps/api";
import MapStops from "../MapStops/MapStops";
import { useNavigate } from "react-router-dom";

export default function EditTrip({
  origin,
  setOrigin,
  destination,
  setDestination,
  user,
  setUser,
  stops,
  setStops,
  stopsTime,
  setStopsTime,
  stopsDist,
  setStopsDist,
  stopsFuel,
  setStopsFuel,
}) {
  const [showInformation, setShowInformation] = React.useState(false);
  const [showMap, setShowMap] = React.useState(false);
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];
  let navigate = useNavigate();

  const setValues = () => {
    setOrigin(origin);
    setDestination(destination);
    setUser(user);
    setStops(stops);
    setStopsTime(stopsTime);
    setStopsDist(stopsDist);
    setStopsFuel(stopsFuel);
    navigate("../planner");
  };
  return (
    <>
      <div className="editTrip">
        <button
          className="moreInformation"
          onClick={() => setShowInformation(!showInformation)}
        >
          More Information
        </button>
        {showInformation ? (
          <>
            <button onClick={() => setShowMap(!showMap)}>Show Map</button>
            {showMap ? (
              <LoadScript googleMapsApiKey={key} libraries={lib}>
                <MapStops
                  origin={origin}
                  destination={destination}
                  stops={stops}
                  setStops={setStops}
                />
              </LoadScript>
            ) : (
              ""
            )}
            <button onClick={() => setValues()}>Edit Trip</button>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
