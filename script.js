// Get the sidebar and the toggle button
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');

// Initially, the sidebar is hidden, so we set left to -250px
// Toggle the sidebar visibility on button click
toggleButton.addEventListener('click', function() {
  // If the sidebar is already shown, hide it
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px'; // Hide sidebar
    document.body.style.marginLeft = '0'; // Reset margin
  } else {
    sidebar.style.left = '0'; // Show sidebar
    document.body.style.marginLeft = '250px'; // Shift content to the right
  }
});
