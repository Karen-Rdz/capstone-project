"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var map;
var service;
var infowindow;

export default function InitMap() {
  var sydney = new window.google.maps.LatLng(-33.867, 151.195);
  infowindow = new window.google.maps.InfoWindow();
  map = new window.google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });
  var request = {
    query: "Museum of Contemporary Art Australia",
    fields: ["name", "geometry"],
  };
  service = new window.google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, function (results, status) {
    if (
      status === window.google.maps.places.PlacesServiceStatus.OK &&
      results
    ) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}
function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;
  var marker = new window.google.maps.Marker({
    map: map,
    position: place.geometry.location,
  });
  window.google.maps.event.addListener(marker, "click", function () {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}
window.InitMap = InitMap;
