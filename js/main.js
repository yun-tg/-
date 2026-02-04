const menuLinks = document.querySelectorAll('.sidebar a');

window.addEventListener('scroll', () => {
    let fromTop = window.scrollY + 100;

    menuLinks.forEach(link => {
        let section = document.querySelector(link.hash);
        if (
            section.offsetTop <= fromTop &&
            section.offsetTop + section.offsetHeight > fromTop
        ) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
});
