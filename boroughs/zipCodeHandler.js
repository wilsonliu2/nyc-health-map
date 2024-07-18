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
        <p><a href="#">Gender</a> | <a href="#">Age</a> | <a href="#">Ethnicity</a> | <a href="#">Race</a></p>
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
