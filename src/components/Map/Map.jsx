import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  StandaloneSearchBox,
  Circle,
} from "@react-google-maps/api";
import MarkerInfo from "../MarkerInfo/MarkerInfo";
import Summary from "../Summary/Summary";
import Stops from "../Stops/Stops";

function Map({
  origin,
  destination,
  stops,
  setStops,
  stopsDist,
  stopsTime,
  stopsFuel,
}) {
  const key = "AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc";
  const lib = ["places", "geometry", "drawing"];
  const [response, setResponse] = React.useState();
  const [query, setQuery] = React.useState();
  const [locations, setLocations] = React.useState([]);
  const [map, setMap] = React.useState();
  const locationStopsDist = React.useRef([]);
  const locationStopsTime = React.useRef([]);
  const locationStopsFuel = React.useRef([]);
  const boundsChanged = React.useRef({});

  let count = React.useRef(0);
  const directionsCallback = (res) => {
    if (res !== null && count.current < 3) {
      if (res.status === "OK") {
        count.current += 1;
        setResponse(res);
      } else {
        count.current = 0;
      }
    }
  };

  const onLoad = (ref) => {
    setQuery(ref);
  };

  const onPlacesChanged = () => {
    console.log("query", query);
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
        rating: places[i].rating,
      };
      setLocations((locations) => [...locations, position]);
    }
  };

  // let boundsFunction = {
  //         north: origin.geometry.location.lat(),
  //         south: destination.geometry.location.lat(),
  //         east: origin.geometry.location.lng(),
  //         west: destination.geometry.location.lng(),
  //       };

  function calculateStopsLocation() {
    console.log("calculateStopsLocation");
    if (response) {
      let route = response.routes[0].overview_path;
      if (stopsDist > 0) {
        let numStops = stopsDist + 1;
        let fragment = Math.floor(route.length / numStops);
        let start = 0;
        let stopsLocation = [];
        for (let i = 0; i < numStops; i++) {
          if (route[start + fragment] !== undefined) {
            stopsLocation.push(route[start + fragment]);
            start += fragment;
          }
        }
        locationStopsDist.current = stopsLocation;
      }
      if (stopsTime > 0) {
        let numStops = stopsTime + 1;
        let fragment = Math.floor(route.length / numStops);
        let start = 0;
        let stopsLocation = [];
        for (let i = 0; i < numStops; i++) {
          if (route[start + fragment] !== undefined) {
            stopsLocation.push(route[start + fragment]);
            start += fragment;
          }
        }
        locationStopsTime.current = stopsLocation;
      }
      if (stopsFuel > 0) {
        let numStops = stopsFuel + 1;
        let fragment = Math.floor(route.length / numStops);
        let start = 0;
        let stopsLocation = [];
        for (let i = 0; i < numStops; i++) {
          if (route[start + fragment] !== undefined) {
            stopsLocation.push(route[start + fragment]);
            start += fragment;
          }
        }
        locationStopsFuel.current = stopsLocation;
      }
    }
  }

  // console.log(boundsMap);
  return (
    <>
      <LoadScript googleMapsApiKey={key} libraries={lib}>
        <GoogleMap
          ref={(map) => {
            setMap(map);
          }}
          id="planner-map"
          mapContainerStyle={{
            height: "450px",
            width: "1000px",
          }}
          zoom={10}
          onIdle={() => {
            console.log("onIdle");
            boundsChanged.current = {
              north: map.state.map.center.lat() + 0.1,
              south: map.state.map.center.lat() - 0.1,
              east: map.state.map.center.lng() + 0.1,
              west: map.state.map.center.lng() - 0.1,
            };
            console.log(boundsChanged.current);
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
              onDirectionsChanged={() => calculateStopsLocation()}
              options={{
                directions: response,
              }}
            />
          )}
          {locationStopsDist.current.map((item) => (
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
                radius: 1000,
                zIndex: 1,
              }}
            ></Circle>
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
                radius: 1000,
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
                radius: 1000,
                zIndex: 1,
              }}
            ></Circle>
          ))}
          {console.log("before search", boundsChanged.current)}
          <div ref={boundsChanged}>
            <StandaloneSearchBox
              onLoad={onLoad}
              onPlacesChanged={onPlacesChanged}
              bounds={boundsChanged.current}
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
          </div>

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
