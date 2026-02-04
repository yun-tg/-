const menu = document.getElementById("menu");
const content = document.getElementById("content");

// 自动获取 tutorials 文件夹里的 HTML 文件
// 注意：GitHub Pages 不允许读取本地文件夹，这里需要手动维护文件列表
// 但只要在 tutorials 文件夹放新 HTML 文件，更新列表即可
const tutorials = [
    "tutorials/01_安装环境.html",
    "tutorials/02_注册账号.html",
    "tutorials/03_脚本管理.html"
];

// 生成菜单
tutorials.forEach((file, index) => {
    let name = file.split("/")[1].replace(/\d+_|\.html/g, "");
    let li = document.createElement("li");
    let a = document.createElement("a");
    a.href = "#" + "section" + index;
    a.textContent = name;
    a.addEventListener("click", e => {
        e.preventDefault();
        document.getElementById("section" + index).scrollIntoView({behavior:"smooth"});
    });
    li.appendChild(a);
    menu.appendChild(li);
});

// 加载教程文件
(async function loadTutorials() {
    content.innerHTML = "";
    for (let i = 0; i < tutorials.length; i++) {
        try {
            let res = await fetch(tutorials[i]);
            let html = await res.text();
            let section = document.createElement("section");
            section.id = "section" + i;
            section.innerHTML = html;
            content.appendChild(section);
        } catch(e) {
            let section = document.createElement("section");
            section.id = "section" + i;
            section.innerHTML = `<h1>加载失败: ${tutorials[i]}</h1>`;
            content.appendChild(section);
        }
    }

    // 高亮当前菜单
    const menuLinks = document.querySelectorAll(".sidebar a");
    window.addEventListener("scroll", () => {
        let fromTop = window.scrollY + 100;
        menuLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));
            if (section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
})();
