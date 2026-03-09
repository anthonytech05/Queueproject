const signinForm = document.getElementById('signinForm');
const errorMsg = document.getElementById('errorMsg');

signinForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const remember = document.getElementById('rememberMe').checked;

  // Get registered users from localStorage
  const users = JSON.parse(localStorage.getItem('users')) || [];

  // Find matching user
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    errorMsg.style.display = 'block';
    errorMsg.textContent = 'Incorrect email or password. Please try again.';
    return;
  }

  // Save session
  const session = { 
    name: user.firstName + ' ' + user.lastName, 
    email: user.email,
    accountType: user.accountType
  };

  if (remember) {
    localStorage.setItem('currentUser', JSON.stringify(session));
  } else {
    sessionStorage.setItem('currentUser', JSON.stringify(session));
  }

  errorMsg.style.display = 'none';

  // Redirect to home dashboard
  window.location.href = 'index.html';
});

function togglePassword() {
  const pw = document.getElementById('password');
  const btn = document.querySelector('.toggle-pw');
  if (pw.type === 'password') {
    pw.type = 'text';
    btn.textContent = 'Hide';
  } else {
    pw.type = 'password';
    btn.textContent = 'Show';
  }
}