import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsService,
  DirectionsRenderer,
  StandaloneSearchBox,
  Marker,
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
  const [boundsMap, setBoundsMap] = React.useState({});
  const [dragEnd, setDragEnd] = React.useState();
  const prevCenter = React.useRef({});
  let locationStops = React.useRef([]);

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

  const onLoad = (ref) => {
    setQuery(ref);
  };

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
        rating: places[i].rating,
      };
      setLocations((locations) => [...locations, position]);
    }
  };

  React.useEffect(() => {
    console.log("use effect");
    if (map) {
      setBoundsMap({
        north: map.state.map.center.lat() + 0.1,
        south: map.state.map.center.lat() - 0.1,
        east: map.state.map.center.lng() + 0.1,
        west: map.state.map.center.lng() - 0.1,
      });
    } else {
      try {
        let boundsFunction = {
          north: origin.geometry.location.lat(),
          south: destination.geometry.location.lat(),
          east: origin.geometry.location.lng(),
          west: destination.geometry.location.lng(),
        };
        setBoundsMap(boundsFunction);
      } catch (error) {
        let boundsOriginal = {
          north: origin.geometry.location.lat,
          south: destination.geometry.location.lat,
          east: origin.geometry.location.lng,
          west: destination.geometry.location.lng,
        };
        setBoundsMap(boundsOriginal);
      }
    }
  }, [locations]);

  React.useEffect(() => {
    prevCenter.current = boundsMap;
  }, [boundsMap]);

  function calculateStopsLocation() {
    console.log("calculateStopsLocation");
    if (response) {
      let route = response.routes[0].overview_path;
      console.log(route.length);
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
        locationStops.current = stopsLocation;
        // console.log(locationStops);
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
          onDragEnd={() => {
            console.log(map.state.map.center.lat());
            console.log("on drag end");
            setDragEnd(true);
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
            onPlacesChanged={onPlacesChanged}
            bounds={boundsMap}
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
          {locationStops.current.map((item) => (
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
        </GoogleMap>
      </LoadScript>
      <div>
        <Summary stops={stops} setStops={setStops} />
      </div>
    </>
  );
}
export default Map;
