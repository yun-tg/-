const menuEl = document.getElementById("menu");
const articleEl = document.getElementById("article");

const menus = {
  "基础教程": {
    icon: "fa-book",
    files: [
      "01-环境准备.md",
      "02-安装说明.md"
    ]
  },
  "进阶教程": {
    icon: "fa-gears",
    files: [
      "01-高级配置.md"
    ]
  }
};

// 加载顶部 Markdown
loadTop();

function loadTop() {
  fetch("tutorials/top.md")
    .then(res => res.text())
    .then(md => {
      articleEl.innerHTML = renderTop(md);
    });
}

// 生成菜单
for (const group in menus) {
  const g = menus[group];

  const groupEl = document.createElement("div");
  groupEl.className = "menu-group";

  const title = document.createElement("div");
  title.className = "menu-group-title";
  title.innerHTML = `<i class="fa ${g.icon}"></i>${group}`;

  const items = document.createElement("div");
  items.className = "menu-items";

  g.files.forEach(file => {
    const item = document.createElement("div");
    item.className = "menu-item";
    item.textContent = file.replace(/^\d+-/, "").replace(".md", "");
    item.onclick = () => loadMd(group, file);
    items.appendChild(item);
  });

  title.onclick = () => {
    items.style.display =
      items.style.display === "none" ? "block" : "none";
  };

  groupEl.appendChild(title);
  groupEl.appendChild(items);
  menuEl.appendChild(groupEl);
}

// 加载教程
function loadMd(group, file) {
  fetch(`tutorials/${group}/${file}`)
    .then(res => res.text())
    .then(md => {
      articleEl.innerHTML =
        `<div class="article-card">${mdToHtml(md)}</div>`;
    });
}

// Markdown 渲染
function mdToHtml(md) {
  return md
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^\\- \\[x\\] (.*)/gim, "<p class='check'>$1</p>")
    .replace(/\\n/g, "<br>");
}

// 顶部内容渲染
function renderTop(md) {
  return md
    .replace("{{banner}}",
      `<div class="banner"><img src="images/banner.png"></div>`)
    .replace("{{features}}", "")
    .replace(/\\n/g, "<br>");
}
