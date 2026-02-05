const menuData = [
  {
    title: "基础教程",
    icon: "fa-book",
    children: [
      { title: "基础入门", file: "tutorials/01-基础入门.md" },
      { title: "账号管理", file: "tutorials/02-账号管理.md" }
    ]
  },
  {
    title: "进阶实战",
    icon: "fa-layer-group",
    children: [
      { title: "群控实战", file: "tutorials/03-群控实战.md" }
    ]
  }
];

const menu = document.getElementById("menu");
const content = document.getElementById("content");

menuData.forEach(group => {
  const groupDiv = document.createElement("div");
  groupDiv.className = "menu-group";

  const title = document.createElement("div");
  title.className = "menu-title";
  title.innerHTML = `
    <span><i class="fa-solid ${group.icon}"></i>${group.title}</span>
    <i class="fa-solid fa-chevron-down arrow"></i>
  `;

  const sub = document.createElement("div");
  sub.className = "menu-sub";

  group.children.forEach((item, index) => {
    const a = document.createElement("a");
    a.textContent = item.title;
    a.onclick = () => loadMarkdown(item.file);
    sub.appendChild(a);

    if (!content.innerHTML) loadMarkdown(item.file);
  });

  title.onclick = () => {
    sub.classList.toggle("open");
    title.querySelector(".arrow").classList.toggle("rotate");
  };

  groupDiv.appendChild(title);
  groupDiv.appendChild(sub);
  menu.appendChild(groupDiv);
});

function loadMarkdown(file) {
  fetch(file)
    .then(res => res.text())
    .then(md => {
      content.innerHTML = marked.parse(md);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
}
