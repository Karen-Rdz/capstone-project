import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

function Map({ origin, destination }) {
  const [response, setResponse] = React.useState();

  let count = React.useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < 1) {
      if (res.status === "OK") {
        count.current += 1;
        setResponse(res);
      } else {
        count.current = 0;
        console.log("res: ", res);
      }
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc">
      <GoogleMap
        id="direction-example"
        mapContainerStyle={{
          height: "400px",
          width: "800px",
        }}
        zoom={10}
        center={{
          lat: origin.geometry.location.lat,
          lng: origin.geometry.location.lng,
        }}
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
      </GoogleMap>
    </LoadScript>
  );
}
export default Map;
