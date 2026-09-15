document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.querySelector('.toggle-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      document.body.classList.toggle('dark-mode');
      toggleBtn.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
    });
  }

  const orderForm = document.querySelector('#order-form');
  if (orderForm) {
    orderForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const name = document.querySelector('#name')?.value || 'Guest';
      const order = document.querySelector('#order-details')?.value || 'nothing';
      const confirmation = document.createElement('div');
      confirmation.classList.add('confirmation-message');
      confirmation.textContent = `Thanks, ${name}! Your order for "${order}" has been received.`;
      orderForm.insertAdjacentElement('afterend', confirmation);
      orderForm.reset();
      setTimeout(() => {
        confirmation.remove();
      }, 8000);
    });
  }

  async function loadPosts() {
    const container = document.querySelector('#posts-container');
    if (!container) return;
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
      const posts = await response.json();
      container.innerHTML = '<h3>Latest Posts</h3>';
      const list = document.createElement('ul');
      posts.forEach(post => {
        const item = document.createElement('li');
        item.innerHTML = `<strong>${post.title}</strong><br><small>${post.body}</small>`;
        list.appendChild(item);
      });
      container.appendChild(list);
    } catch (error) {
      container.innerHTML = '<p style="color:red;">Failed to load posts. Please try again later.</p>';
      console.error('Fetch error:', error);
    }
  }

  loadPosts();

  const loginForm = document.querySelector('#login-form');
  if (loginForm) {
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

      message.textContent = 'Login successful!';
      message.classList.add('success');
      loginForm.reset();
    });
  }
});