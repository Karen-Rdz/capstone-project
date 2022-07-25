import * as React from "react";
import "./Trips.css";
import axios from "axios";
import MapStops from "../MapStops/MapStops";
import { LoadScript } from "@react-google-maps/api";

export default function Trips() {
  const [trips, setTrips] = React.useState([]);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  const [showMap, setShowMap] = React.useState(false);
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];
  let count = 0;

  function setStops() {}

  React.useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await axios.get("http://localhost:3001/trips");
        setTrips(res.data.trips);
      } catch (err) {
        console.log(err);
      }
    }
    fetchTrips();
  }, []);

  React.useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await axios.get("http://localhost:3001/sessions");
        setCurrentUsers((currentUsers) => [
          ...currentUsers,
          res.data.sessions[0].user,
        ]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrentUser();
  }, []);

  return (
    <>
      <div className="trips">
        <h1>Trips</h1>
        {trips.map((trip, index) => (
          <>
            {trip.trip.user.username === currentUsers[0].username &&
            trip.trip.user.password === currentUsers[0].password ? (
              ((count += 1),
              (
                <>
                  <h3>Trip #{count}</h3>
                  <p>
                    {" "}
                    <b>Origin: </b> {trip.trip.origin.name} <b>Destination: </b>{" "}
                    {trip.trip.destination.name}
                  </p>
                  {trip.trip.stops.map((stop) => (
                    <p>
                      <b>Name: </b>
                      {stop.name} <br />
                      <b>Address: </b>
                      {stop.address} <br />
                      <b>Lat: </b>
                      {stop.lat}, <b> Lng: </b> {stop.lng} <br />
                      <b>Rating: </b>
                      {stop.rating}
                    </p>
                  ))}
                  <button onClick={() => setShowMap(!showMap)}>Show Map</button>
                  {showMap ? (
                    (setShowMap(!showMap),
                    (
                      <LoadScript googleMapsApiKey={key} libraries={lib}>
                        <MapStops
                          origin={trip.trip.origin}
                          destination={trip.trip.destination}
                          stops={trip.trip.stops}
                          setStops={setStops}
                        />
                      </LoadScript>
                    ))
                  ) : (
                    <p></p>
                  )}
                </>
              ))
            ) : (
              <p></p>
            )}
          </>
        ))}
      </div>
    </>
  );
}
