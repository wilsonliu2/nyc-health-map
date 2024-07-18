// Function to populate the zip code dropdown
function populateZipCodeDropdown() {
  const dropdown = document.getElementById("zip-code-dropdown");
  // Do not show zipcode not in the borough
  zipCodeData.forEach((zipCode) => {
    if (zipCode.Borough !== BORO_NAME) {
      return;
    }
    const option = document.createElement("option");
    option.value = zipCode["Zip Code"];
    option.textContent = `${zipCode["Zip Code"]}`;
    dropdown.appendChild(option);
  });
}

// Function to update the content container
function updateContentContainer(selectedZipCode) {
  const zipCodeContentContainer = document.getElementById("zip-code-content");

  // Default
  zipCodeData.forEach((zipCode) => {
    if (selectedZipCode === "Select a Zip Code") {
      zipCodeContentContainer.innerHTML = `
      <br>
      <br>
      <h3 style="text-align:center">Select a new zip code</h3>
      <br>
      <h3 style="text-align:center"><i>or</i></h3>
      <br>
      <h5 style="text-align:center">Check out the charts below to see an overview of the health statistics on a neighborhood level.</h5>
      `;
      return;
    }
    // Selected zip
    if (zipCode["Zip Code"] == selectedZipCode) {
      zipCodeContentContainer.innerHTML = `
      <h4 style="text-align: center; font-size: 1.5rem;"><strong>${zipCode["Zip Code"]}</strong></h4> 
      <p>Neighborhood: ${zipCode.Neighborhood}<br>Estimated Population: ${zipCode["Total population"]}<br> Median Population Age: ${zipCode["Median age"]}

      <details>
        <summary>Population Details</summary>
        <div id="chart-navigation">
          <button id="prev-chart">←</button>
          <span id="chart-title" style="font-weight: bold; margin: 0 10px;"></span>
          <button id="next-chart">→</button>
        </div>
        <div id="chart-container"></div>
      </details>

      <h5 style="font-size: 18px;margin-bottom: 0px;"><strong>Language Statistics</strong></h5> 
      <li class="list-item">Speakers of one or more language other than English: ${zipCode["Speak other languages"]}%</li>
      <li class="list-item">Non-English fluent: ${zipCode["Non-Fluent"]}%</li> 
      <li class="list-item">Most commonly spoken non-English language: <span class="language">${zipCode.Language}</span></li>
      
      <h5 style="font-size: 18px;margin-bottom: 0px;"><strong>Health Statistics</strong></h5> 
      <li class="list-item">Uninsured: ${zipCode["Lack of health insurance"]}%</li><br>
      <h6 style="line-height: 0.4;margin-bottom: 5px;margin-top: 10px;">

      <i style="font-size: 13px;line-height: 0px;letter-spacing: 0.069em;font-weight: 600; font-style: normal;">Health Outcomes</i></h6>
      <li class="list-item">Cancer prevalence: ${zipCode["Cancer (except skin)"]}%</li>
      <li class="list-item">Chronic kidney disease: ${zipCode["Chronic kidney disease"]}%</li>
      <li class="list-item">Asthma: ${zipCode["Current asthma"]}%</li>
      <li class="list-item">Diabetes: ${zipCode.Diabetes}%</li>
      <li class="list-item">Obesity: ${zipCode.Obesity}%</li><br>

      <h6 style="line-height: 0.4;margin-bottom: 5px;margin-top: 10px;">
      <i style="font-size: 13px;line-height: 0px;letter-spacing: 0.069em;font-weight: 600; font-style: normal;">Health Risk Behaviors</i></h6>
      <li class="list-item">Smokers: ${zipCode["Current smoking"]}%</li>
      <li class="list-item">Binge drinkers: ${zipCode["Binge drinking"]}%</li>
      <li class="list-item">Do not participate in leisure physical activities or exercises: ${zipCode["Physical inactivity"]}%</li>
      <li class="list-item">Short sleep duration: ${zipCode["Sleep <7 hours"]}%</li><br>

      <h6 style="line-height: 0.4;margin-bottom: 5px;margin-top: 10px;">
      <i style="font-size: 13px;line-height: 0px;letter-spacing: 0.069em;font-weight: 600; font-style: normal;">Screening Rates</i></h6>
      <li class="list-item">Recent check up with primary care physician: ${zipCode["Annual checkup"]}%</li>
      <li class="list-item">Recent colorectal cancer screening: ${zipCode["Colorectal cancer screening"]}%</li>
      <li class="list-item">Recent cervical cancer screening: ${zipCode["Cervical cancer screening"]}%</li>
      <li class="list-item">Recent visit to a dentist or dental clinic: ${zipCode["Dental visit"]}%</li>
      <li class="list-item">Recent mammography screening: ${zipCode["Mammography use"]}%</li><br>

      <h6 style="line-height: 0.4;margin-bottom: 5px;margin-top: 10px;">
      <i style="font-size: 13px;line-height: 0px;letter-spacing: 0.069em;font-weight: 600; font-style: normal;">Health Status</i></h6>
      <li class="list-item">Fair or poor health: ${zipCode["Fair or poor health"]}%</li>
      <li class="list-item">Any disability: ${zipCode["Any disability"]}%</li>
      <li class="list-item">Vision disability: ${zipCode["Vision disability"]}%</li>
      <li class="list-item">Hearing disability: ${zipCode["Hearing disability"]}%</li>
    `;
      let currentChartIndex = 0;
      const chartTypes = ["gender", "age", "ethnicity", "race"];

      function showChart(index) {
        const chartType = chartTypes[index];
        document.getElementById("chart-title").textContent =
          chartType.charAt(0).toUpperCase() + chartType.slice(1);
        if (chartType === "race") {
          updateBarPlotForRaceZip("chart-container", zipCode);
        } else {
          updatePieChartZip("chart-container", chartType, zipCode);
        }
      }

      showChart(currentChartIndex);

      document.getElementById("prev-chart").addEventListener("click", () => {
        currentChartIndex =
          (currentChartIndex - 1 + chartTypes.length) % chartTypes.length;
        showChart(currentChartIndex);
      });

      document.getElementById("next-chart").addEventListener("click", () => {
        currentChartIndex = (currentChartIndex + 1) % chartTypes.length;
        showChart(currentChartIndex);
      });
    }
  });
}

