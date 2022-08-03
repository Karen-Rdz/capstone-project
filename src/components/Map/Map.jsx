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
  const [bounds, setBounds] = React.useState({
    north: origin.geometry.location.lat(),
    south: destination.geometry.location.lat(),
    east: origin.geometry.location.lng(),
    west: destination.geometry.location.lng(),
  });
  const locationMinDist = React.useState([]);
  const locationStopsDist = React.useRef([]);
  const locationStopsTime = React.useRef([]);
  const locationStopsFuel = React.useRef([]);

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
    let places = query.getPlaces();
    let color;

    for (let i = 1; i < places.length; i++) {
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

  function calculateStopsLocation() {
    if (response) {
      let route = response.routes[0].overview_path;
      if (stopsDist > 0) {
        let fragment = Math.floor(route.length / (stopsDist + 1));
        let start = 0;
        let stopsLocation = [];
        for (let i = 0; i < stopsDist; i++) {
          if (route[start + fragment] !== undefined) {
            stopsLocation.push(route[start + fragment]);
            start += fragment;
          }
        }
        locationStopsDist.current = stopsLocation;
      }
      if (stopsTime > 0) {
        let fragment = Math.floor(route.length / (stopsTime + 1));
        let start = 0;
        let stopsLocation = [];
        for (let i = 0; i < stopsTime; i++) {
          if (route[start + fragment] !== undefined) {
            stopsLocation.push(route[start + fragment]);
            start += fragment;
          }
        }
        locationStopsTime.current = stopsLocation;
      }
      if (stopsFuel > 0) {
        let fragment = Math.floor(route.length / (stopsFuel + 1));
        let start = 0;
        let stopsLocation = [];
        for (let i = 0; i < stopsFuel; i++) {
          if (route[start + fragment] !== undefined) {
            stopsLocation.push(route[start + fragment]);
            start += fragment;
          }
        }
        locationStopsFuel.current = stopsLocation;
      }
    }
  }

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
          onDblClick={() => {
            setBounds({
              north: map.state.map.center.lat() + 0.1,
              south: map.state.map.center.lat() - 0.1,
              east: map.state.map.center.lng() + 0.1,
              west: map.state.map.center.lng() - 0.1,
            });
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
          <StandaloneSearchBox
            onLoad={onLoad}
            bounds={bounds}
            onPlacesChanged={onPlacesChanged}
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
        <Stops
          locationStopsDist={locationStopsDist}
          locationStopsTime={locationStopsTime}
          locationStopsFuel={locationStopsFuel}
          locations={locations}
          locationMinDist={locationMinDist}
        />
        <Summary stops={stops} setStops={setStops} />
      </div>
    </>
  );
}
export default Map;
