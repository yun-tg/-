const menu = document.getElementById("menu");
const content = document.getElementById("content");

// 教程文件列表（必须和 tutorials 文件夹文件名一致）
const tutorials = [
    "tutorials/01_基础入门.html",
    "tutorials/02_进阶教程.html"
];

// 自动生成菜单 & 加载内容
(async function loadTutorials() {
    content.innerHTML = "";

    for (let i = 0; i < tutorials.length; i++) {
        try {
            const res = await fetch(tutorials[i]);
            if (!res.ok) throw new Error("无法加载: " + tutorials[i]);
            const html = await res.text();

            const section = document.createElement("section");
            section.id = "section" + i;
            section.innerHTML = html;
            content.appendChild(section);

            // 获取主标题
            const h1 = section.querySelector("h1");
            const mainTitle = h1 ? h1.innerText : "章节" + (i+1);

            // 创建菜单主项
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#" + section.id;
            a.textContent = mainTitle;
            a.addEventListener("click", e => {
                e.preventDefault();
                section.scrollIntoView({behavior:"smooth"});
            });
            li.appendChild(a);

            // 查找子章节 h2
            const h2s = section.querySelectorAll("h2");
            if (h2s.length > 0) {
                const ulSub = document.createElement("ul");
                ulSub.classList.add("submenu");
                h2s.forEach((h2, j) => {
                    const subLi = document.createElement("li");
                    const subA = document.createElement("a");
                    const subId = section.id + "-" + j;
                    h2.id = subId; // 给 h2 添加 id
                    subA.href = "#" + subId;
                    subA.textContent = h2.innerText;
                    subA.addEventListener("click", e => {
                        e.preventDefault();
                        document.getElementById(subId).scrollIntoView({behavior:"smooth"});
                    });
                    subLi.appendChild(subA);
                    ulSub.appendChild(subLi);
                });
                li.appendChild(ulSub);
            }

            menu.appendChild(li);

        } catch(e) {
            const failSection = document.createElement("section");
            failSection.innerHTML = `<h1>加载失败: ${tutorials[i]}</h1><p>${e}</p>`;
            content.appendChild(failSection);
        }
    }

    // 高亮当前菜单
    const menuLinks = document.querySelectorAll(".sidebar a");
    window.addEventListener("scroll", () => {
        let fromTop = window.scrollY + 100;
        menuLinks.forEach(link => {
            const section = document.querySelector(link.getAttribute("href"));
            if (!section) return;
            if (section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });

})();
