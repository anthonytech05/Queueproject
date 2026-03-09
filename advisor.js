const advisorForm = document.getElementById("advisorForm");
const confirmation = document.getElementById("confirmation");

advisorForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("fullname").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  // Save to localStorage in case you need it later
  const inquiries = JSON.parse(localStorage.getItem("advisorInquiries")) || [];

  inquiries.push({
    name,
    email,
    phone,
    message,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("advisorInquiries", JSON.stringify(inquiries));

  // Hide form, show confirmation
  advisorForm.style.display = "none";
  confirmation.style.display = "block";
});