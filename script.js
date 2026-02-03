// Get all menu toggle buttons
const menuToggles = document.querySelectorAll('.menu-toggle');

// Loop through each menu toggle and add a click event
menuToggles.forEach(function(toggle) {
  toggle.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    const submenu = this.nextElementSibling; // Get the corresponding submenu

    // Toggle the submenu display
    if (submenu.style.display === 'block') {
      submenu.style.display = 'none';
    } else {
      submenu.style.display = 'block';
    }
  });
});
