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
import Stops from "../Stops/Stops";
import Circles from "../Circles/Circles";
import ButtonsStops from "../ButtonsStops/ButtonsStops";

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
  const [locationMinDist, setLocationMinDist] = React.useState([]);
  const locationStopsDist = React.useRef([]);
  const locationStopsTime = React.useRef([]);
  const locationStopsFuel = React.useRef([]);
  const clickedButton = React.useRef();

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

      switch (type) {
        case "gas_station":
          color = "red";
          break;
        case "lodging":
          color = "blue";
          break;
        case "restaurant":
          color = "green";
          break;
        case "bar":
          color = "green";
          break;
        case "cafe":
          color = "green";
          break;
        case "meal_delivery":
          color = "green";
          break;
        default:
          color = "yellow";
          break;
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
      locationStopsDist.current = calculateStops(stopsDist, route);
      locationStopsTime.current = calculateStops(stopsTime, route);
      locationStopsFuel.current = calculateStops(stopsFuel, route);
    }
  }

  function calculateStops(stopsArray, route) {
    if (stopsArray > 0) {
      let fragment = Math.floor(route.length / (stopsArray + 1));
      let start = 0;
      let stopsLocation = [];
      for (let i = 0; i < stopsArray; i++) {
        if (route[start + fragment] !== undefined) {
          stopsLocation.push(route[start + fragment]);
          start += fragment;
        }
      }
      return stopsLocation;
    } else return [];
  }

  return (
    <>
      <ButtonsStops
        locationStopsDist={locationStopsDist}
        locationStopsTime={locationStopsTime}
        locationStopsFuel={locationStopsFuel}
        setBounds={setBounds}
        clickedButton={clickedButton}
      />
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
              className="inputPlaces"
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
          <Circles
            locationsDist={locationStopsDist.current}
            locationsTime={locationStopsTime.current}
            locationsFuel={locationStopsFuel.current}
          ></Circles>
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
          setLocationMinDist={setLocationMinDist}
          clickedButton={clickedButton}
        />
        <Summary stops={stops} setStops={setStops} />
      </div>
    </>
  );
}
export default Map;
