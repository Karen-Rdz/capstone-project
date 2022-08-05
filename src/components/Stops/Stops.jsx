import * as React from "react";
import { Icon } from "@iconify/react";

export default function Stops({
  locationStopsDist,
  locationStopsTime,
  locationStopsFuel,
  locations,
  locationMinDist,
  setLocationMinDist,
  clickedButton,
  stops,
  setStops,
}) {
  const locationsArray = React.useRef([]);
  const responseArray = React.useRef([]);
  const size = React.useRef(0);
  const searchCount = React.useRef(-1);
  const calculateDistance = React.useState(true);
  let minDistStop = {};

  React.useEffect(() => {
    let diff = locations.length - size.current;
    let service = new window.google.maps.DistanceMatrixService();
    if (locations[0] !== undefined) {
      let handleLocations = [];
      let handleStopLocation = {};
      for (let i = 0; i < diff; i++) {
        handleLocations.push({
          lat: locations[i + size.current].lat,
          lng: locations[i + size.current].lng,
        });
      }
      size.current = locations.length;
      locationsArray.current = handleLocations;
      let key = "";
      let val = 0;
      if (clickedButton.current !== undefined) {
        key = Object.keys(clickedButton.current)[0];
        val = Object.values(clickedButton.current)[0];
      }
      switch (key) {
        case "distance":
          calculateDistance.current = true;
          handleStopLocation = [
            {
              lat: locationStopsDist.current[val].lat(),
              lng: locationStopsDist.current[val].lng(),
            },
          ];
          break;
        case "time":
          calculateDistance.current = true;
          handleStopLocation = [
            {
              lat: locationStopsTime.current[val].lat(),
              lng: locationStopsTime.current[val].lng(),
            },
          ];
          break;
        case "fuel":
          calculateDistance.current = true;
          handleStopLocation = [
            {
              lat: locationStopsFuel.current[val].lat(),
              lng: locationStopsFuel.current[val].lng(),
            },
          ];
          break;
        case "other":
          calculateDistance.current = false;
        default:
          calculateDistance.current = false;
          break;
      }
      searchCount.current = searchCount.current + 1;
      if (calculateDistance.current === true) {
        service.getDistanceMatrix(
          {
            origins: handleStopLocation,
            destinations: locationsArray.current,
            travelMode: "DRIVING",
          },
          callback
        );
      }
      function callback(response, status) {
        responseArray.current = response;
        closestStop();
        setLocationMinDist((locationMinDist) => [
          ...locationMinDist,
          minDistStop,
        ]);
      }
    }
  }, [locations]);

  function closestStop() {
    let row = responseArray.current.rows[0];
    let minDistanceStop = row.elements[0].distance.value;
    row.elements.forEach((destination, indexDestination) => {
      if (destination.distance.value <= minDistanceStop) {
        minDistStop = Object.assign(
          locations[
            indexDestination + searchCount.current * row.elements.length
          ],
          {
            stopType: Object.keys(clickedButton.current)[0],
            stopIndex: Object.values(clickedButton.current)[0],
          }
        );
        minDistanceStop = destination.distance.value;
      }
    });
  }

  const addStop = (stopLocation) => {
    let index = stops.findIndex((stop) => {
      if (stop === stopLocation) {
        return true;
      }
    });
    if (index === -1) {
      setStops((stops) => [...stops, stopLocation]);
    } else {
      alert("Stop already added");
    }
  };

  return (
    <div className="stopsLocations">
      <h1>Recommended Places</h1>
      {locationMinDist.map((stop, key) => (
        <>
          <h3>
            Stop of {stop.stopType} #{stop.stopIndex + 1}
          </h3>
          <p className="infoStopSummary">
            <b>Name: </b>
            {stop.name} <br />
            <b>Address: </b>
            {stop.address} <br />
            <b>Lat: </b>
            {stop.lat}, <b> Lng: </b> {stop.lng} <br />
            <b>Rating: </b>
            {stop.rating}
          </p>
          <button className="addStopButton" onClick={() => addStop(stop)}>
            <Icon className="infoBoxAddStop" icon="akar-icons:plus" />
            Add Stop
          </button>
        </>
      ))}
    </div>
  );
}
