import * as React from "react";
import { Circle, InfoBox } from "@react-google-maps/api";

export default function Stops({ position, color }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleToggleOpen = () => {
    console.log("handle toggle open");
    setIsOpen(true);
  };
  return (
    console.log(isOpen),
    (
      <>
        <div className="stopsLocation">
          <Circle
            center={{ lat: position.lat(), lng: position.lng() }}
            options={{
              strokeColor: color,
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: color,
              fillOpacity: 0.35,
              clickable: false,
              draggable: false,
              editable: false,
              visible: true,
              radius: 1000,
              zIndex: 1,
            }}
            onMouseOver={handleToggleOpen}
          ></Circle>
          {isOpen ? (
            <InfoBox
              options={{ closeBoxURL: "", enableEventPropagation: true }}
              position={{ lat: position.lat(), lng: position.lng() }}
            >
              <p>
                Lat: {position.lat()}, Lng: {position.lng()}
              </p>
            </InfoBox>
          ) : (
            ""
          )}
        </div>
      </>
    )
  );
}
