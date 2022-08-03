import * as React from "react";
import { Circle } from "@react-google-maps/api";

export default function Stops({
  locationStopsDist,
  locationStopsTime,
  locationStopsFuel,
  locations,
}) {
  const locationsArray = React.useRef([]);
  const locationsStopsDistArray = React.useRef([]);
  const responseArray = React.useRef([]);
  const size = React.useRef(0);
  const locationMinDist = React.useRef([]);
  const searchCount = React.useRef(-1);
  const minDistStop = {};

  React.useEffect(() => {
    console.log("use effect en Stops");
    let diff = locations.length - size.current;
    let service = new window.google.maps.DistanceMatrixService();
    if (locations[0] !== undefined) {
      let handleLocations = [];
      let handleLocationsStopsDist = [];
      for (let i = 0; i < diff; i++) {
        handleLocations.push({
          lat: locations[i + size.current].lat,
          lng: locations[i + size.current].lng,
        });
      }
      size.current = locations.length;
      locationsArray.current = handleLocations;
      locationStopsDist.current.forEach((location) => {
        handleLocationsStopsDist.push({
          lat: location.lat(),
          lng: location.lng(),
        });
      });
      locationsStopsDistArray.current = handleLocationsStopsDist;
      service.getDistanceMatrix(
        {
          origins: locationsStopsDistArray.current,
          destinations: locationsArray.current,
          travelMode: "DRIVING",
        },
        callback
      );
      function callback(response, status) {
        responseArray.current.push(response);
        searchCount.current = searchCount.current + 1;
        closestStop();
        locationMinDist.current.push(minDistStop);
        console.log(locationMinDist.current);
      }
    }
  }, [locations]);

  function closestStop() {
    responseArray.current[searchCount.current].rows.forEach((row, indexRow) => {
      let minDistanceStop =
        responseArray.current[searchCount.current].rows[indexRow].elements[0]
          .distance.value;
      row.elements.forEach((destination, indexDestination) => {
        if (destination.distance.value <= minDistanceStop) {
          minDistStop[indexRow] =
            locations[indexDestination + searchCount.current * 19];
          minDistanceStop = destination.distance.value;
        }
      });
    });
  }

  return (
    <div className="stopsLocations">
      {locationStopsDist.current.map((item) => (
        <>
          <Circle
            center={{ lat: item.lat(), lng: item.lng() }}
            options={{
              strokeColor: "#FF0000",
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: "#FF0000",
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: 2000,
              zIndex: 1,
            }}
          ></Circle>
        </>
      ))}
      {locationStopsTime.current.map((item) => (
        <Circle
          center={{ lat: item.lat(), lng: item.lng() }}
          options={{
            strokeColor: "#0000FF",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#0000FF",
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 2000,
            zIndex: 1,
          }}
        ></Circle>
      ))}
      {locationStopsFuel.current.map((item) => (
        <Circle
          center={{ lat: item.lat(), lng: item.lng() }}
          options={{
            strokeColor: "#00FF00",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#00FF00",
            fillOpacity: 0.35,
            clickable: false,
            draggable: false,
            editable: false,
            visible: true,
            radius: 2000,
            zIndex: 1,
          }}
        ></Circle>
      ))}
    </div>
  );
}
