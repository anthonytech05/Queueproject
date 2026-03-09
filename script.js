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

// Load existing data from localStorage
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let queueCounter = parseInt(localStorage.getItem("queueCounter")) || 0;

form1.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullname").value;
  const branch = document.getElementById("branch").value;
  const issue = document.getElementById("issue").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  queueCounter++;
  const queueNumber = 'BK-' + queueCounter;

  const newAppointment = {
    name,
    branch,
    issue,
    date,
    time,
    queueNumber,
    status: "Pending"
  };

  appointments.push(newAppointment);

  // Save BOTH appointments and counter to localStorage
  localStorage.setItem("appointments", JSON.stringify(appointments));
  localStorage.setItem("queueCounter", String(queueCounter));

  confirmation.innerHTML = `
    <h3>Appointment Confirmed</h3>
    <p>Queue No: ${queueNumber}</p>
  `;

  form1.reset();
});


let mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}



//Hidden form button for open an acccount!
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

  // Get values
  const email    = document.getElementById('acc-email').value.trim();
  const password = document.getElementById('acc-password').value;

  // Check if email already exists
  const users = JSON.parse(localStorage.getItem('users')) || [];
  const exists = users.find(u => u.email === email);
  if (exists) {
    const emailEl  = document.getElementById('acc-email');
    const emailErr = document.getElementById('acc-emailErr');
    emailEl.classList.add('error');
    emailErr.textContent = 'An account with this email already exists.';
    emailErr.classList.add('show');
    return;
  }

  // Save new user to localStorage
  users.push({
    firstName:   document.getElementById('acc-firstName').value.trim(),
    lastName:    document.getElementById('acc-lastName').value.trim(),
    email,
    password,
    phone:       document.getElementById('acc-phone').value.trim(),
    dob:         document.getElementById('acc-dob').value,
    accountType: document.getElementById('acc-accountType').value,
    address:     document.getElementById('acc-address').value.trim(),
  });
  localStorage.setItem('users', JSON.stringify(users));

  // Reset all fields
  fields.forEach(({ id, errId }) => {
    document.getElementById(id).value = '';
    document.getElementById(id).classList.remove('error');
    document.getElementById(errId).classList.remove('show');
  });

  // Close modal and show toast then redirect
  closeModal();
  const toast = document.getElementById('toast');
  toast.classList.add('show');

  // Redirect to sign in after toast shows
  setTimeout(() => {
    toast.classList.remove('show');
    window.location.href = 'signin.html';
  }, 2000);
}