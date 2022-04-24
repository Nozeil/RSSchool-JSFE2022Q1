const NAV_LINKS_DISABLED = document.querySelectorAll('.nav__link_disabled');
NAV_LINKS_DISABLED.forEach(navItem => navItem.addEventListener('click', (event) => event.preventDefault()));