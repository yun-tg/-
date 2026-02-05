const menu = document.getElementById("menu");
const content = document.getElementById("content");

const tutorialFiles = [
  "01_基础入门.html",
  "02_进阶教程.html",
  "03_高级技巧.html"
];

(async ()=>{
    for(let i=0;i<tutorialFiles.length;i++){
        const file = "tutorials/" + tutorialFiles[i];
        const res = await fetch(file);
        if(!res.ok) continue;

        const html = await res.text();

        const section = document.createElement("section");
        section.className = "section-card";
        section.id = "section"+(i+1);
        section.innerHTML = html;
        content.appendChild(section);

        const h1 = section.querySelector("h1");
        if(h1){
            h1.insertAdjacentHTML("afterbegin",'<i class="fas fa-book"></i>');
        }

        const li = document.createElement("li");
        const a = document.createElement("a");
        a.innerHTML = `<i class="fas fa-book"></i>${h1.innerText}`;
        li.appendChild(a);

        const h2s = section.querySelectorAll("h2");
        if(h2s.length){
            li.classList.add("has-sub");
            const ul = document.createElement("ul");
            ul.className="submenu";

            h2s.forEach((h2,j)=>{
                h2.id = section.id+"-"+j;
                h2.insertAdjacentHTML("afterbegin","<i class='fas fa-angle-right'></i>");

                const sa = document.createElement("a");
                sa.textContent = h2.innerText;
                sa.href="#"+h2.id;

                const sli = document.createElement("li");
                sli.appendChild(sa);
                ul.appendChild(sli);
            });

            li.appendChild(ul);
            a.onclick=()=>{ul.style.display=ul.style.display==="block"?"none":"block";li.classList.toggle("open")};
        }

        menu.appendChild(li);
    }

    document.querySelectorAll("p[data-icon]").forEach(p=>{
        p.insertAdjacentHTML("afterbegin",
          `<i class="fas fa-${p.dataset.icon}" data-type="${p.dataset.icon}"></i>`
        );
    });
})();
