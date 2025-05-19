document.addEventListener('DOMContentLoaded', function() {
  // Debugging check
  console.log('Login script initialized');
  
  // DOM Elements
  const passInput = document.getElementById('pass');
  const loginBtn = document.getElementById('login-btn');
  const messageEl = document.querySelector('.msg');
  const btnContainer = document.querySelector('.btn-container');
  const loginForm = document.querySelector('form');
  
  // Animation positions
  const positions = ['shift-left', 'shift-top', 'shift-right', 'shift-bottom'];
  let currentPositionIndex = 0;
  
  // Initial state
  if (loginBtn) loginBtn.disabled = true;
  
  // Show appropriate message based on input
  function updateMessage() {
    if (!passInput || !messageEl) return;
    
    const isEmpty = passInput.value.trim() === '';
    
    if (isEmpty) {
      messageEl.textContent = 'Please enter your password';
      messageEl.style.color = '#fa2929';
      if (loginBtn) loginBtn.disabled = true;
    } else {
      messageEl.textContent = 'Ready to login';
      messageEl.style.color = '#92ff92';
      if (loginBtn) loginBtn.disabled = false;
    }
  }
  
  // Shift button position
  function shiftButton() {
    if (!loginBtn) return;
    
    updateMessage();
    
    // Remove all position classes
    positions.forEach(pos => loginBtn.classList.remove(pos));
    
    // Add new position class
    currentPositionIndex = (currentPositionIndex + 1) % positions.length;
    loginBtn.classList.add(positions[currentPositionIndex]);
    
    // Return to normal position if input is valid
    if (passInput.value.trim() !== '') {
      setTimeout(() => {
        loginBtn.classList.remove(...positions);
        loginBtn.classList.add('no-shift');
      }, 300);
    }
  }
  
  // Event Listeners
  if (passInput) {
    passInput.addEventListener('input', updateMessage);
    passInput.addEventListener('focus', updateMessage);
  }
  
  if (btnContainer && loginBtn) {
    btnContainer.addEventListener('mouseover', shiftButton);
    loginBtn.addEventListener('mouseover', shiftButton);
  }
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      if (!passInput || passInput.value.trim() === '') {
        e.preventDefault();
        if (messageEl) {
          messageEl.textContent = 'Password is required!';
          messageEl.style.color = '#fa2929';
        }
        shiftButton();
      }
    });
  }
  
  // Touch support for mobile devices
  if (loginBtn) {
    loginBtn.addEventListener('touchstart', function() {
      if (passInput.value.trim() === '') {
        shiftButton();
      }
    });
  }
  
  // Initial check
  updateMessage();
});
