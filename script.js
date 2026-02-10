//add Mapbox token
mapboxgl.accessToken =
  "pk.eyJ1IjoiamVzc2ljYWh1YW5nIiwiYSI6ImNtazNjNmdmeTBkN3AzZnEyZHRscHdod28ifQ.Pa9LhzBk1H75KBMwBngDjA";

// create map view
const map = new mapboxgl.Map({
  container: "my-map",
  style: "mapbox://styles/jessicahuang/cmle4jgcc00dv01qqd84hg94o", //add my own style URL
  center: [-79.38718, 43.658], //set starting position
  zoom: 13,
  pitch: 15, //tilt the map view
  bearing: -15, //rotate map to upright position
});

map.on("load", () => {
  //Add cafe feature data source
  map.addSource("cafe-data", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/data/cafe-point.geojson",
  });

  //Load image(coffe cup) for cafe feature symbology
  map.loadImage(
    "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/data/coffee.webp",
    (error, image) => {
      if (error) throw error;

      map.addImage("coffee", image); //add image to map

      //add cafe feature to map
      map.addLayer({
        id: "cafe-point",
        type: "symbol",
        source: "cafe-data",
        layout: {
          "icon-image": "coffee",
          "icon-size": 0.15,
          "icon-allow-overlap": true, //allow icon to overlap
          "icon-ignore-placement": true, //make icon visible even if they collides with each other
        },
      });
    },
  );

  //add name label to cafés
  map.addLayer({
    id: "cafe-label",
    type: "symbol",
    source: "cafe-data",
    layout: {
      "text-field": ["get", "Name"], //get cafe name from GeoJSON
      "text-size": 14,
      "text-offset": [0, 1.2],
      "text-anchor": "top", //move text above the icon
      "text-font": ["Open Sans Bold"],
      "text-allow-overlap": true, //allow label to overlap and show all labels even if they collide
      "text-ignore-placement": true,
    },
    paint: {
      "text-color": "rgb(53, 53, 173)",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
    },
  });

  //implement clicking interaction to cafe features
  map.on("click", "cafe-point", (e) => {
    const feature = e.features[0];
    const coords = feature.geometry.coordinates.slice();
    const props = feature.properties;

    //once clicked, zoom/fly map view to the cafe
    map.flyTo({
      center: coords,
      zoom: 17,
      pitch: 25,
      bearing: -15,
      speed: 1.2,
      essential: true,
    });

    //once the flyTo interaction end, add address pop-up for the café
    map.once("moveend", () => {
      new mapboxgl.Popup({ offset: [0, -25] })
        .setLngLat(coords)
        .setHTML(`<strong>${props.Name}</strong><br/>${props.Address}`)
        .addTo(map);
    });
  });

  //add TTC data
  map.addSource("subway-data", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/data/TTC-Near_Campus.geojson",
  });

  //visualize TTC data layer on map
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

  //add TTC name label for each station
  map.addLayer({
    id: "subway-label",
    type: "symbol",
    source: "subway-data",
    layout: {
      "text-field": ["get", "TTC Station"], //get name of stations from GeoJSON in 'TTC Station' column
      "text-size": 12,
      "text-offset": [1, 0], //move text above the circle marker
      "text-anchor": "top",
    },
    paint: {
      "text-color": "#090202",
      "text-halo-color": "#ffffff",
      "text-halo-width": 1,
    },
  });
  //add café route data
  map.addSource("cafe-route-data", {
    type: "geojson",
    data: "https://raw.githubusercontent.com/JessicaCHuang26/Lab-2-Webmap/main/data/cafe-route.geojson",
  });

  //visualize café route layer on map
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
