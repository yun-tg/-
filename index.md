<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>教程站点</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <!-- 侧边栏 -->
        <div class="sidebar">
            <ul>
                <li>
                    <a href="javascript:void(0);" class="menu-toggle">主菜单 1 <span class="arrow">▼</span></a>
                    <ul class="submenu">
                        <li><a href="#submenu1">子菜单 1.1</a></li>
                        <li><a href="#submenu2">子菜单 1.2</a></li>
                    </ul>
                </li>
                <li><a href="#menu2">主菜单 2</a></li>
            </ul>
        </div>

        <!-- 主内容区域 -->
        <div class="content">
            <div id="menu1">
                <h2>主菜单 1</h2>
                <p>这里是主菜单 1 的详情内容。</p>
            </div>
            <div id="submenu1">
                <h3>子菜单 1.1</h3>
                <p>这里是子菜单 1.1 的内容。</p>
            </div>
            <div id="submenu2">
                <h3>子菜单 1.2</h3>
                <p>这里是子菜单 1.2 的内容。</p>
            </div>
            <div id="menu2">
                <h2>主菜单 2</h2>
                <p>这里是主菜单 2 的内容。</p>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>
