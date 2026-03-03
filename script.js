//hamburger 
function toggleMenu() {
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

}

//Appointment form
const form1 = document.getElementById("appointmentForm");
const confirmation = document.getElementById("confirmation");

let appointments = [];
let queueCounter = 0;

form1.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullname").value;
  const branch = document.getElementById("branch").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  // const queueNumber = "BK-" + Math.floor(Math.random() * 90000 + 10000);
  queueCounter++;
  const queueNumber = 'BK-' + queueCounter;

  const newAppointment = {
    name,
    branch,
    date,
    time,
    queueNumber,
    status: "Pending"
  };

  appointments.push(newAppointment);

  confirmation.innerHTML = `
    <h3>Appointment Confirmed</h3>
    Queue No: ${queueNumber}
  `;

  displayAppointments();
  form1.reset();
});

function displayAppointments() {
  const adminTable = document.getElementById("adminTable");

  adminTable.innerHTML = "";

  appointments.forEach((appt, index) => {
    adminTable.innerHTML += `
      <tr>
        <td>${appt.name}</td>
        <td>${appt.branch}</td>
        <td>${appt.date}</td>
        <td>${appt.time}</td>
        <td>${appt.queueNumber}</td>
        <td>${appt.status}</td>
        <td>
          <button onclick="markServed(${index})">Serve</button>
        </td>
      </tr>
    `;
  });
}

function markServed(index) {
  appointments[index].status = "Served";
  displayAppointments();
}


//Hidden form button
// Field definitions with validation rules
const fields = [
  { id: 'acc-firstName',   errId: 'acc-firstNameErr',   check: v => v.trim() !== '' },
  { id: 'acc-lastName',    errId: 'acc-lastNameErr',    check: v => v.trim() !== '' },
  { id: 'acc-email',       errId: 'acc-emailErr',       check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
  { id: 'acc-phone',       errId: 'acc-phoneErr',       check: v => v.trim() !== '' },
  { id: 'acc-dob',         errId: 'acc-dobErr',         check: v => v !== '' },
  { id: 'acc-accountType', errId: 'acc-accountTypeErr', check: v => v !== '' },
  { id: 'acc-address',     errId: 'acc-addressErr',     check: v => v.trim() !== '' },
  { id: 'acc-password',    errId: 'acc-passwordErr',    check: v => v.length >= 8 },
];

// Clear error as user types
fields.forEach(({ id, errId }) => {
  const el = document.getElementById(id);
  ['input', 'change'].forEach(ev =>
    el.addEventListener(ev, () => {
      el.classList.remove('error');
      document.getElementById(errId).classList.remove('show');
    })
  );
});

// Open modal
function openModal() {
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
  document.getElementById('overlay').classList.remove('active');
  document.body.style.overflow = '';
}

// Close when clicking outside the modal
function handleOverlayClick(e) {
  if (e.target === document.getElementById('overlay')) closeModal();
}

// Submit & validate
function submitForm() {
  let valid = true;

  fields.forEach(({ id, errId, check }) => {
    const el  = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!check(el.value)) {
      el.classList.add('error');
      err.classList.add('show');
      valid = false;
    } else {
      el.classList.remove('error');
      err.classList.remove('show');
    }
  });

  if (!valid) return;

  // Reset all fields
  fields.forEach(({ id, errId }) => {
    document.getElementById(id).value = '';
    document.getElementById(id).classList.remove('error');
    document.getElementById(errId).classList.remove('show');
  });

  // Close modal and show success toast
  closeModal();
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 4000);
}