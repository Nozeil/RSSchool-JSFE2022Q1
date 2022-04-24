import { SHADOW } from './_body-shadow.js';

export const BODY = document.querySelector('.body');
const HEADER_LOGO = document.querySelector('.header__logo');
const BURGERS = document.querySelectorAll('.burger');
const NAV = document.querySelector('.nav');

document.addEventListener('click', (event) => {
	if (BODY.classList.contains('body_burger-active') &&
		event.target.classList.contains('nav__link') ||
		BODY.classList.contains('body_burger-active') &&
		event.target.classList.contains('body__shadow') ||
		event.target.classList.contains('burger')) {
		toggleBurgerMenu();
	}
});

function toggleBurgerMenu() {

	BURGERS.forEach(burger => {
		burger.classList.toggle('burger_hidden');
		burger.classList.toggle('burger_rotated');
	});

	BODY.classList.toggle('body_overflow-y-hidden');
	BODY.classList.toggle('body_burger-active');
	HEADER_LOGO.classList.toggle('header__logo_hidden');
	NAV.classList.toggle('nav_hidden');
	SHADOW.classList.toggle('body__shadow_active');

}

