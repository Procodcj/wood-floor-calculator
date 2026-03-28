let rooms = [];

function addRoom() {
  const nameInput = document.getElementById("roomName");
  const name = nameInput.value.trim();
  if (!name) {
    nameInput.classList.add("error");
    return;
  }
  nameInput.classList.remove("error");
  nameInput.value = "";

  rooms.push({ id: Date.now(), name: name, sections: [] });
  renderRooms();
  nameInput.focus();
}

function addSection(roomId) {
  const room = rooms.find(r => r.id === roomId);
  if (room) {
    room.sections.push({ id: Date.now(), length: "", width: "" });
    renderRooms();
  }
}

function removeSection(roomId, sectionId) {
  const room = rooms.find(r => r.id === roomId);
  if (room) {
    room.sections = room.sections.filter(s => s.id !== sectionId);
    renderRooms();
  }
}

function removeRoom(roomId) {
  rooms = rooms.filter(r => r.id !== roomId);
  renderRooms();
}

function updateSection(roomId, sectionId, field, value) {
  const room = rooms.find(r => r.id === roomId);
  if (room) {
    const section = room.sections.find(s => s.id === sectionId);
    if (section) {
      section[field] = value;
      renderRooms();
    }
  }
}

function getRoomTotal(room) {
  return room.sections.reduce((sum, s) => {
    const l = parseFloat(s.length);
    const w = parseFloat(s.width);
    return sum + (isNaN(l) || isNaN(w) ? 0 : l * w);
  }, 0);
}

function fmt(n) {
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sanitize(str) {
  if (typeof str !== 'string') str = String(str);
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
}

function renderRooms() {
  const listEl = document.getElementById("roomList");
  const totalEl = document.getElementById("grandTotal");

  if (rooms.length === 0) {
    listEl.innerHTML = "";
    totalEl.innerHTML = "";
    return;
  }

  listEl.innerHTML = rooms.map(room => {
    const roomTotal = getRoomTotal(room);
    const sections = room.sections.map((s, i) => {
      const sqft = (!isNaN(parseFloat(s.length)) && !isNaN(parseFloat(s.width)))
        ? fmt(parseFloat(s.length) * parseFloat(s.width)) + " ft²"
        : "";
      return `
        <div class="section-row">
          <span class="section-label">${String.fromCharCode(65 + i)}</span>
          <input type="number" placeholder="Length" value="${s.length}"
            oninput="updateSection(${room.id}, ${s.id}, 'length', this.value)" min="0">
          <span class="section-x">×</span>
          <input type="number" placeholder="Width" value="${s.width}"
            oninput="updateSection(${room.id}, ${s.id}, 'width', this.value)" min="0">
          <span class="section-result">${sqft}</span>
          <button class="remove-btn" onclick="removeSection(${room.id}, ${s.id})">✕</button>
        </div>
      `;
    }).join("");

    return `
      <div class="room-block">
        <div class="room-block-header">
          <span class="room-block-name">${sanitize(room.name)}</span>
          <span class="room-block-total">${roomTotal > 0 ? fmt(roomTotal) + " ft²" : ""}</span>
          <button class="remove-btn" onclick="removeRoom(${room.id})">✕</button>
        </div>
        <div class="room-block-body">
          ${sections}
          <button class="add-section-btn" onclick="addSection(${room.id})">+ Add Section</button>
        </div>
      </div>
    `;
  }).join("");

  const grandTotal = rooms.reduce((sum, r) => sum + getRoomTotal(r), 0);
  totalEl.innerHTML = grandTotal > 0 ? `
    <div class="grand-total-box">
      <span class="grand-total-label">Grand Total</span>
      <span class="grand-total-value">${fmt(grandTotal)} ft²</span>
    </div>
  ` : "";
}