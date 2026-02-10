// add Mapbox token
mapboxgl.accessToken =
  "pk.eyJ1IjoiamVzc2ljYWh1YW5nIiwiYSI6ImNtazNjNmdmeTBkN3AzZnEyZHRscHdod28ifQ.Pa9LhzBk1H75KBMwBngDjA";

// create map container
const map = new mapboxgl.Map({
  container: "my-map", // map container ID
  style: "mapbox://styles/jessicahuang/cmle4jgcc00dv01qqd84hg94o", // add my own style URL
  center: [-79.38718, 43.658], // starting position [lng, lat]
  zoom: 13, // starting zoom level,
  pitch: 15, // tilt (0 = flat, 60 = nice 3D),
  bearing: -15, // rotate map to upright position
});

map.on("load", () => {
  // Add cafe feature data source
  map.addSource("cafe-data", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/cafe-point.geojson",
  });

  // Load image for cafe feature symbology
  map.loadImage(
    "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/coffee.webp",
    (error, image) => {
      if (error) throw error;

      map.addImage("coffee", image); // add image to map

      //add cafe feature and its symbology to map
      map.addLayer({
        id: "cafe-point",
        type: "symbol",
        source: "cafe-data",
        layout: {
          "icon-image": "coffee",
          "icon-size": 0.15,
          "icon-allow-overlap": true, // show all icon to ensure no hidden icon when overlapped
          "icon-ignore-placement": true,
        },
      });
    },
  );

  // Visualize data layer on map
  // map.addLayer({
  //   id: "cafe-point",
  //   type: "circle",
  //   source: "cafe-data",
  //   paint: {
  //     "circle-radius": 3,
  //     "circle-color": "#ffffff",
  //     "circle-stroke-color": "#38429e",
  //     "circle-stroke-width": 3,
  //   },
  // });

  map.addLayer({
    id: "cafe-label",
    type: "symbol",
    source: "cafe-data",
    layout: {
      "text-field": ["get", "Name"], // <-- column name from GeoJSON
      "text-size": 14,
      "text-offset": [0, 1.2], // move text above the dot
      "text-anchor": "top",
      "text-font": ["Open Sans Bold"],
      "text-allow-overlap": true, // show all labels
      "text-ignore-placement": true,
    },
    paint: {
      "text-color": "rgb(53, 53, 173)",
      "text-halo-color": "#ffffff", //
      "text-halo-width": 1,
    },
  });

  map.on("click", "cafe-point", (e) => {
    const feature = e.features[0];
    const coords = feature.geometry.coordinates.slice(); // slice avoids mutation bug
    const props = feature.properties;

    // fly to cafe first
    map.flyTo({
      center: coords,
      zoom: 17,
      pitch: 25,
      bearing: -15,
      speed: 1.2,
      essential: true,
    });

    // wait until fly animation finishes
    map.once("moveend", () => {
      new mapboxgl.Popup({ offset: [0, -25] })
        .setLngLat(coords)
        .setHTML(`<strong>${props.Name}</strong><br/>${props.Address}`)
        .addTo(map);
    });
  });

  map.addSource("subway-data", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/TTC-Near_Campus.geojson",
  });
  // Visualize data layer on map
  map.addLayer({
    id: "subway-point",
    type: "circle",
    source: "subway-data",
    paint: {
      "circle-radius": 3,
      "circle-color": "#090202",
      "circle-stroke-color": "#ffffff",
      "circle-stroke-width": 2,
    },
  });

  map.addLayer({
    id: "subway-label",
    type: "symbol",
    source: "subway-data",
    layout: {
      "text-field": ["get", "TTC Station"], // <-- column name from GeoJSON
      "text-size": 12,
      "text-offset": [1, 0], // move text above the dot
      "text-anchor": "top",
    },
    paint: {
      "text-color": "#090202",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
    },
  });

  map.addSource("cafe-route-data", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/cafe-route.geojson",
  });
  // Visualize data layer on map
  map.addLayer({
    id: "cafe-route",
    type: "line",
    source: "cafe-route-data",
    paint: {
      "line-width": 4,
      "line-color": "#10edea",
      "line-dasharray": [2, 0.5],
    },
  });
});
