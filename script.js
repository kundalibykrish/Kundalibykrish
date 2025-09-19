// A map to store the position of each planet in the kundali
let kundaliChart = {};
let grahaInHouse = {}; // Store an array of planets for each house

// A map to store the full name for each planet initial
const planetInitialMap = {
  surya: "Su",
  chandra: "Ch",
  mangal: "Ma",
  budh: "Bu",
  guru: "Gu",
  shukra: "Shu",
  shani: "Sh",
  rahu: "Ra",
  ketu: "Ke",
};

// --- DOM Elements ---
const kundaliGrid = document.getElementById("kundali-grid");
const lagnaSelect = document.getElementById("lagna-select");
const planetSelect = document.getElementById("planet-select");
const analyzeBtn = document.getElementById("analyze-btn");
const resetBtn = document.getElementById("reset-btn");
const analysisResults = document.getElementById("analysis-results");

// --- Functions ---

// Function to create the Kundali chart houses and set Lagna
function createKundaliChart(lagnaRashi) {
  kundaliGrid.innerHTML = ''; // Clear previous content
  grahaInHouse = {}; // Reset planet storage

  // House order based on the visual layout
  const visualHouses = [3, 4, 5, 6, 2, 1, 7, 12, 11, 10, 9, 8];
  
  // Rashi numbers for each visual house based on the selected Lagna
  let rashiNumbers = {};
  for (let i = 0; i < 12; i++) {
    const houseNumber = (i + 1);
    const rashiNumber = (lagnaRashi + i - 1) % 12 + 1;
    rashiNumbers[houseNumber] = rashiNumber;
  }

  // Create each house element
  visualHouses.forEach(houseNumber => {
    const house = document.createElement("div");
    house.classList.add("house", `house-${houseNumber}`);

    const rashiNumber = document.createElement("div");
    rashiNumber.classList.add("rashi-number");
    rashiNumber.textContent = rashiNumbers[houseNumber];
    house.appendChild(rashiNumber);

    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet-initials");
    house.appendChild(planetDiv);

    // Add a click listener to the house for adding planets
    house.addEventListener("click", () => addPlanetToHouse(houseNumber));
    
    kundaliGrid.appendChild(house);
  });

  // Re-populate chart with existing planets if any
  updateKundaliChart();
}

// Function to update the Kundali chart with planets
function updateKundaliChart() {
    // Clear all planets from the chart
    document.querySelectorAll(".planet-initials").forEach(div => div.textContent = "");

    // Place planets in their respective houses
    for (const houseNumber in grahaInHouse) {
        const planets = grahaInHouse[houseNumber];
        const houseElement = document.querySelector(`.house-${houseNumber} .planet-initials`);
        if (houseElement) {
            houseElement.textContent = planets.map(p => planetInitialMap[p]).join(', ');
        }
    }
}

// Function to handle adding a planet to a house
function addPlanetToHouse(houseNumber) {
    const selectedPlanet = planetSelect.value;
    if (!selectedPlanet) {
        alert("Please select a planet first.");
        return;
    }

    if (!grahaInHouse[houseNumber]) {
        grahaInHouse[houseNumber] = [];
    }

    // Check if the planet is already in the house
    if (grahaInHouse[houseNumber].includes(selectedPlanet)) {
        alert("This planet is already in this house. Please choose another.");
        return;
    }

    grahaInHouse[houseNumber].push(selectedPlanet);
    updateKundaliChart();
}


// Function to reset the entire chart
function resetKundali() {
  lagnaSelect.value = "";
  kundaliChart = {};
  grahaInHouse = {};
  analysisResults.textContent = "Your Kundali analysis will be displayed here.";
  createKundaliChart(1); // Default back to Lagna 1
}

// --- Main Analysis Logic ---
function analyzeKundali() {
  const lagnaRashi = parseInt(lagnaSelect.value);
  if (!lagnaRashi) {
    analysisResults.textContent = "Please select a Lagna Rashi first.";
    return;
  }
  
  let analysisText = "";

  // 1. Analyze Planetary Status (Uchha, Nicha, Swagriha)
  analysisText += "--- Planetary Status Analysis ---\n\n";
  for (const houseNumber in grahaInHouse) {
      const rashi = (lagnaRashi + parseInt(houseNumber) - 1) % 12 + 1;
      const planetsInHouse = grahaInHouse[houseNumber];

      planetsInHouse.forEach(planet => {
          const statusData = jyotishData.grahaStatus[planet];
          if (statusData) {
              if (statusData.uchha === rashi) {
                  analysisText += `${planetInitialMap[planet]} is in its **exalted** sign (${rashi}).\n`;
              } else if (statusData.nicha === rashi) {
                  analysisText += `${planetInitialMap[planet]} is in its **debilitated** sign (${rashi}).\n`;
              } else if (statusData.swagriha && statusData.swagriha.includes(rashi)) {
                  analysisText += `${planetInitialMap[planet]} is in its **own house** (${rashi}).\n`;
              }
          }
      });
  }

  // 2. Analyze Planetary Aspects (Drishti)
  analysisText += "\n--- Planetary Aspects (Drishti) ---\n\n";
  for (const houseNumber1 in grahaInHouse) {
      const planets1 = grahaInHouse[houseNumber1];
      const rashi1 = (lagnaRashi + parseInt(houseNumber1) - 1) % 12 + 1;

      planets1.forEach(planet1 => {
          const aspects = [...jyotishData.grahaDrishti.common, ...(jyotishData.grahaDrishti[planet1] || [])];
          
          for (const houseNumber2 in grahaInHouse) {
              if (houseNumber1 === houseNumber2) continue;
              const planets2 = grahaInHouse[houseNumber2];
              const rashi2 = (lagnaRashi + parseInt(houseNumber2) - 1) % 12 + 1;

              planets2.forEach(planet2 => {
                  const aspectedHouse = aspects.map(aspect => (parseInt(houseNumber1) + aspect - 1) % 12);
                  
                  if (aspectedHouse.includes(parseInt(houseNumber2) - 1)) {
                      analysisText += `${planetInitialMap[planet1]} is aspecting ${planetInitialMap[planet2]} at house ${houseNumber2}. `;
                      
                      const relationship = jyotishData.grahaRelationships[planet1];
                      if (relationship) {
                          if (relationship.mitra.includes(planet2)) {
                              analysisText += `They are **friends** (a positive aspect).\n`;
                          } else if (relationship.shatru.includes(planet2)) {
                              analysisText += `They are **enemies** (a challenging aspect).\n`;
                          } else {
                              analysisText += `They are **neutral** (a mixed aspect).\n`;
                          }
                      }
                  }
              });
          }
      });
  }

  analysisResults.textContent = analysisText.trim() || "No special conditions found in the provided Kundali data.";
}

// --- Event Listeners ---
lagnaSelect.addEventListener("change", (e) => {
  const selectedLagna = parseInt(e.target.value);
  if (selectedLagna) {
    createKundaliChart(selectedLagna);
  }
});
analyzeBtn.addEventListener("click", analyzeKundali);
resetBtn.addEventListener("click", resetKundali);

// Initial creation of the kundali chart with a placeholder Lagna
document.addEventListener("DOMContentLoaded", () => {
  createKundaliChart(1);
});
