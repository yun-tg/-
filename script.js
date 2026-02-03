// Get the sidebar and the toggle button
const sidebar = document.getElementById('sidebar');
const toggleButton = document.getElementById('sidebar-toggle');

// Toggle the sidebar visibility
toggleButton.addEventListener('click', function() {
  if (sidebar.style.left === '0px') {
    sidebar.style.left = '-250px'; // Hide sidebar
    document.body.style.marginLeft = '0';
  } else {
    sidebar.style.left = '0'; // Show sidebar
    document.body.style.marginLeft = '250px';
  }
});
