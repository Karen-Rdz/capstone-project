import React from "react";
import axios from "axios";
import {
  GoogleMap,
  LoadScript,
  Marker,
  DirectionsService,
  DirectionsRenderer,
  StandaloneSearchBox,
} from "@react-google-maps/api";

function Map({ origin, destination }) {
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];
  const [response, setResponse] = React.useState();
  const [query, setQuery] = React.useState();
  const [locations, setLocations] = React.useState([]);

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

  const onLoad = (ref) => setQuery(ref);

  const onPlacesChanged = () => {
    let places = query.getPlaces();

    for (let i = 0; i < places.length; i++) {
      let lat = places[i].geometry.location.lat;
      let lng = places[i].geometry.location.lng;
      let position = { lat: lat(), lng: lng() };
      setLocations((locations) => [...locations, position]);
    }
  };
  // console.log(locations);

  return (
    console.log(locations),
    (
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <GoogleMap
          id="direction-example"
          mapContainerStyle={{
            height: "400px",
            width: "800px",
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
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Customized your placeholder"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                fontSize: `14px`,
                outline: `none`,
                textOverflow: `ellipses`,
                position: "absolute",
                left: "50%",
                marginLeft: "-120px",
              }}
            />
          </StandaloneSearchBox>
          {/* <Marker position={locations[0]} /> */}
          {locations.map(
            (item, index) => (
              console.log(item), (<Marker position={item} key={index} />)
            )
          )}
        </GoogleMap>
      </LoadScript>
    )
  );
}
export default Map;
