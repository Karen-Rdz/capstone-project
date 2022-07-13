import * as React from "react";
import { InfoBox } from "@react-google-maps/api";

export default function Information(position) {
  console.log("information");
  return (
    <InfoBox position={position}>
      <div style={{ backgroundColor: "yellow", opacity: 0.75, padding: 12 }}>
        <div style={{ fontSize: 16, fontColor: `#08233B` }}>Hello, World!</div>
      </div>
    </InfoBox>
  );
}
