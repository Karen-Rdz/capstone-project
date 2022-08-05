import * as React from "react";
import { Circle } from "@react-google-maps/api";

export default function Circles({
  locationsDist,
  locationsTime,
  locationsFuel,
}) {
  return (
    <>
      {locationsDist.map((item, key) => (
        <>
          <Circle
            key={key}
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
      {locationsTime.map((item, key) => (
        <Circle
          key={key}
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
      {locationsFuel.map((item, key) => (
        <Circle
          key={key}
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
    </>
  );
}
