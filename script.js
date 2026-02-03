// Get all menu toggle buttons (menu items)
const menuToggles = document.querySelectorAll('.menu-toggle');

// Function to toggle submenu display
function toggleSubmenu(event) {
  const submenu = this.nextElementSibling; // Get the corresponding submenu (next <ul>)

  // Toggle submenu visibility
  if (submenu.style.display === 'block') {
    submenu.style.display = 'none'; // Hide submenu
  } else {
    submenu.style.display = 'block'; // Show submenu
  }
}

// Attach event listeners to menu items
menuToggles.forEach(function(toggle) {
  toggle.addEventListener('click', toggleSubmenu);  // Toggle on main menu item click
});
