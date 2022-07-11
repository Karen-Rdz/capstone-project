import React from "react";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";

const containerStyle = {
  width: "800px",
  height: "400px",
};

function TestMap({ origin, destination }) {
  const originLocation = {
    lat: origin.lat,
    lng: origin.lng,
  };
  const destinationLocation = {
    lat: destination.lat,
    lng: destination.lng,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyBRor9dsPY8WcfhoMvQM7bHbEXo-NsiUGc">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={originLocation}
        zoom={10}
      >
        <Marker
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={originLocation}
        />
        <Marker
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 7,
          }}
          position={destinationLocation}
        />
        <Polyline
          path={[originLocation, destinationLocation]}
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
            radius: 30000,
            zIndex: 1,
          }}
        />
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(TestMap);
