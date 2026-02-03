// Get all menu toggle buttons and main menu links
const menuToggles = document.querySelectorAll('.menu-toggle');
const submenuToggles = document.querySelectorAll('.submenu-toggle');

// Function to toggle submenu display
function toggleSubmenu(event) {
  const submenu = this.parentElement.querySelector('.submenu'); // Get the corresponding submenu

  // Toggle submenu visibility
  if (submenu.style.display === 'block') {
    submenu.style.display = 'none'; // Hide submenu
    this.textContent = '▼'; // Change arrow direction
  } else {
    submenu.style.display = 'block'; // Show submenu
    this.textContent = '▲'; // Change arrow direction
  }
}

// Attach event listeners to menu items and submenu toggle buttons
menuToggles.forEach(function(toggle) {
  toggle.addEventListener('click', toggleSubmenu);
});

submenuToggles.forEach(function(toggle) {
  toggle.addEventListener('click', toggleSubmenu);
});
