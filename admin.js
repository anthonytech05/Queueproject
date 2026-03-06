//admin dashboard
let appointments = [];
let currentFilter = 'all';

function loadData() {
  appointments = JSON.parse(localStorage.getItem("appointments")) || [];
}

function saveData() {
  localStorage.setItem("appointments", JSON.stringify(appointments));
}

function setFilter(filter, btn) {
  currentFilter = filter;
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderTable();
}

function renderTable() {
  const tbody = document.getElementById("adminTable");
  const search = document.getElementById("searchInput").value.toLowerCase();

  const filtered = appointments.filter(appt => {
    const matchFilter = currentFilter === 'all' || appt.status === currentFilter;
    const matchSearch = !search ||
      appt.name.toLowerCase().includes(search) ||
      appt.queueNumber.toLowerCase().includes(search) ||
      (appt.branch || '').toLowerCase().includes(search);
    return matchFilter && matchSearch;
  });

  document.getElementById("statTotal").textContent = appointments.length;
  document.getElementById("statPending").textContent = appointments.filter(a => a.status === "Pending").length;
  document.getElementById("statServed").textContent = appointments.filter(a => a.status === "Served").length;

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7"><div class="empty-state">No bookings yet. Appointments will appear here once customers book.</div></td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(appt => {
    const realIndex = appointments.indexOf(appt);
    const isServed = appt.status === "Served";
    return `
      <tr>
        <td><span class="queue-num">${appt.queueNumber}</span></td>
        <td>${appt.name}</td>
        <td>${appt.branch || '—'}</td>
        <td>${appt.date || '—'}</td>
        <td>${appt.time || '—'}</td>
        <td>
          <span class="status-badge ${appt.status.toLowerCase()}">${appt.status}</span>
        </td>
        <td>
          <button class="btn-serve" onclick="markServed(${realIndex})" ${isServed ? 'disabled' : ''}>
            ${isServed ? '✓ Done' : 'Serve'}
          </button>
        </td>
      </tr>
    `;
  }).join('');
}

function markServed(index) {
  appointments[index].status = "Served";
  saveData();
  renderTable();
}

function clearAll() {
  if (confirm("Clear all appointments? This cannot be undone.")) {
    appointments = [];
    localStorage.removeItem("appointments");
    localStorage.removeItem("queueCounter");
    renderTable();
  }
}

function refresh() {
  loadData();
  renderTable();
}

refresh();
setInterval(refresh, 5000);