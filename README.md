# Lab 2 Webmap (Toronto Study Cafés)

This interactive web map is built using Mapbox GL JS. It showcases some of my favourite study cafés near the University of Toronto St. George Campus. The map also includes nearby TTC subway stations to help users explore café options that are easily accessible by public transit. In addition, a suggested café trail/route is provided for users who would like to visit multiple cafés in one trip.

The web map contains three GeoJSON data layers:

1. cafe-point.geojson:
   - Contain café Locations (point feature layer)
   - Symbolized with a coffee icon on map with café name labels displayed
   - When a user clicks on a coffee cup symbol, the map will zoom to the café, and a popup window will be displayed showing the café’s address.

2. TTC-Near_Campus.geojson:
   - Contain TTC Subway Stations data near campus (point feature layer)
   - help users to understand the transit accessibility of each café.

3. cafe-route.geojson:
   - Contain a café route (line layer)
   - symbolized with a dashed line on map that connects all cafés
   - allowing users to follow a suggested route to visit multiple cafés at once.

This map was created by Jessica Huang, updated February 10, 2026.
