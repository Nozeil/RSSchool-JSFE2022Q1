async function addFunctionality() {
	let response = await fetch('../../assets/JSON/pets.json');
	let petsData = await response.json();

	//------Body shadow------
	const START_SCREEN_CONTAINER = document.querySelector('.start-screen-container');

	const SHADOW = document.createElement('div');
	SHADOW.className = 'body__shadow';
	START_SCREEN_CONTAINER.prepend(SHADOW);

	//------Burger------

	const BODY = document.querySelector('.body');
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

	//------Slider------

	const SLIDER_WRAPPER = document.querySelector('.slider__wrapper');
	const SLIDER_ARROW_LEFT = document.querySelector('.slider__arrow-left');
	const SLIDER_ARROW_RIGHT = document.querySelector('.slider__arrow-right');
	const DESKTOP_SLIDER_WRAPPER_WIDTH = 1096;
	const TABLET_SLIDER_WRAPPER_WIDTH = 604;
	const MOBILE_SLIDER_WRAPPER_WIDTH = 300;
	const DESKTOP_NUM_OF_SLIDER_CARDS = 3;
	const TABLET_NUM_OF_SLIDER_CARDS = 2;
	const MOBILE_NUM_OF_SLIDER_CARDS = 1;
	const TRANSITION_VALUE = 1000;

	let sliderWrapperWidth;
	let numOfSliderCards;
	let hasEventListener = false;
	let centerSlider;
	let leftSlider;
	let rightSlider;

	const DESKTOP_MQL_MAX_WIDTH = window.matchMedia('(min-width: 1280px)');
	const TABLET_MQL_MAX_WIDTH = window.matchMedia('(max-width: 1279px) and (min-width: 768px)');
	const MOBILE_MQL_MAX_WIDTH = window.matchMedia('(max-width: 767px)');

	DESKTOP_MQL_MAX_WIDTH.addEventListener('change', checkScreenViewport);
	TABLET_MQL_MAX_WIDTH.addEventListener('change', checkScreenViewport);
	MOBILE_MQL_MAX_WIDTH.addEventListener('change', checkScreenViewport);

	function checkScreenViewport(event) {
		if (event.matches && event.media === '(min-width: 1280px)') {
			initSlider(DESKTOP_SLIDER_WRAPPER_WIDTH, DESKTOP_NUM_OF_SLIDER_CARDS)
		}

		if (event.matches && event.media === '(max-width: 1279px) and (min-width: 768px)') {
			initSlider(TABLET_SLIDER_WRAPPER_WIDTH, TABLET_NUM_OF_SLIDER_CARDS)
		}

		if (event.matches && event.media === '(max-width: 767px)') {
			initSlider(MOBILE_SLIDER_WRAPPER_WIDTH, MOBILE_NUM_OF_SLIDER_CARDS)
		}
	}

	function initSlider(width, numOfCards) {
		sliderWrapperWidth = width;
		numOfSliderCards = numOfCards;
		SLIDER_WRAPPER.innerHTML = '';
		createSlider();
	}

	checkScreenViewport(DESKTOP_MQL_MAX_WIDTH);
	checkScreenViewport(TABLET_MQL_MAX_WIDTH);
	checkScreenViewport(MOBILE_MQL_MAX_WIDTH);

	function createSlider() {

		class SliderCard {

			constructor(name, src) {
				this.name = name;
				this.src = src;
			}

			createSliderImg() {
				const IMG = document.createElement('img');
				IMG.className = 'slider__image';
				IMG.src = this.src;
				IMG.alt = 'pet';
				return IMG;
			}

			createSliderTitle() {
				const H4 = document.createElement('h4');
				H4.className = 'slider__title';
				H4.textContent = this.name;
				return H4;
			}

			createSliderButton() {
				const BUTTON = document.createElement('button');
				BUTTON.className = 'slider__button';
				BUTTON.textContent = 'Learn more';
				return BUTTON;
			}

			createSliderCard() {
				const SLIDER_CARD = document.createElement('div');
				SLIDER_CARD.className = 'slider__card';
				SLIDER_CARD.append(this.createSliderImg(), this.createSliderTitle(), this.createSliderButton());
				return SLIDER_CARD;
			}
		}

		const SLIDER_CARDS_ARRAY = petsData.map(data => {
			const SRC = `${data.img.slice(0, data.img.indexOf('images'))}imgs/png/pets-${data.name.toLowerCase()}.png`;
			return new SliderCard(data.name, SRC);
		});

		centerSlider = createSliderCards(createFirstUniqueSlide(), 0);
		leftSlider = createSliderCards(createUniqueSlide(centerSlider), -sliderWrapperWidth);
		rightSlider = createSliderCards(createUniqueSlide(centerSlider), sliderWrapperWidth);

		if (hasEventListener === false) {
			SLIDER_ARROW_RIGHT.addEventListener('click', addArrowRightListener);
			SLIDER_ARROW_LEFT.addEventListener('click', addArrowLeftListener);
			hasEventListener = true;
		}

		function getRandomNum() {
			return Math.floor(Math.random() * SLIDER_CARDS_ARRAY.length);
		}

		function getRandomCard() {
			return SLIDER_CARDS_ARRAY[getRandomNum()];
		}

		function createFirstUniqueSlide() {
			let slide = new Set();

			while (slide.size < numOfSliderCards) {
				slide.add(getRandomCard());
			}

			return Array.from(slide);
		}

		function createUniqueSlide(prevSlide) {
			let nextSlide = new Set();

			while (nextSlide.size < numOfSliderCards) {
				const RANDOM_CARD = getRandomCard();
	
				if (!prevSlide.includes(RANDOM_CARD)) {
					nextSlide.add(RANDOM_CARD);
				}
				
			}

			return Array.from(nextSlide);
		}

		function createSliderCards(uniqueSlide, offset) {
			const SLIDER_CARDS = document.createElement('div');
			SLIDER_CARDS.className = 'slider__cards';
			uniqueSlide = uniqueSlide.map(card => {
				SLIDER_CARDS.append(card.createSliderCard());
				return card;
			});

			SLIDER_CARDS.style.left = offset + 'px';
			SLIDER_WRAPPER.append(SLIDER_CARDS);
			return uniqueSlide;
		}

		let direction;

		function addArrowRightListener() {
			const SLIDER_CARDS = getCardsAndRemoveListeners('right');

			SLIDER_CARDS.forEach(cards => {

				let offset = parseInt(cards.style.left);
				offset -= sliderWrapperWidth;
				cards.style.left = offset + 'px';

				checkOffsetAndDirection(cards, offset);
			});
		}

		function addArrowLeftListener() {
			const SLIDER_CARDS = getCardsAndRemoveListeners('left');

			SLIDER_CARDS.forEach(cards => {

				let offset = parseInt(cards.style.left);

				offset += sliderWrapperWidth;
				cards.style.left = offset + 'px';

				checkOffsetAndDirection(cards, offset);
			});
		}

		function getCardsAndRemoveListeners(strDirection) {

			direction = strDirection;

			const SLIDER_CARDS = document.querySelectorAll('.slider__cards');

			SLIDER_ARROW_LEFT.removeEventListener('click', addArrowLeftListener);
			SLIDER_ARROW_RIGHT.removeEventListener('click', addArrowRightListener);

			return SLIDER_CARDS;
		}

		function checkOffsetAndDirection(cards, offset) {
			if (offset === 0 && direction === 'right') {

				createSliders(rightSlider);

			} else if (offset === 0 && direction === 'left') {

				createSliders(leftSlider);

			} else {

				setTimeout(() => {
					cards.remove();
					SLIDER_ARROW_RIGHT.addEventListener('click', addArrowRightListener);
					SLIDER_ARROW_LEFT.addEventListener('click', addArrowLeftListener);
				}, TRANSITION_VALUE);

			}
		}

		function createSliders(slider) {
			centerSlider = slider;
			rightSlider = createUniqueSlide(centerSlider);
			leftSlider = createUniqueSlide(centerSlider);

			createSliderCards(rightSlider, sliderWrapperWidth);
			createSliderCards(leftSlider, -sliderWrapperWidth);
		}

	}

	//------Popup------

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
}

addFunctionality();