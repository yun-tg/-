async function loadPage(mdPath) {
  const content = document.getElementById("content");
  content.innerHTML = "<p>加载中...</p>";

  try {
    // 先加载顶部说明
    const topRes = await fetch("tutorials/top.md");
    const topText = await topRes.text();

    // 再加载正文教程
    const res = await fetch(mdPath);
    if (!res.ok) throw new Error("教程加载失败");

    const text = await res.text();

    content.innerHTML = `
  <div class="content-inner">
    <div class="top-box">
      ${marked.parse(topText)}
    </div>
    <div class="doc-box">
      ${marked.parse(text)}
    </div>
  </div>
`;

  } catch (e) {
    content.innerHTML = "<p style='color:red'>教程加载失败</p>";
  }
}

/* 子菜单展开 */
function toggleMenu(el) {
  el.classList.toggle("open");
}
