const article = document.getElementById("article");

async function loadMarkdown(file) {
  article.innerHTML = "";

  try {
    const top = await fetch("tutorials/top.md");
    article.innerHTML += marked.parse(await top.text());

    if (file) {
      const res = await fetch("tutorials/" + file);
      article.innerHTML += marked.parse(await res.text());
    }
  } catch {
    article.innerHTML = "教程加载失败";
  }
}

document.querySelectorAll(".submenu li").forEach(li => {
  li.addEventListener("click", () => {
    loadMarkdown(li.dataset.md);
  });
});

loadMarkdown();
