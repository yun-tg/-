const menu = document.getElementById("menu");
const article = document.getElementById("article");

const files = [
  { title: "基础教程", file: "tutorials/基础教程.md", icon: "fa-book" },
  { title: "进阶教程", file: "tutorials/进阶教程.md", icon: "fa-gears" }
];

// 加载全部教程
files.forEach(item => {
  fetch(item.file)
    .then(r => r.text())
    .then(md => renderMarkdown(item, md));
});

// 渲染 Markdown + 生成菜单
function renderMarkdown(item, md) {
  const lines = md.split("\n");
  let currentSection = "";

  // 主菜单
  const main = document.createElement("div");
  main.className = "menu-main";
  main.innerHTML = `<div class="menu-main-title">
    <i class="fa ${item.icon}"></i> ${item.title}
  </div>`;
  menu.appendChild(main);

  lines.forEach(line => {
    if (line.startsWith("## ")) {
      const title = line.replace("## ", "");
      const id = item.title + "-" + title;

      // 子菜单
      const sub = document.createElement("div");
      sub.className = "menu-sub";
      sub.textContent = title;
      sub.onclick = () => {
        document.getElementById(id).scrollIntoView({
          behavior: "smooth"
        });
      };
      main.appendChild(sub);

      // 内容区
      currentSection = document.createElement("div");
      currentSection.className = "section";
      currentSection.id = id;
      currentSection.innerHTML = `<h2>${title}</h2>`;
      article.appendChild(currentSection);
    } else if (currentSection) {
      currentSection.innerHTML += `<p>${line}</p>`;
    }
  });
}
