import { petsData } from './_pets-data.js';
import { SHADOW } from './_body-shadow.js';
import { BODY } from './_burger.js';

const SECTION_PETS = document.querySelector('.section-pets');
const POPUP_ANIMATION_TIME = 500;
let popup;

let sliderCard;
let petName;

document.addEventListener('click', (event) => {
	if (event.target.classList.contains('slider__card') ||
		event.target.classList.contains('slider__image') ||
		event.target.classList.contains('slider__title') ||
		event.target.classList.contains('slider__button')) {

		let popupData;

		sliderCard = event.target.closest('.slider__card');
		const SLIDER_CARD_CHILDS = sliderCard.children;


		for (let child of SLIDER_CARD_CHILDS) {
			if (child.classList.contains('slider__title')) {
				petName = child.textContent;
			}
		}

		popupData = petsData.filter(data => data.name === petName)[0];

		const SRC = `${popupData.img.slice(0, popupData.img.indexOf('images'))}imgs/png/pets-${popupData.name.toLowerCase()}.png`;


		const NEW_POPUP = new Popup(popupData.age, popupData.breed, popupData.description, popupData.diseases, SRC, popupData.inoculations, popupData.name, popupData.parasites, popupData.type);

		SHADOW.classList.add('body__shadow_active');
		BODY.classList.add('body_overflow-y-hidden');
		popup = NEW_POPUP.createPopup();
		SECTION_PETS.append(popup);


	} else if (event.target.classList.contains('body__shadow_active') && popup || event.target.classList.contains('popup__close-button')) {
		popup.classList.add('popup_deactivated');

		setTimeout(() => {
			popup.remove();
			SHADOW.classList.remove('body__shadow_active');
			BODY.classList.remove('body_overflow-y-hidden');
		}, POPUP_ANIMATION_TIME);
	}
});

SHADOW.addEventListener('mouseover', () => changeCloseButtonClassName('.popup__close-button', 'popup__close-button_shadow-hovered'));

SHADOW.addEventListener('mouseleave', () => changeCloseButtonClassName('.popup__close-button_shadow-hovered', 'popup__close-button'));

function changeCloseButtonClassName(button, className) {
	let closeButton = document.querySelector(button);
	if (closeButton) {
		closeButton.className = className;
	}
}

class Popup {
	constructor(age, breed, description, diseases, src, inoculations, name, parasites, type) {
		this.age = age;
		this.breed = breed;
		this.description = description;
		this.diseases = diseases;
		this.src = src;
		this.inoculations = inoculations;
		this.name = name;
		this.parasites = parasites;
		this.type = type;
	}

	createPopupEl(el, className) {
		const EL = document.createElement(el);
		EL.className = className;
		return EL;
	}

	createTextPopupEl(el, className, textContent) {
		const EL = this.createPopupEl(el, className);
		EL.textContent = textContent;
		return EL;
	}

	createImage(el, className) {
		const IMG = this.createPopupEl(el, className);
		IMG.src = this.src;
		IMG.alt = 'pet';
		return IMG;
	}

	createPopup() {
		const POPUP = this.createPopupEl('div', 'popup');
		const IMG = this.createImage('img', 'popup__img');
		const POPUP_CONTENT = this.createPopupEl('div', 'popup__content');
		const POPUP_HEADER = this.createPopupEl('div', 'popup__header');
		const POPUP_TITLE = this.createTextPopupEl('h3', 'popup__title', this.name);
		const POPUP_SUBTITLE = this.createTextPopupEl('h4', 'popup__subtitle', `${this.type} - ${this.breed}`);
		POPUP_HEADER.append(POPUP_TITLE, POPUP_SUBTITLE);
		const POPUP_PET_DESCRIPTION = this.createTextPopupEl('p', 'popup__pet-description', this.description);

		const POPUP_LIST = this.createPopupEl('ul', 'popup__list');
		const POPUP_CLOSE_BUTTON = this.createPopupEl('button', 'popup__close-button');

		let popupItems = [
			this.createTextPopupEl('span', 'popup__item_bold', 'Age:'),
			this.createTextPopupEl('span', 'popup__item_bold', 'Inoculations:'),
			this.createTextPopupEl('span', 'popup__item_bold', 'Diseases:'),
			this.createTextPopupEl('span', 'popup__item_bold', 'Parasites:')
		];

		const ITEMS_CONTENT = [
			this.age,
			this.inoculations,
			this.diseases,
			this.parasites
		]

		popupItems = popupItems.map((item, index) => {
			const POPUP_ITEM = this.createPopupEl('li', 'popup__item');
			POPUP_ITEM.append(item, ` ${ITEMS_CONTENT[index]}`);
			return POPUP_ITEM;
		});

		POPUP_LIST.append(...popupItems);

		POPUP_CONTENT.append(POPUP_HEADER, POPUP_PET_DESCRIPTION, POPUP_LIST);
		POPUP_CONTENT.append(POPUP_CLOSE_BUTTON);
		POPUP.append(IMG, POPUP_CONTENT);
		return POPUP;
	}
}