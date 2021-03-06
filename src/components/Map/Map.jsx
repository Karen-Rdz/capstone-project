import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  StandaloneSearchBox,
} from "@react-google-maps/api";
import MarkerInfo from "../MarkerInfo/MarkerInfo";
import Summary from "../Summary/Summary";

function Map({ origin, destination, stops, setStops }) {
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];
  const [response, setResponse] = React.useState();
  const [query, setQuery] = React.useState();
  const [locations, setLocations] = React.useState([]);
  const [map, setMap] = React.useState();
  const [boundsMap, setBoundsMap] = React.useState();

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

  const onLoad = (ref) => setQuery(ref);

  const onPlacesChanged = () => {
    let places = query.getPlaces();
    let color;

    for (let i = 0; i < places.length; i++) {
      let lat = places[i].geometry.location.lat;
      let lng = places[i].geometry.location.lng;
      let type = places[i].types[0];
      if (type === "gas_station") {
        color = "red";
      } else if (type === "lodging") {
        color = "blue";
      } else if (
        type === "restaurant" ||
        type === "bar" ||
        type === "cafe" ||
        type === "meal_delivery"
      ) {
        color = "green";
      } else {
        color = "yellow";
      }

      let position = {
        lat: lat(),
        lng: lng(),
        color: color,
        name: places[i].name,
        address: places[i].formatted_address,
      };
      setLocations((locations) => [...locations, position]);
    }

    // setBoundsMap(new window.google.maps.getBounds());
    // console.log(boundsMap);
  };

  const bounds = {
    north: origin.geometry.location.lat(),
    south: destination.geometry.location.lat(),
    east: origin.geometry.location.lng(),
    west: destination.geometry.location.lng(),
  };

  // const onLoadMap = React.useCallback((map) => setMap(map), []);

  return (
    <>
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <GoogleMap
          ref={(map) => {
            setMap(map);
          }}
          // onIdle={() => {
          //   let ne = map.getBounds;
          //   console.log(map.LatLngBounds);
          //   console.log(ne);
          // let sw = map.getBounds.getSouthWest();
          // console.log(ne.lat() + ";" + ne.lng());
          // console.log(sw.lat() + ";" + sw.lng());
          // }}
          // onIdle={() => {
          //   let lat = map.state.map.center.lat;
          //   let lng = map.state.map.center.lng;
          //   console.log(lat(), lng());
          //   console.log(map.state.map.__gm.pixelBounds.Aa);
          //   const bounds = new window.google.maps.LatLngBounds();
          //   console.log(bounds);
          //   map.fitBounds(bounds);
          // }}
          id="planner-map"
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
          <StandaloneSearchBox
            onLoad={onLoad}
            onPlacesChanged={onPlacesChanged}
            bounds={bounds}
            zoom={10}
          >
            <input
              type="text"
              placeholder="Search"
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
          {locations.map((item) => (
            <MarkerInfo
              position={item}
              stops={stops}
              setStops={setStops}
              isAddStopsActivated={true}
            />
          ))}
        </GoogleMap>
      </LoadScript>
      <div>
        <Summary stops={stops} setStops={setStops} />
      </div>
    </>
  );
}
export default Map;
