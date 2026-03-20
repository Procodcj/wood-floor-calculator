let history = [];

function reset() {
  clearErrors();
  ["length", "width", "numberOfBoards", "bundlesPerPallet"].forEach(id => {
    document.getElementById(id).value = "";
  });
  document.getElementById("lengthUnit").value = "feet";
  document.getElementById("widthUnit").value = "inches";
  const resultEl = document.getElementById("result");
  resultEl.style.display = "none";
  resultEl.innerHTML = "";
  document.getElementById("length").focus();
}

function parseFraction(value) {
  if (!value || !value.trim()) return NaN;
  const parts = value.trim().split(/\s+/);
  let whole = 0, fraction = 0;

  if (parts.length === 2) {
    whole = parseFloat(parts[0]);
    const fp = parts[1].split("/");
    if (fp.length === 2) {
      fraction = parseFloat(fp[0]) / parseFloat(fp[1]);
    } else {
      return NaN;
    }
  } else if (parts.length === 1) {
    const fp = parts[0].split("/");
    if (fp.length === 2) {
      fraction = parseFloat(fp[0]) / parseFloat(fp[1]);
    } else {
      whole = parseFloat(parts[0]);
    }
  } else {
    return NaN;
  }

  const result = whole + fraction;
  return isNaN(result) ? NaN : result;
}

function fmt(n) {
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function setError(id, msg) {
  document.getElementById(id).classList.add("error");
  return msg;
}

function clearErrors() {
  ["length", "width", "numberOfBoards", "bundlesPerPallet"].forEach(id => {
    document.getElementById(id).classList.remove("error");
  });
}

function calculate() {
  clearErrors();
  const resultEl = document.getElementById("result");
  resultEl.style.display = "none";
  resultEl.innerHTML = "";

  const errors = [];

  const lengthRaw  = parseFraction(document.getElementById("length").value);
  const widthRaw   = parseFraction(document.getElementById("width").value);
  const numBoards  = parseFloat(document.getElementById("numberOfBoards").value);
  const numBundles = parseFloat(document.getElementById("bundlesPerPallet").value);

  if (isNaN(lengthRaw) || lengthRaw <= 0)  errors.push(setError("length",         "Bundle length is required and must be > 0."));
  if (isNaN(widthRaw)  || widthRaw  <= 0)  errors.push(setError("width",          "Board width is required and must be > 0."));
  if (isNaN(numBoards) || numBoards  <= 0) errors.push(setError("numberOfBoards", "Number of boards must be > 0."));
  if (isNaN(numBundles)|| numBundles <= 0) errors.push(setError("bundlesPerPallet","Bundles per pallet must be > 0."));

  if (errors.length) {
    resultEl.style.display = "block";
    resultEl.innerHTML = `<div class="error-msg">${errors.join("<br>")}</div>`;
    return;
  }

  const lengthUnit = document.getElementById("lengthUnit").value;
  const widthUnit  = document.getElementById("widthUnit").value;

  const lengthFt = lengthUnit === "inches" ? lengthRaw / 12 : lengthRaw;
  const widthFt  = widthUnit  === "inches" ? widthRaw  / 12 : widthRaw;

  const sqftPerBoard  = lengthFt * widthFt;
  const sqftPerBundle = sqftPerBoard * numBoards;
  const sqftPerPallet = sqftPerBundle * numBundles;

  history.push({ label: `Pallet ${history.length + 1}`, value: sqftPerPallet });
  renderHistory();
  
  resultEl.style.display = "block";
  resultEl.innerHTML = `
    <div class="result-box">
      <div class="result-row">
        <span class="result-label">Total — Pallet</span>
        <span class="result-value big">${fmt(sqftPerPallet)} ft²</span>
      </div>
      <div class="result-row">
        <span class="result-label">Per Bundle</span>
        <span class="result-value">${fmt(sqftPerBundle)} ft²</span>
      </div>
      <div class="result-row">
        <span class="result-label">Per Board</span>
        <span class="result-value">${fmt(sqftPerBoard)} ft²</span>
      </div>
    </div>
  `;
}


function renderHistory() {
  const historyEl = document.getElementById("history");
  if (history.length === 0) {
    historyEl.innerHTML = "";
    return;
  }
  const total = history.reduce((sum, item) => sum + item.value, 0);
  const items = history.map((item, i) => `
    <div class="history-item">
      <span class="history-item-label">${item.label}</span>
      <span>${fmt(item.value)} ft²</span>
    </div>
  `).join("");

  historyEl.innerHTML = `
    <div class="history-box">
      <div class="history-title">History</div>
      ${items}
      <div class="history-total">
        <span class="history-total-label">Grand Total</span>
        <span class="history-total-value">${fmt(total)} ft²</span>
      </div>
    </div>
  `;
}

function clearHistory() {
  history = [];
  renderHistory();
}