// script.js

function generateKundali() {
  let lagna = document.getElementById("lagna").value;
  let grahaInput = document.getElementById("grahaInput").value;

  const grahaNepali = {
    surya: "सूर्य", chandra: "चन्द्रमा", mangal: "मङ्गल",
    budh: "बुध", guru: "गुरु", shukra: "शुक्र",
    shani: "शनि", rahu: "राहु", ketu: "केतु"
  };
  const rashiNepali = ["","मेष","वृष","मिथुन","कर्कट","सिंह","कन्या","तुला","वृश्चिक","धनु","मकर","कुम्भ","मीन"];

  document.getElementById("intro").innerHTML = `<h3>परिचय</h3><p>लग्न राशि: <b>${rashiNepali[lagna]}</b></p>`;

  let entries = grahaInput.split(",");
  let explanations = "";

  entries.forEach(e => {
    let [gNameNep, house] = e.split(":").map(s => s.trim());
    if(!gNameNep || !house) return;

    let key = Object.keys(grahaNepali).find(k => grahaNepali[k] === gNameNep);
    if(!key) return;

    house = parseInt(house);

    // स्थिति
    let statusObj = jyotishData.grahaStatus[key];
    let state = "सामान्य स्थिति";
    if(Array.isArray(statusObj.uchha) ? statusObj.uchha.includes(house) : statusObj.uchha === house) state = "उच्च (बलवान)";
    else if(Array.isArray(statusObj.nicha) ? statusObj.nicha.includes(house) : statusObj.nicha === house) state = "नीच (दुर्बल)";
    else if(statusObj.swagriha.includes(house)) state = "स्वगृही (आफ्नो घरमा)";

    // मित्र/शत्रु
    let friends = jyotishData.grahaRelationships[key].mitra.map(g => grahaNepali[g]).join(", ");
    let enemies = jyotishData.grahaRelationships[key].shatru.map(g => grahaNepali[g]).join(", ");

    // दृष्टि
    let drishtiHouses = jyotishData.grahaDrishti[key] || jyotishData.grahaDrishti.common;
    let drishtiRashi = drishtiHouses.map(h => rashiNepali[((house + h -1)%12)+1]).join(", ");

    explanations += `<p><b>${gNameNep}</b> (${rashiNepali[house]}) → स्थिति: <b>${state}</b>, मित्र ग्रह: ${friends}, शत्रु ग्रह: ${enemies}, दृष्टि हुने भाव: ${drishtiRashi}</p>`;
  });

  document.getElementById("graha").innerHTML = `<h3>ग्रह विश्लेषण</h3>${explanations}`;
  document.getElementById("lagnaExp").innerHTML = `<h3>लग्नको व्याख्या</h3><p>${rashiNepali[lagna]} लग्न भएको व्यक्तिको स्वभाव र जीवनदिशा त्यहीअनुसार रहनेछ।</p>`;
  document.getElementById("houses").innerHTML = `<h3>भावगत व्याख्या</h3><p>प्रत्येक भावमा ग्रहको प्रभाव माथि दिइएको छ।</p>`;
  document.getElementById("yogas").innerHTML = `<h3>योग र दृष्टि</h3><p>विशेष योग तथा दृष्टिहरू ग्रह अनुसार बनाइएका छन्।</p>`;
  document.getElementById("remedies").innerHTML = `<h3>उपाय</h3><p>ग्रह अनुसार मन्त्र, पूजा वा जीवनशैली सल्लाह दिइनेछ।</p>`;
}