const tutorials = [
  {
    title: "基础入门",
    icon: "fa-book",
    file: "tutorials/01-基础入门.md"
  },
  {
    title: "账号管理",
    icon: "fa-user-gear",
    file: "tutorials/02-账号管理.md"
  },
  {
    title: "群控实战",
    icon: "fa-layer-group",
    file: "tutorials/03-群控实战.md"
  }
];

const menu = document.getElementById("menu");
const content = document.getElementById("content");

tutorials.forEach((item, index) => {
  const a = document.createElement("a");
  a.href = "#";
  a.innerHTML = `<i class="fa-solid ${item.icon}"></i>${item.title}`;

  a.onclick = () => loadTutorial(item.file, a);
  if (index === 0) loadTutorial(item.file, a);

  menu.appendChild(a);
});

function loadTutorial(file, el) {
  document.querySelectorAll("#menu a").forEach(a => a.classList.remove("active"));
  el.classList.add("active");

  fetch(file)
    .then(res => res.text())
    .then(md => {
      content.innerHTML = marked.parse(md);
      window.scrollTo(0, 0);
    });
}
