const menu = document.getElementById("menu");
const content = document.getElementById("content");

// 教程文件列表
const tutorials = [
    "tutorials/01_基础入门.html",
    "tutorials/02_进阶教程.html"
];

(async function loadTutorials(){
    // 保留顶部板块
    const topPanel = document.querySelector(".top-panel");
    content.innerHTML = "";
    content.appendChild(topPanel);

    for(let i=0;i<tutorials.length;i++){
        try{
            const res = await fetch(tutorials[i]);
            if(!res.ok) throw new Error("无法加载: "+tutorials[i]);
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

            // 创建菜单主项
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href="#"+section.id;
            a.textContent=mainTitle;
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
                    subA.addEventListener("click", e=>{
                        e.preventDefault();
                        document.getElementById(subId).scrollIntoView({behavior:"smooth"});
                    });
                    subLi.appendChild(subA);
                    ulSub.appendChild(subLi);
                });

                li.appendChild(ulSub);

                // 点击主菜单展开/收起子菜单（不滚动菜单）
                a.addEventListener("click", e=>{
                    e.preventDefault();
                    const submenu = li.querySelector(".submenu");
                    if(submenu){
                        const isOpen = submenu.style.display==="block";
                        submenu.style.display = isOpen? "none":"block";
                        li.classList.toggle("open",!isOpen);
                        // 只滚动右侧内容
                        section.scrollIntoView({behavior:"smooth"});
                    }
                });
            }else{
                // 没有子菜单直接滚动
                a.addEventListener("click", e=>{
                    e.preventDefault();
                    section.scrollIntoView({behavior:"smooth"});
                });
            }

            menu.appendChild(li);

        }catch(e){
            const failSection=document.createElement("section");
            failSection.innerHTML=`<h1>加载失败: ${tutorials[i]}</h1><p>${e}</p>`;
            content.appendChild(failSection);
        }
    }

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
