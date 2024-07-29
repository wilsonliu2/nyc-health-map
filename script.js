//=========================================================== MAP SETUP =================================================================
// MAP BOUNDS - set bounds so the map has limits for visibility
var southWest = L.latLng(40.477399, -74.25909), // Southwest bound (farther south and west)
  northEast = L.latLng(42.917577, -73.700272), // Northeast bound (farther north and east)
  bounds = L.latLngBounds(southWest, northEast);

// MAP OBJECT
var map = L.map("map", {
  maxBounds: bounds, // Map automatically bounces back to center
  maxZoom: 18,
  minZoom: 10.75,
  zoomSnap: 0.25,
  zoomDelta: 0.25,
  dragging: false,
  scrollWheelZoom: false,
}).setView([40.65, -73.97], 10.75);

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

//=========================================================== CONFIGURATIONS =================================================================
// Custom colors for boroughs
function getColorForBorough(borough) {
  switch (borough) {
    case "Manhattan":
      return "#33a02c";
    case "Brooklyn":
      return "#1f78b4";
    case "Queens":
      return "#ff7f00";
    case "Bronx":
      return "#e31a1c";
    case "Staten Island":
      return "#6a3d9a";
  }
}

// Custom icon anchor for boroughs
function getIconAnchor(borough) {
  switch (borough) {
    case "Manhattan":
      return [30, 20];
    case "Brooklyn":
      return [50, 0];
    case "Queens":
      return [15, 90];
    case "Bronx":
      return [45, 20];
    case "Staten Island":
      return [10, 50];
  }
}

//=========================================================== BOROUGH BOUNDARIES =================================================================
// Combine border and summary data
function combineData(geoData, summaries) {
  geoData.features.forEach((feature) => {
    var match = summaries.find(
      (summary) => summary.County === feature.properties.BoroName
    );
    if (match) {
      Object.assign(feature.properties, match);
    }
  });
  return geoData;
}

var formatter = new Intl.NumberFormat("en-US");

var boundaries = L.geoJson(combineData(boroughsGeojson, countySummaries), {
  style: function (feature) {
    return {
      color: getColorForBorough(feature.properties.BoroName),
      weight: 2,
      opacity: 1,
      fillOpacity: 0.7,
    };
  },
  onEachFeature: function (feature, layer) {
    var center = layer.getBounds().getCenter();
    var label = L.marker(center, {
      icon: L.divIcon({
        className: "borough-label",
        html: feature.properties.BoroName,
        iconAnchor: getIconAnchor(feature.properties.BoroName),
      }),
    }).addTo(map);

    // Hover effect
    layer.on("mouseover", function (e) {
      var layer = e.target;
      layer.setStyle({
        weight: 2,
        color: "#666",
        dashArray: "",
        fillOpacity: 0.7,
      });
      // Update info with hovered borough
      info.update(layer.feature.properties);
    });

    // Remove hover effect
    layer.on("mouseout", function (e) {
      // Reset styles and info
      boundaries.resetStyle(e.target);
      info.update();
    });

    // Navigate to borough on click
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

// Info control
var info = L.control();

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info");
  this.update();
  return this._div;
};

info.update = function (props) {
  if (props) {
    this._div.innerHTML = `
      <h4>${props.County} Data</h4>
      <b>Total Population:</b> ${formatter.format(
        props["Total population"]
      )}<br />
      <b>Male Population:</b> ${formatter.format(props.Male)} (${
      props["Male Pct"]
    }%)<br />
      <b>Female Population:</b> ${formatter.format(props.Female)} (${
      props["Female Pct"]
    }%)<br />
      <b>Under 5 Years:</b> ${formatter.format(props["Under 5 years"])} (${(
      props["Under 5 pct"] * 100
    ).toFixed(2)}%)<br />
      <b>Median Age:</b> ${props["Median age (years)"]}<br />
      <b>Under 18 Years:</b> ${formatter.format(
        props["Under 18 years"]
      )} (${props["Under 18 pct"].toFixed(2)}%)<br />
      <b>18 Years and Over:</b> ${formatter.format(
        props["18 years and over"]
      )} (${(props["18 and up pct"] * 100).toFixed(2)}%)<br />
      <b>65 Years and Over:</b> ${formatter.format(
        props["65 years and over"]
      )} (${(props["5 and up pct"] * 100).toFixed(2)}%)<br />
      <b>White Population:</b> ${formatter.format(props.White)} (${
      props["White pct"]
    }%)<br />
      <b>Black or African American Population:</b> ${formatter.format(
        props["Black or African American"]
      )} (${props["Black pct"]}%)<br />
      <b>Asian Population:</b> ${formatter.format(props.Asian)} (${
      props["Asian pct"]
    }%)<br />
      <b>Hispanic or Latino Population:</b> ${formatter.format(
        props["Hispanic or Latino (of any race)"]
      )} (${props["Hispanic pct"]}%)<br />
      <b>Not Hispanic or Latino Population:</b> ${formatter.format(
        props["Not Hispanic or Latino"]
      )} (${props["Non Hispanic pct"]}%)<br />
      <b>Total Population 2021 Estimates:</b> ${formatter.format(
        props["Total population 2021 estimates"]
      )}<br />
      <b>Lack of Health Insurance Crude Prevalence (%):</b> ${
        props["Lack of health insurance crude prevalence (%) *"]
      }%<br />
      <b>Arthritis Crude Prevalence (%):</b> ${
        props["Arthritis crude prevalence (%)"]
      }%<br />
      <b>Current Asthma Crude Prevalence (%):</b> ${
        props["Current asthma crude prevalence (%)"]
      }%<br />
      <b>High Blood Pressure Crude Prevalence (%):</b> ${
        props["High blood pressure crude prevalence (%)"]
      }%<br />
      <b>Diabetes Crude Prevalence (%):</b> ${
        props["Diabetes crude prevalence (%)"]
      }%<br />
      <b>Obesity Crude Prevalence (%):</b> ${
        props["Obesity crude prevalence (%)"]
      }%<br />
    `;
  } else {
    this._div.innerHTML = `
    <h4>NYC Borough Data</h4>
    <p>Hover over a borough to see its data.<br>Click on a borough for more details.</p>
  `;
  }
};

info.addTo(map);
