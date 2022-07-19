import * as React from "react";
import "./Trips.css";
import axios from "axios";

export default function Trips() {
  const [trips, setTrips] = React.useState([]);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  let count = 0;

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
                      {stop.lat}, <b> Lng: </b> {stop.lng}
                    </p>
                  ))}
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
