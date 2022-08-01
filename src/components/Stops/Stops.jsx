import * as React from "react";
import { Circle } from "@react-google-maps/api";

export default function Stops({
  locationStopsDist,
  locationStopsTime,
  locationStopsFuel,
  locations,
}) {
  // React.useEffect(() => {
  //   console.log("use effect en Stops");
  //   let service = new window.google.maps.DistanceMatrixService();
  //   if (locations[0] !== undefined) {
  //     console.log(locations[0]);
  //     service.getDistanceMatrix(
  //       {
  //         origins: [
  //           {
  //             lat: locationStopsDist[0].lat(),
  //             lng: locationStopsDist[0].lng(),
  //           },
  //         ],
  //         destinations: [{ lat: locations[0].lat, lng: locations[0].lng }],
  //         travelMode: "DRIVING",
  //       },
  //       callback
  //     );
  //     function callback(response, status) {
  //       console.log(response.rows[0].elements[0]);
  //     }
  //   }
  // }, [locations]);

  function closestStop(item) {
    let service = new window.google.maps.DistanceMatrixService();
    if (locations[0] !== undefined) {
      console.log(locations[0]);
      service.getDistanceMatrix(
        {
          origins: [{ lat: item.center.lat(), lng: item.center.lng() }],
          destinations: [{ lat: locations[0].lat(), lng: locations[0].lng() }],
          travelMode: "DRIVING",
        },
        callback
      );
      function callback(response, status) {
        console.log(response.rows[0].elements[0]);
      }
    }
  }

  return (
    <div className="stopsLocations">
      {locationStopsDist.current.map((item) => (
        <>
          <Circle
            onLoad={(item) => closestStop(item)}
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
