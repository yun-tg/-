document.addEventListener("DOMContentLoaded", function() {
  // 处理子菜单展开/收起
  const submenu = document.querySelectorAll('.submenu > a');
  submenu.forEach(item => {
    item.addEventListener('click', function() {
      const submenuItems = this.nextElementSibling;
      submenuItems.style.display = submenuItems.style.display === 'block' ? 'none' : 'block';
    });
  });

  // 平滑滚动到对应教程
  const links = document.querySelectorAll('.sidebar a');
  links.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();  // 阻止默认跳转
      const targetId = this.getAttribute('href').substring(1); // 获取目标 ID
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });  // 平滑滚动到目标元素
      }
    });
  });
});
