const menu = document.getElementById("menu");
const content = document.getElementById("content");
const defaultIcon = "fas fa-book"; // 主菜单统一图标
const maxTutorials = 100; // 最大尝试加载教程数量

(async function loadTutorials() {
    const topPanel = document.querySelector(".top-panel");
    content.innerHTML = "";
    content.appendChild(topPanel);

    let i = 1;
    while(i <= maxTutorials){
        let num = i.toString().padStart(2,"0");
        let file = `tutorials/${num}_教程.html`;
        try{
            const res = await fetch(file);
            if(!res.ok) break; // 文件不存在，停止
            const html = await res.text();

            // 创建右侧卡片
            const section = document.createElement("section");
            section.id = "section"+i;
            section.classList.add("section-card");
            section.innerHTML = html;
            content.appendChild(section);

            // 主标题 h1 加图标
            const h1 = section.querySelector("h1");
            if(h1){
                const iconElem = document.createElement("i");
                iconElem.className = defaultIcon;
                h1.prepend(iconElem);
            }

            // 左侧菜单主项
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.href = "#"+section.id;
            a.innerHTML = `<i class="${defaultIcon}"></i>${h1? h1.innerText : '章节'+i}`;
            li.appendChild(a);

            // 子章节 h2
            const h2s = section.querySelectorAll("h2");
            if(h2s.length > 0){
                li.classList.add("has-sub");
                const ulSub = document.createElement("ul");
                ulSub.classList.add("submenu");

                h2s.forEach((h2,j)=>{
                    const subLi = document.createElement("li");
                    const subA = document.createElement("a");
                    const subId = section.id + "-" + j;
                    h2.id = subId;

                    // h2 左侧箭头图标
                    const h2Icon = document.createElement("i");
                    h2Icon.className = "fas fa-angle-right";
                    h2.prepend(h2Icon);

                    subA.href = "#" + subId;
                    subA.textContent = h2.innerText;
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
                    const isOpen = submenu.style.display==="block";
                    submenu.style.display = isOpen ? "none" : "block";
                    li.classList.toggle("open", !isOpen);
                    section.scrollIntoView({behavior:"smooth"});
                });

            } else {
                a.addEventListener("click", e=>{
                    e.preventDefault();
                    section.scrollIntoView({behavior:"smooth"});
                });
            }

            menu.appendChild(li);
            i++;
        } catch(e){
            break; // 文件不存在或无法加载，停止循环
        }
    }

    // 段落图标处理
    document.querySelectorAll(".section-card p").forEach(p=>{
        const iconType = p.dataset.icon;
        if(iconType){
            const iElem = document.createElement("i");
            iElem.className = "fas fa-"+iconType;
            iElem.dataset.type = iconType;
            p.prepend(iElem);
        }
    });

    // 菜单高亮
    const menuLinks = document.querySelectorAll(".sidebar a");
    window.addEventListener("scroll", ()=>{
        let fromTop = window.scrollY + 100;
        menuLinks.forEach(link=>{
            const section = document.querySelector(link.getAttribute("href"));
            if(!section) return;
            if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    });

})();
