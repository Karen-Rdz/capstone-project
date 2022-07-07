import React from "react";

import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

let coords = [];

class Map2 extends React.Component {
  state = {
    center: { lat: -33.867, lng: 151.195 },
    coordsResult: [],
  };
  input = this.props.name;

  onMapLoad = (map) => {
    let request = {
      query: "Museum of Contemporary Art Australia",
      fields: ["name", "geometry"],
    };

    let service = new window.google.maps.places.PlacesService(map);

    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          coords.push(results[i]);
        }

        this.setState({
          center: results[0].geometry.location,
          coordsResult: coords,
        });
      }
    });
  };

  render() {
    return (
      <div>
        <GoogleMap
          center={this.state.center}
          zoom={13}
          onLoad={(map) => this.onMapLoad(map)}
          mapContainerStyle={{ height: "400px", width: "800px" }}
        >
          {this.state.coordsResult !== [] &&
            this.state.coordsResult.map(function (results, i) {
              // Falta el return
              <Marker key={i} position={results.geometry.location}>
                <InfoWindow options={{ maxWidth: 300 }}>
                  <span>{results.name}</span>
                </InfoWindow>
              </Marker>;
            })}
        </GoogleMap>
      </div>
    );
  }
}

export default Map2;
