// Enhance the shared navigation; links remain available if JavaScript is disabled.
document.querySelectorAll('.navbar').forEach((nav, index) => {
    const links = nav.querySelector('.nav-links');
    if (!links) return;
    links.id = `site-navigation-${index}`;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'nav-toggle';
    button.setAttribute('aria-controls', links.id);
    button.innerHTML = '<span class="nav-toggle-icon" aria-hidden="true">☰</span><span>Menu</span>';
    nav.insertBefore(button, links);
    const mobile = window.matchMedia('(max-width: 1100px)');
    const setOpen = (open) => {
        button.setAttribute('aria-expanded', String(open));
        links.hidden = mobile.matches && !open;
    };
    button.addEventListener('click', () => setOpen(button.getAttribute('aria-expanded') !== 'true'));
    links.addEventListener('click', (event) => {
        if (event.target.closest('a') && mobile.matches) setOpen(false);
    });
    nav.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && mobile.matches && !links.hidden) {
            setOpen(false);
            button.focus();
        }
    });
    document.addEventListener('click', (event) => {
        if (mobile.matches && !nav.contains(event.target)) setOpen(false);
    });
    mobile.addEventListener('change', () => setOpen(false));
    setOpen(false);
});
