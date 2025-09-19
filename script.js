// A map to store the position of each planet in the kundali
let kundaliChart = {};

// A map to store the full name for each planet initial
const planetFullNames = {
  surya: "Surya (Sun)",
  chandra: "Chandra (Moon)",
  mangal: "Mangal (Mars)",
  budh: "Budh (Mercury)",
  guru: "Guru (Jupiter)",
  shukra: "Shukra (Venus)",
  shani: "Shani (Saturn)",
  rahu: "Rahu",
  ketu: "Ketu",
};

// --- DOM Elements ---
const kundaliGrid = document.getElementById("kundali-grid");
const planetSelect = document.getElementById("planet-select");
const houseSelect = document.getElementById("house-select");
const addPlanetBtn = document.getElementById("add-planet-btn");
const analyzeBtn = document.getElementById("analyze-btn");
const analysisResults = document.getElementById("analysis-results");

// --- Functions ---

// Function to dynamically create the Kundali chart
function createKundaliChart() {
  kundaliGrid.innerHTML = ''; // Clear previous content

  // Order of houses to be rendered in the grid
  const houseOrder = [6, 7, 8, 9, 10, 5, null, null, 11, 4, null, null, 12, 3, 2, 1, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

  for (let i = 1; i <= 12; i++) {
    const house = document.createElement("div");
    house.classList.add("house");
    house.classList.add(`house-${i}`);

    const houseNumber = document.createElement("span");
    houseNumber.classList.add("house-number");
    houseNumber.textContent = i;
    house.appendChild(houseNumber);

    const planetDiv = document.createElement("div");
    planetDiv.classList.add("planet-initials");
    house.appendChild(planetDiv);

    kundaliGrid.appendChild(house);
  }

}

// Function to update the Kundali chart with planets
function updateKundaliChart() {
  // Clear all planets from the chart first
  document.querySelectorAll(".planet-initials").forEach(div => div.textContent = "");

  // Place planets in their respective houses
  for (const planet in kundaliChart) {
    const houseNumber = kundaliChart[planet];
    const houseElement = document.querySelector(`.house-${houseNumber} .planet-initials`);
    
    // Get the first letter of the planet's name
    const initial = planet.charAt(0).toUpperCase(); 
    
    if (houseElement) {
      houseElement.textContent += ` ${initial}`;
    }
  }
}

// Function to handle adding a planet to the kundali
function addPlanet() {
  const planet = planetSelect.value;
  const house = houseSelect.value;

  if (planet && house) {
    kundaliChart[planet] = parseInt(house);
    updateKundaliChart();
    // Clear selection for next entry
    planetSelect.value = "";
    houseSelect.value = "";
  } else {
    alert("Please select both a planet and a house.");
  }
}

// --- Main Analysis Logic ---
function analyzeKundali() {
  if (Object.keys(kundaliChart).length === 0) {
    analysisResults.textContent = "Please add at least one planet to analyze the Kundali.";
    return;
  }

  let analysisText = "";

  // 1. Analyze Planetary Status (Uchha, Nicha, Swagriha)
  analysisText += "--- Planetary Status Analysis ---\n\n";
  for (const planet in kundaliChart) {
    const rashi = kundaliChart[planet];
    const statusData = jyotishData.grahaStatus[planet];

    if (statusData) {
      if (statusData.uchha === rashi) {
        analysisText += `${planetFullNames[planet]} is in its **exalted** sign (${rashi}). This is a very strong position.\n`;
      } else if (statusData.nicha === rashi) {
        analysisText += `${planetFullNames[planet]} is in its **debilitated** sign (${rashi}). This is a weak position.\n`;
      } else if (statusData.swagriha && statusData.swagriha.includes(rashi)) {
        analysisText += `${planetFullNames[planet]} is in its **own house** (${rashi}). This is a strong position.\n`;
      }
    }
  }
  
  // 2. Analyze Planetary Aspects (Drishti)
  analysisText += "\n--- Planetary Aspects (Drishti) ---\n\n";
  for (const planet1 in kundaliChart) {
    const house1 = kundaliChart[planet1];

    // Get the aspects for the current planet
    const aspects = jyotishData.grahaDrishti[planet1] ? 
                    [...jyotishData.grahaDrishti.common, ...jyotishData.grahaDrishti[planet1]] :
                    [...jyotishData.grahaDrishti.common];
    
    for (const planet2 in kundaliChart) {
        if (planet1 === planet2) continue; // Skip self
        const house2 = kundaliChart[planet2];

        // Check if planet1 is aspecting planet2
        const aspectedHouse = aspects.map(aspect => (house1 + aspect - 1) % 12 + 1);
        if (aspectedHouse.includes(house2)) {
            analysisText += `${planetFullNames[planet1]} is aspecting ${planetFullNames[planet2]} at house ${house2}. `;

            // Check if the aspect is friendly, enemy, or neutral
            const relationship = jyotishData.grahaRelationships[planet1];
            if (relationship) {
              if (relationship.mitra.includes(planet2)) {
                analysisText += `They are **friends** (a positive aspect).\n`;
              } else if (relationship.shatru.includes(planet2)) {
                analysisText += `They are **enemies** (a challenging aspect).\n`;
              } else {
                analysisText += `They are **neutral** (a mixed aspect).\n`;
              }
            } else {
                analysisText += `Relationship data not found.\n`;
            }
        }
    }
  }

  // Display the final analysis
  analysisResults.textContent = analysisText.trim() || "No special conditions found in the provided Kundali data.";
}

// --- Event Listeners ---
addPlanetBtn.addEventListener("click", addPlanet);
analyzeBtn.addEventListener("click", analyzeKundali);

// Initial creation of the kundali chart when the page loads
document.addEventListener("DOMContentLoaded", createKundaliChart);
