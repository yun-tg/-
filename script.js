const files = [
  { title: "入门教程", file: "tutorials/01-入门.md", icon: "📘" },
  { title: "进阶教程", file: "tutorials/02-进阶.md", icon: "🚀" },
  { title: "高级教程", file: "tutorials/03-高级.md", icon: "🧠" }
];

const sidebar = document.getElementById("sidebar");
const content = document.getElementById("content");

files.forEach(item => {
  const div = document.createElement("div");
  div.className = "menu-item";
  div.innerHTML = `${item.icon} ${item.title}`;
  div.onclick = () => loadMd(item.file, div);
  sidebar.appendChild(div);
});

function loadMd(file, el) {
  document.querySelectorAll(".menu-item")
    .forEach(i => i.classList.remove("active"));
  el.classList.add("active");

  fetch(file)
    .then(r => r.text())
    .then(md => {
      content.innerHTML = marked.parse(md);
      content.scrollIntoView({ behavior: "smooth" });
    });
}
