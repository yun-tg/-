const content = document.getElementById("content");

function loadPage(mdFile) {
  Promise.all([
    fetch("tutorials/top.md").then(r => r.text()),
    fetch(mdFile).then(r => r.text())
  ])
  .then(([topMd, bodyMd]) => {
    content.innerHTML =
      marked.parse(topMd) +
      "<hr style='margin:40px 0'>" +
      marked.parse(bodyMd);

    content.scrollTop = 0;
  })
  .catch(() => {
    content.innerHTML = "<p>教程加载失败</p>";
  });
}
