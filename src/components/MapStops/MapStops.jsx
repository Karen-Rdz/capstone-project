import React from "react";
import {
  GoogleMap,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
import MarkerInfo from "../MarkerInfo/MarkerInfo";

function MapStops({ origin, destination, stops, setStops }) {
  const [response, setResponse] = React.useState();

  let count = React.useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < 1) {
      if (res.status === "OK") {
        count.current += 1;
        setResponse(res);
      } else {
        count.current = 0;
      }
    }
  };

  return (
    <>
      <GoogleMap
        id="planner-map-stops"
        mapContainerStyle={{
          height: "450px",
          width: "1000px",
        }}
        zoom={10}
      >
        {destination !== "" && origin !== "" && (
          <DirectionsService
            options={{
              destination: destination.name,
              origin: origin.name,
              travelMode: "DRIVING",
            }}
            callback={(e) => directionsCallback(e)}
          />
        )}
        {response !== null && (
          <DirectionsRenderer
            options={{
              directions: response,
            }}
          />
        )}
        {stops.map((stop) => (
          <MarkerInfo position={stop} stops={stops} setStops={setStops} />
        ))}
      </GoogleMap>
    </>
  );
}
export default MapStops;