// On DOM loaded populate zip code dropdown
document.addEventListener("DOMContentLoaded", () => {
  populateZipCodeDropdown();
});

// On dropdown changed, update the content container
document
  .getElementById("zip-code-dropdown")
  .addEventListener("change", function () {
    const selectedZip = this.value;
    updateContentContainer(selectedZip);
  });

function updatePieChartZip(id, type, properties) {
  var pieData = [];

  if (type === "gender") {
    pieData = [
      { label: "Male", value: properties.Male },
      { label: "Female", value: properties.Female },
    ];
  } else if (type === "age") {
    pieData = [
      { label: "Under 5", value: properties["Under 5 years"] },
      { label: "Under 18", value: properties["Under 18 years"] },
      { label: "18 and over", value: properties["18 years and over"] },
      { label: "65 and over", value: properties["65 years and over"] },
    ];
  } else if (type == "ethnicity") {
    pieData = [
      { label: "Hispanic", value: properties["Hispanic or Latino"] },
      { label: "Non-Hispanic", value: properties["Not Hispanic or Latino"] },
    ];
  }

  createPieChartForDemographic(`#${id}`, pieData, {});
}

function updateBarPlotForRaceZip(id, properties) {
  var barData = [
    { label: "White", value: parseInt(properties.White) },
    {
      label: "Black",
      value: parseInt(properties["Black or African American"]),
    },
    {
      label: "AIAN",
      value: parseInt(properties["American Indian and Alaska Native"]),
    },
    { label: "Asian", value: parseInt(properties.Asian) },
    {
      label: "NHOPI",
      value: parseInt(properties["Native Hawaiian and Other Pacific Islander"]),
    },
    {
      label: "Other",
      value: parseInt(properties["Some Other Race"]),
    },
  ];

  createBarPlotForDemographics(`#${id}`, barData);
}
