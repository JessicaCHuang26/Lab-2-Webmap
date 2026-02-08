mapboxgl.accessToken =
  "pk.eyJ1IjoiamVzc2ljYWh1YW5nIiwiYSI6ImNtazNjNmdmeTBkN3AzZnEyZHRscHdod28ifQ.Pa9LhzBk1H75KBMwBngDjA"; // Add default public map token from your Mapbox account
const map = new mapboxgl.Map({
  container: "my-map", // map container ID
  style: "mapbox://styles/jessicahuang/cmle4jgcc00dv01qqd84hg94o", // style URL
  center: [-79.38318, 43.65323], // starting position [lng, lat]
  zoom: 12, // starting zoom level
});

map.on("load", () => {
  // Add a data source containing GeoJSON data
  map.addSource("cafe-data", {
    type: "geojson",
    data: ,
  });
  // Visualize data layer on map
  map.addLayer({
    id: "cafe-point",
    type: "circle",
    source: "cafe-data",
    paint: {
      "circle-radius": 6,
      "circle-color": "#B42222",
    },
  });
});
