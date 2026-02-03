// 获取所有带有子菜单的主菜单项
const menuToggles = document.querySelectorAll('.menu-toggle');

// 遍历每个主菜单，添加点击事件
menuToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
        // 找到当前点击的主菜单项中的子菜单
        const submenu = this.nextElementSibling; // 获取子菜单
        const arrow = this.querySelector('.arrow'); // 获取箭头符号

        // 切换子菜单的显示和隐藏
        submenu.classList.toggle('visible'); // 显示或隐藏子菜单

        // 旋转箭头符号
        if (submenu.classList.contains('visible')) {
            arrow.style.transform = 'rotate(90deg)'; // 如果子菜单可见，旋转箭头
        } else {
            arrow.style.transform = 'rotate(0deg)'; // 如果子菜单不可见，恢复箭头
        }
    });
});
