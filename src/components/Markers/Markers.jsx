import React from "react";
import { Marker } from "@react-google-maps/api";

export default function ({ markers }) {
  return markers.map((marker) => <Marker position={marker} />);
}
