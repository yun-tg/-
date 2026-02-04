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
                    subA.href="#"+subId;
                    subA.textContent=h2.innerText;
                    // 给 h2 添加图标
                    const iconElem = document.createElement("i");
                    iconElem.className = "fas fa-angle-right";
                    h2.prepend(iconElem);

                    subA.addEventListener("click", e=>{
                        e.preventDefault();
                        document.getElementById(subId).scrollIntoView({behavior:"smooth"});
                    });
                    subLi.appendChild(subA);
                    ulSub.appendChild(subLi);
                });

                li.appendChild(ulSub);

                a.addEventListener("click", e=>{
                    e.preventDefault();
                    const submenu = li.querySelector(".submenu");
                    if(submenu){
                        const isOpen = submenu.style.display==="block";
                        submenu.style.display = isOpen? "none":"block";
                        li.classList.toggle("open",!isOpen);
                        section.scrollIntoView({behavior:"smooth"});
                    }
                });
            }else{
                a.addEventListener("click", e=>{
                    e.preventDefault();
                    section.scrollIntoView({behavior:"smooth"});
                });
            }

            menu.appendChild(li);

        }catch(e){
            const failSection=document.createElement("section");
            failSection.innerHTML=`<h1>加载失败: ${tutorials[i].file}</h1><p>${e}</p>`;
            content.appendChild(failSection);
        }
    }

    // 段落开头图标
    document.querySelectorAll(".section-card p").forEach(p=>{
        const icon = p.dataset.icon;
        if(icon){
            const iElem = document.createElement("i");
            iElem.className = "fas fa-" + icon;
            p.prepend(iElem);
        }
    });

    // 高亮菜单
    const menuLinks=document.querySelectorAll(".sidebar a");
    window.addEventListener("scroll", ()=>{
        let fromTop = window.scrollY + 100;
        menuLinks.forEach(link=>{
            const section=document.querySelector(link.getAttribute("href"));
            if(!section) return;
            if(section.offsetTop<=fromTop && section.offsetTop+section.offsetHeight>fromTop){
                link.classList.add("active");
            }else{
                link.classList.remove("active");
            }
        });
    });

})();
