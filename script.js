const form = document.getElementById("appointmentForm");
const confirmation = document.getElementById("confirmation");

let appointments = [];
let queueCounter = 0;

form.addEventListener("submit", function (e) {
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
  form.reset();
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