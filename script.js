// Get all submenu toggle buttons
const submenuToggles = document.querySelectorAll('.submenu-toggle');

// Loop through each submenu toggle and add a click event
submenuToggles.forEach(function(toggle) {
  toggle.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent the default link behavior
    const submenu = this.parentElement.querySelector('.submenu'); // Get the corresponding submenu

    // Toggle the submenu display
    if (submenu.style.display === 'block') {
      submenu.style.display = 'none';
      this.textContent = '▼'; // Change arrow direction
    } else {
      submenu.style.display = 'block';
      this.textContent = '▲'; // Change arrow direction
    }
  });
});
