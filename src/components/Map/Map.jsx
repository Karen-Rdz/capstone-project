import React from "react";
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
  const [place, setPlace] = React.useState("");

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
    let color;
    // console.log(query);

    for (let i = 0; i < places.length; i++) {
      let lat = places[i].geometry.location.lat;
      let lng = places[i].geometry.location.lng;
      console.log(places[i].types[0]);
      if (places[i].types[0] === "gas_station") {
        color = "red";
      } else if (places[i].types[0] === "lodging") {
        color = "blue";
      } else if (places[i].types[0] === "restaurant") {
        color = "green";
      }
      let position = { lat: lat(), lng: lng(), color: color };
      setLocations((locations) => [...locations, position]);
    }
  };

  // const bounds = new window.google.maps.LatLngBounds();

  const bounds = {
    north: origin.geometry.location.lat,
    south: destination.geometry.location.lat,
    east: origin.geometry.location.lng,
    west: destination.geometry.location.lng,
  };

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
        <StandaloneSearchBox
          onLoad={onLoad}
          onPlacesChanged={onPlacesChanged}
          bounds={bounds}
        >
          <input
            type="text"
            placeholder="Search"
            onChange={(event) => setPlace(event.target.value)}
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
        {locations.map((item, index) => (
          <Marker
            position={{ lat: item.lat, lng: item.lng }}
            key={index}
            icon={{
              url: `http://maps.google.com/mapfiles/ms/icons/${item.color}-dot.png`,
            }}
            // icon={{
            //   // url: "http://maps.google.com/mapfiles/kml/shapes/gas_stations.png",
            //   // url: "https://api.iconify.design/mdi/gas-station.svg",
            //   strokeColor: "red",
            //   scale: 10,
            // }}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
}
export default Map;
