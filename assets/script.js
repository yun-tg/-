document.addEventListener("DOMContentLoaded", function() {
  // 处理子菜单展开/收起
  const submenu = document.querySelectorAll('.submenu > a');
  submenu.forEach(item => {
    item.addEventListener('click', function(event) {
      const submenuItems = this.nextElementSibling;
      const parentMenu = this.parentElement;

      // 如果当前菜单项有子菜单，切换其显示状态
      if (submenuItems.style.display === 'block') {
        submenuItems.style.display = 'none';
        parentMenu.classList.remove('active');
      } else {
        submenuItems.style.display = 'block';
        parentMenu.classList.add('active');
      }

      // 阻止事件冒泡，避免点击子菜单链接时触发父菜单
      event.stopPropagation();
    });
  });

  // 点击文档其他部分时收起所有子菜单
  document.addEventListener
