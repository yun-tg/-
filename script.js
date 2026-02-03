// Get all main menu items (menu toggles)
const menuToggles = document.querySelectorAll('.menu-toggle');

// Function to toggle submenu visibility
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
  toggle.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default link behavior
    toggleSubmenu.call(this, event);
  });  // Toggle on main menu item click
});
