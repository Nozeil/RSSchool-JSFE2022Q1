import { petsData } from "./_pets-data.js";

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

	let centerSlider = createSliderCards(createFirstUniqueSlide(), 0);
	let leftSlider = createSliderCards(createUniqueSlide(centerSlider), -sliderWrapperWidth);
	let rightSlider = createSliderCards(createUniqueSlide(centerSlider), sliderWrapperWidth);

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