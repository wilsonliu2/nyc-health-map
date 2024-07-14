//=========================================================== MAP SETUP =================================================================
// MAP BOUNDS - set bounds so the map has limits for visibility
var southWest = L.latLng(40.477399, -74.25909), // Southwest bound (farther south and west)
  northEast = L.latLng(40.917577, -73.700272), // Northeast bound (farther north and east)
  bounds = L.latLngBounds(southWest, northEast);

// MAP OBJECT
var map = L.map("map", {
  maxBounds: bounds, // Map automatically bounces back to center
  maxZoom: 18,
  minZoom: 11,
}).setView([40.65, -73.97], 11);

// BASEMAP
var baseLayer = L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/light-v9",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic2hlZW5hcCIsImEiOiJja25hdXE3aGcxbGI4MnVxbnFoenhwdGRrIn0.DhFwD-KlRigYLaVwL8ipGA",
  }
).addTo(map);

//=========================================================== BOROUGH BOUNDARIES =================================================================
var boundaries = L.geoJson(boroughsGeojson, {
  onEachFeature: function (feature, layer) {
    // Hover effect
    layer.on("mouseover", function (e) {
      var layer = e.target;
      layer.setStyle({
        weight: 2,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });
    });

    // Remove hover effect
    layer.on("mouseout", function (e) {
      boundaries.resetStyle(e.target);
    });

    // Navigate to borough thru click
    layer.on("click", function (e) {
      var boroughName = feature.properties.BoroName;

      if (boroughName == "Staten Island") {
        window.location.href = "boroughs/staten-island.html";
      } else {
        window.location.href = "boroughs/" + boroughName + ".html";
      }
    });
  },
}).addTo(map);
