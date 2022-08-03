import * as React from "react";

export default function Stops({
  locationStopsDist,
  locationStopsTime,
  locationStopsFuel,
  locations,
  locationMinDist,
}) {
  const locationsArray = React.useRef([]);
  const locationsStopsDistArray = React.useRef([]);
  const responseArray = React.useRef([]);
  const size = React.useRef(0);
  const searchCount = React.useRef(-1);
  const [placesMinDist, setPlacesMinDist] = React.useState();
  const minDistStop = {};

  React.useEffect(() => {
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
        locationMinDist[0].push(minDistStop);
        setPlacesMinDist(locationMinDist[0]);
        console.log(placesMinDist);
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
            locations[
              indexDestination + searchCount.current * row.elements.length
            ];
          minDistanceStop = destination.distance.value;
        }
      });
    });
  }

  return (
    <div className="stopsLocations">
      <h1>Recommended Places</h1>
      <p>{JSON.stringify(placesMinDist)}</p>
      {/* {placesMinDist.map((search) =>
        search.map((stop) => (
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
        ))
      )} */}
    </div>
  );
}
