const article = document.getElementById("article");

async function loadMarkdown(file) {
  article.innerHTML = "";

  try {
    // 先加载 top.md
    const topRes = await fetch("tutorials/top.md");
    const topText = await topRes.text();
    article.innerHTML += marked.parse(topText);

    // 再加载点击的教程
    if (file) {
      const res = await fetch("tutorials/" + file);
      const text = await res.text();
      article.innerHTML += marked.parse(text);
    }
  } catch {
    article.innerHTML = "教程加载失败";
  }
}

// 绑定子菜单点击
document.querySelectorAll(".submenu li").forEach(li => {
  li.addEventListener("click", () => {
    loadMarkdown(li.dataset.md);
  });
});

// 默认加载
loadMarkdown();
