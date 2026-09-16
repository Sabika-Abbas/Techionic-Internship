document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('#login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value;
    const message = document.querySelector('#login-message');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    message.className = '';
    message.textContent = '';

    if (!emailRegex.test(email)) {
      message.textContent = 'Please enter a valid email address.';
      message.classList.add('error');
      return;
    }

    if (password.length < 8) {
      message.textContent = 'Password must be at least 8 characters long.';
      message.classList.add('error');
      return;
    }

    message.textContent = 'Login successful! Redirecting...';
    message.classList.add('success');

    localStorage.setItem('userEmail', email);

    setTimeout(function () {
      window.location.href = 'index.html';
    }, 1200);
  });
});