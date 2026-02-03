document.addEventListener("DOMContentLoaded", function() {
  // 处理子菜单展开/收起
  const submenu = document.querySelectorAll('.submenu > a');
  submenu.forEach(item => {
    item.addEventListener('click', function(event) {
      const submenuItems = this.nextElementSibling;
