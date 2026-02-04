const menu = document.getElementById("menu");
const content = document.getElementById("content");

// 教程文件列表
// 注意：这里可以自定义每个主菜单图标 class，如 "fas fa-book"
const tutorials = [
    {file:"tutorials/01_基础入门.html", icon:"fas fa-book"},
    {file:"tutorials/02_进阶教程.html", icon:"fas fa-cogs"}
];

(async function loadTutorials(){
    const topPanel = document.querySelector(".top-panel");
    content.innerHTML = "";
    content.appendChild(topPanel);

    for(let i=0;i<tutorials.length;i++){
        try{
            const res = await fetch(tutorials[i].file);
            if(!res.ok) throw new Error("无法加载: "+tutorials[i].file);
            const html = await res.text();

            // 创建卡片
            const section = document.createElement("section");
            section.id = "section"+i;
            section.classList.add("section-card");
            section.innerHTML = html;
            content.appendChild(section);

            // 主标题
            const h1 = section.querySelector("h1");
            const mainTitle = h1? h1.innerText:"章节"+(i+1);
            if(h1) {
                const iconElem = document.createElement("i");
                iconElem.className = tutorials[i].icon;
                h1.prepend(iconElem);
            }

            // 创建菜单主项
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href="#"+section.id;
            a.innerHTML = `<i class="${tutorials[i].icon}"></i>${mainTitle}`;
            li.appendChild(a);

            // 子章节 h2
            const h2s = section.querySelectorAll("h2");
            if(h2s.length>0){
                li.classList.add("has-sub");
                const ulSub = document.createElement("ul");
                ulSub.classList.add("submenu");

                h2s.forEach((h2,j)=>{
                    const subLi = document.createElement("li");
                    const subA = document.createElement("a");
                    const subId = section.id+"-"+j;
                    h2.id=subId;
