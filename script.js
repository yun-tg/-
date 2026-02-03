// 获取所有带有子菜单的主菜单项
const menuToggles = document.querySelectorAll('.menu-toggle');

// 遍历每个主菜单，添加点击事件
menuToggles.forEach(toggle => {
    toggle.addEventListener('click', function () {
        // 找到当前点击的主菜单项中的子菜单
        const submenu = this.nextElementSibling;
        const arrow = this.querySelector('.arrow');

        // 切换子菜单的显示和隐藏
        if (submenu.style.display === 'block') {
            submenu.style.display = 'none';
            arrow.style.transform = 'rotate(0deg)'; // 恢复箭头方向
        } else {
            submenu.style.display = 'block';
            arrow.style.transform = 'rotate(90deg)'; // 旋转箭头
        }
    });
});
// 你可以在这里添加一些交互功能，譬如点击菜单时高亮显示等
