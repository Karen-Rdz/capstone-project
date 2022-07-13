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
import Markers from "../Markers/Markers";

function Map({ origin, destination }) {
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];
  const [response, setResponse] = React.useState();
  const [query, setQuery] = React.useState();
  const [location, setLocation] = React.useState([]);
  let locations = [];

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
    console.log(places);

    places.map((item) => {
      let position = item.formatted_address;
      var configMarker = {
        method: "get",
        url: `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${position}&inputtype=textquery&fields=formatted_address%2Cname%2Crating%2Copening_hours%2Cgeometry&key=${key}`,
        headers: {},
      };

      axios(configMarker)
        .then(function (responseOrigin) {
          if (responseOrigin.data.candidates[0] !== undefined) {
            locations.push({
              lat: responseOrigin.data.candidates[0].geometry.location.lat,
              lng: responseOrigin.data.candidates[0].geometry.location.lng,
            });
          }
          setLocation(locations);
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };
  console.log(location);
  return (
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
        <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
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
        {/* <Markers markers={location} /> */}
        {location.map((item, index) => (
          <Marker position={item} key={index} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
export default Map;
