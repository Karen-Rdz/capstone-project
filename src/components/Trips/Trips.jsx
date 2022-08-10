import * as React from "react";
import { useNavigate } from "react-router-dom";
import "./Trips.css";
import axios from "axios";
import EditTrip from "../EditTrip/EditTrip";

export default function Trips({
  setOrigin,
  setDestination,
  setUser,
  setStops,
  setStopsDist,
  setStopsTime,
  setStopsFuel,
}) {
  const [trips, setTrips] = React.useState([]);
  const [currentUsers, setCurrentUsers] = React.useState([]);
  let navigate = useNavigate();
  let count = 0;

  React.useEffect(() => {
    async function fetchTrips() {
      try {
        const res = await axios.get("http://localhost:3001/trips");
        setTrips(res.data.trips);
      } catch (err) {
        alert("Can not get information for trips");
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
        alert("Can not get information of users");
      }
    }
    fetchCurrentUser();
  }, []);

  return (
    <>
      <div className="trips">
        <h1> All trips</h1>
        <div className="listTrips">
          {trips.map((trip, index) => (
            <>
              {trip.trip.user.username === currentUsers[0].username &&
              trip.trip.user.password === currentUsers[0].password ? (
                ((count += 1),
                (
                  <>
                    <div className="tripCard">
                      <div className="tripInformation">
                        <div className="tripSummary">
                          <h3>Trip #{count}</h3>
                          <p>
                            {" "}
                            <b>Origin: </b> {trip.trip.origin.name}{" "}
                            <b>Destination: </b> {trip.trip.destination.name}
                          </p>
                          {trip.trip.stops.map((stop, key) => (
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
                        </div>
                        <div className="images">
                          <img
                            className="tripImage"
                            src={trip.trip.origin_image}
                            alt={trip.trip.origin.name}
                            style={{
                              backgroundImage: `url(${trip.trip.origin_image})`,
                            }}
                          />
                          <img
                            className="tripImage"
                            src={trip.trip.destination_image}
                            alt={trip.trip.destination.name}
                            style={{
                              backgroundImage: `url(${trip.trip.destination_image})`,
                            }}
                          />
                        </div>
                      </div>
                      <EditTrip
                        origin={trip.trip.origin}
                        setOrigin={setOrigin}
                        destination={trip.trip.destination}
                        setDestination={setDestination}
                        user={trip.trip.user}
                        setUser={setUser}
                        stops={trip.trip.stops}
                        setStops={setStops}
                        stopsTime={trip.trip.stopsTime}
                        setStopsTime={setStopsTime}
                        stopsDist={trip.trip.stopsDist}
                        setStopsDist={setStopsDist}
                        stopsFuel={trip.trip.stopsFuel}
                        setStopsFuel={setStopsFuel}
                      />
                    </div>
                  </>
                ))
              ) : (
                <p></p>
              )}
            </>
          ))}
          <button className="backFinish" onClick={() => navigate("../finish")}>
            Back
          </button>
        </div>
      </div>
    </>
  );
}
