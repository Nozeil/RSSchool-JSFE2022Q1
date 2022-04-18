import { SHADOW } from './_body-shadow.js';

const HEADER_LOGO = document.querySelector('.header__logo');
const BURGERS = document.querySelectorAll('.burger');
const NAV = document.querySelector('.nav');

document.addEventListener('click', (event) => {
	if (event.target.classList.contains('body__shadow') || event.target.classList.contains('burger') || event.target.classList.contains('nav__link_active')) {
		toggleBurgerMenu();
	}
});

function toggleBurgerMenu() {
	BURGERS.forEach(burger => {
		burger.classList.toggle('burger_hidden');
		burger.classList.toggle('burger_rotated');
	});

	HEADER_LOGO.classList.toggle('header__logo_hidden');
	NAV.classList.toggle('nav_hidden');
	SHADOW.classList.toggle('body__shadow_active');
}
