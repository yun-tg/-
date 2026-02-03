// 获取所有带有子菜单的主菜单项
const menuToggles = document.querySelectorAll('.menu-toggle');

// 遍历每个主菜单，添加点击事件
menuToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
        // 找到当前点击的主菜单项中的子菜单
        const submenu = this.nextElementSibling;
        const arrow = this.querySelector('.arrow');

        // 切换子菜单的显示和隐藏
        submenu.classList.toggle('visible');

        // 旋转箭头符号
        if (submenu.classList.contains('visible')) {
            arrow.style.transform = 'rotate(90deg)';
        } else {
            arrow.style.transform = 'rotate(0deg)';
        }
    });
});
