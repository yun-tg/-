const menu = document.getElementById("menu");
const content = document.getElementById("content");

// 教程文件列表（文件名必须和 tutorials 文件夹一致）
const tutorials = [
    "tutorials/01_安装环境.html",
    "tutorials/02_注册账号.html",
    "tutorials/03_脚本管理.html",
    "tutorials/04_云控实战.html"
];

// 自动生成左侧菜单
tutorials.forEach((file, index) => {
    let name = file.split("/")[1].replace(/\d+_|\.html/g, ""); // 去掉数字和扩展名
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

// 加载教程 HTML
(async function loadTutorials() {
    content.innerHTML = "";
    for (let i = 0; i < tutorials.length; i++) {
        try {
            let res = await fetch(tutorials[i]);
            if (!res.ok) throw new Error("无法加载文件: " + tutorials[i]);
            let html = await res.text();
            let section = document.createElement("section");
            section.id = "section" + i;
            section.innerHTML = html;
            content.appendChild(section);
        } catch(e) {
            let section = document.createElement("section");
            section.id = "section" + i;
            section.innerHTML = `<h1>加载失败: ${tutorials[i]}</h1><p>${e}</p>`;
            content.appendChild(section);
        }
    }

    // 高亮当前菜单
    const menuLinks = document.querySelectorAll(".sidebar a");
    window.addEventListener("scroll", () => {
        let fromTop = window.scrollY + 100;
        menuLinks.forEach(link => {
            let section = document.querySelector(link.getAttribute("href"));
            if (!section) return;
            if (section.offsetTop <= fromTop &&
                section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });
})();
