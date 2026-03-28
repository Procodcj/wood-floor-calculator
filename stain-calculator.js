let stainType = null;
let colors = [];

function selectType(type) {
  stainType = type;

  document.getElementById("btnOil").classList.toggle("active", type === "oil");
  document.getElementById("btnWater").classList.toggle("active", type === "water");

  const hint = document.getElementById("coverageHint");
  if (type === "oil") {
    hint.textContent = "1 quart covers approximately 165 sq ft";
  } else {
    hint.textContent = "1 gallon covers approximately 700 sq ft";
  }

  document.getElementById("areaGroup").style.display = "block";
  document.getElementById("colorGroup").style.display = "block";
  document.getElementById("divider").style.display = "block";
  document.getElementById("calcBtn").style.display = "block";
  document.getElementById("resetBtn").style.display = "block";

  if (colors.length === 0) addColor();
}

function addColor() {
  colors.push({ id: Date.now(), parts: "", name: "", brand: "" });
  renderColors();
}

function removeColor(id) {
  colors = colors.filter(c => c.id !== id);
  renderColors();
}

function updateColor(id, field, value) {
  const color = colors.find(c => c.id === id);
  if (color) color[field] = value;
}

function sanitize(str) {
  if (typeof str !== 'string') str = String(str);
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

function renderColors() {
  const listEl = document.getElementById("colorList");
  listEl.innerHTML = colors.map((c, i) => `
    <div class="color-row">
      <input class="parts-input" type="number" placeholder="Parts" value="${c.parts}"
        oninput="updateColor(${c.id}, 'parts', this.value)" min="1">
      <input type="text" placeholder="Color name or number" value="${sanitize(c.name)}"
        oninput="updateColor(${c.id}, 'name', this.value)">
      <input type="text" placeholder="Brand" value="${sanitize(c.brand)}"
        oninput="updateColor(${c.id}, 'brand', this.value)">
      <button class="remove-btn" onclick="removeColor(${c.id})">✕</button>
    </div>
  `).join("");
}

function fmt(n) {
  return n.toFixed(2);
}

function calculate() {
  const resultEl = document.getElementById("result");
  resultEl.innerHTML = "";

  const area = parseFloat(document.getElementById("area").value);

  if (!stainType) {
    resultEl.innerHTML = `<div class="error-msg">Please select a stain type.</div>`;
    return;
  }
  if (isNaN(area) || area <= 0) {
    document.getElementById("area").classList.add("error");
    resultEl.innerHTML = `<div class="error-msg">Please enter a valid area.</div>`;
    return;
  }
  document.getElementById("area").classList.remove("error");

  const validColors = colors.filter(c => c.parts && c.name && parseFloat(c.parts) > 0);
  if (validColors.length === 0) {
    resultEl.innerHTML = `<div class="error-msg">Please add at least one color with parts and name.</div>`;
    return;
  }

  let totalOz, unitLabel, unitSize;

  if (stainType === "oil") {
    const totalQuarts = area / 165;
    totalOz = totalQuarts * 32;
    unitLabel = "quart";
    unitSize = 32;
  } else {
    const totalGallons = area / 700;
    totalOz = totalGallons * 128;
    unitLabel = "gallon";
    unitSize = 128;
  }

  const totalParts = validColors.reduce((sum, c) => sum + parseFloat(c.parts), 0);
  const ozPerPart = totalOz / totalParts;

  const colorResults = validColors.map(c => {
    const parts = parseFloat(c.parts);
    const ozNeeded = parts * ozPerPart;
    const unitsToBuy = Math.ceil(ozNeeded / unitSize);
    return { ...c, ozNeeded, unitsToBuy, unitLabel };
  });

  const mixRows = colorResults.map(c => `
    <div class="result-row">
      <span class="result-label">${sanitize(c.parts)} parts · ${sanitize(c.name)} · ${sanitize(c.brand)}</span>
      <span class="result-value">${fmt(c.ozNeeded)} oz</span>
    </div>
  `).join("");

  const purchaseRows = colorResults.map(c => `
    <div class="purchase-row">
      <span class="purchase-label">${sanitize(c.name)} · ${sanitize(c.brand)}</span>
      <span class="purchase-value">${c.unitsToBuy} ${c.unitLabel}${c.unitsToBuy > 1 ? "s" : ""}</span>
    </div>
  `).join("");

  resultEl.innerHTML = `
    <div class="result-box">
      <div class="result-section-title">Project Summary</div>
      <div class="result-row">
        <span class="result-label">Total Area</span>
        <span class="result-value">${fmt(area)} sq ft</span>
      </div>
      <div class="result-row">
        <span class="result-label">Total Mix Volume</span>
        <span class="result-value big">${fmt(totalOz)} oz</span>
      </div>

      <div class="result-section-title">Mix Breakdown</div>
      ${mixRows}

      <div class="result-section-title">Purchase Guide</div>
      ${purchaseRows}
    </div>
  `;
}

function resetAll() {
  stainType = null;
  colors = [];

  document.getElementById("btnOil").classList.remove("active");
  document.getElementById("btnWater").classList.remove("active");
  document.getElementById("coverageHint").textContent = "";
  document.getElementById("area").value = "";
  document.getElementById("area").classList.remove("error");
  document.getElementById("colorList").innerHTML = "";
  document.getElementById("result").innerHTML = "";

  document.getElementById("areaGroup").style.display = "none";
  document.getElementById("colorGroup").style.display = "none";
  document.getElementById("divider").style.display = "none";
  document.getElementById("calcBtn").style.display = "none";
  document.getElementById("resetBtn").style.display = "none";
}