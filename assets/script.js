document.addEventListener("DOMContentLoaded", function() {
  // 处理子菜单展开/收起
  const toggles = document.querySelectorAll('.submenu-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
      const parent = this.parentElement;
      parent.classList.toggle('active'); // 添加/移除 active 类
    });
  });

  // 点击菜单跳转并平滑滚动到内容
  const links = document.querySelectorAll('.menu-link');
  links.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1); // 获取目标 id
      const target = document.getElementById(targetId);

      // 检查目标元素是否存在
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth', // 平滑滚动
          block: 'start', // 确保目标元素滚动到视口顶部
        });
      }
    });
  });
});
