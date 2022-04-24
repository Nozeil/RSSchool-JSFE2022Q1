import { petsData } from "./_pets-data.js";

class PaginationCard {

	constructor(name, src) {
		this.name = name;
		this.src = src;
	}

	createPaginationImg() {
		const IMG = document.createElement('img');
		IMG.className = 'pagination__image';
		IMG.src = this.src;
		IMG.alt = 'pet';
		return IMG;
	}

	createPaginationTitle() {
		const H4 = document.createElement('h4');
		H4.className = 'pagination__title';
		H4.textContent = this.name;
		return H4;
	}

	createPaginationButton() {
		const BUTTON = document.createElement('button');
		BUTTON.className = 'pagination__button';
		BUTTON.textContent = 'Learn more';
		return BUTTON;
	}

	createPaginationCard() {
		const PAGINATION_CARD = document.createElement('div');
		PAGINATION_CARD.className = 'pagination__card';
		PAGINATION_CARD.append(this.createPaginationImg(), this.createPaginationTitle(), this.createPaginationButton());
		return PAGINATION_CARD;
	}
}

const PAGINATION = document.querySelector('.pagination');
const BUTTON_PAGINATOR_NEXT = document.querySelector('.pagination-buttons__button_paginator-next');
const BUTTON_PAGINATOR_PREV = document.querySelector('.pagination-buttons__button_paginator-prev');

const BUTTON_PAGINATOR_CURRENT_PAGE_NUM = document.querySelector('.pagination-buttons__button_active');

const FIRST_PAGE_BUTTON = document.querySelector('.pagination-buttons_show-first-page');
const LAST_PAGE_BUTTON = document.querySelector('.pagination-buttons_show-last-page');

const FIRST_PAGE_NUM = 1;
let lastPageNum;

const DESKTOP_NUM_OF_PAGINATION_CARDS = 8;
const DESKTOP_NUM_OF_PAGINATION_PAGES = 6;
const TABLET_NUM_OF_PAGINATION_CARDS = 6;
const MOBILE_NUM_OF_PAGINATION_CARDS = 3;

let desktopPages;
let tabletPages;
let mobilePages;
let currentDevice;
let firstPage;
let lastPage;

let pageCounter = FIRST_PAGE_NUM;

const DESKTOP_MQL_MAX_WIDTH = window.matchMedia('(min-width: 1280px)');
const TABLET_MQL_MAX_WIDTH = window.matchMedia('(max-width: 1279px) and (min-width: 768px)');
const MOBILE_MQL_MAX_WIDTH = window.matchMedia('(max-width: 767px)');

DESKTOP_MQL_MAX_WIDTH.addEventListener('change', checkScreenViewport);
TABLET_MQL_MAX_WIDTH.addEventListener('change', checkScreenViewport);
MOBILE_MQL_MAX_WIDTH.addEventListener('change', checkScreenViewport);

let shuffledData;

checkScreenViewport(DESKTOP_MQL_MAX_WIDTH);
checkScreenViewport(TABLET_MQL_MAX_WIDTH);
checkScreenViewport(MOBILE_MQL_MAX_WIDTH);

BUTTON_PAGINATOR_NEXT.addEventListener('click', (event) => {

	if (pageCounter < lastPageNum) {
		FIRST_PAGE_BUTTON.classList.remove('pagination-buttons__button_inactive');
		FIRST_PAGE_BUTTON.classList.add('pagination-buttons__button_paginator');
		swapPages(currentDevice[pageCounter], currentDevice[pageCounter - 1]);
		pageCounter++;
	}

	BUTTON_PAGINATOR_CURRENT_PAGE_NUM.textContent = pageCounter;

	if (pageCounter === lastPageNum) {
		event.target.className = 'pagination-buttons__button_inactive pagination-buttons__button_paginator-next';
		swapButtonClasses(FIRST_PAGE_BUTTON, LAST_PAGE_BUTTON);
	}

	if (pageCounter > FIRST_PAGE_NUM) {
		BUTTON_PAGINATOR_PREV.className = "pagination-buttons__button_paginator pagination-buttons__button_paginator-prev";
	}
});

BUTTON_PAGINATOR_PREV.addEventListener('click', (event) => {

	if (pageCounter > FIRST_PAGE_NUM) {
		LAST_PAGE_BUTTON.classList.remove('pagination-buttons__button_inactive');
		LAST_PAGE_BUTTON.classList.add('pagination-buttons__button_paginator');
		swapPages(currentDevice[pageCounter - 2], currentDevice[pageCounter - 1]);
		pageCounter--;
	}

	BUTTON_PAGINATOR_CURRENT_PAGE_NUM.textContent = pageCounter;

	if (pageCounter === FIRST_PAGE_NUM) {
		event.target.className = 'pagination-buttons__button_inactive pagination-buttons__button_paginator-next';
		swapButtonClasses(LAST_PAGE_BUTTON, FIRST_PAGE_BUTTON);
	}

	if (pageCounter < lastPageNum) {
		BUTTON_PAGINATOR_NEXT.className = "pagination-buttons__button_paginator pagination-buttons__button_paginator-prev";
	}
});

function appendPages(pages, numOfCards) {

	PAGINATION.innerHTML = '';

	if (!pages) {
		pages = createPagesForDiffrentResolutions(numOfCards);
	}

	pages.forEach((page, index) => {
		if (index === 0) {
			page.classList.add('pagination__cards_active');
		} else {
			page.classList.add('pagination__cards_hidden');
		}
	});

	firstPage = pages[0];
	lastPage = pages[pages.length - 1];
	lastPageNum = pages.length;
	pageCounter = FIRST_PAGE_NUM;
	currentDevice = pages;
	swapButtonClasses(BUTTON_PAGINATOR_NEXT, BUTTON_PAGINATOR_PREV);
	swapButtonClasses(LAST_PAGE_BUTTON, FIRST_PAGE_BUTTON);
	BUTTON_PAGINATOR_CURRENT_PAGE_NUM.textContent = FIRST_PAGE_NUM;
	PAGINATION.append(...pages);
}

function checkScreenViewport(event) {
	if (event.matches && event.media === '(min-width: 1280px)') {
		shuffledData = shuffleData(devideNewPetsData(DESKTOP_NUM_OF_PAGINATION_CARDS));
		appendPages(desktopPages, DESKTOP_NUM_OF_PAGINATION_CARDS);
	}

	if (event.matches && event.media === '(max-width: 1279px) and (min-width: 768px)') {
		shuffledData = shuffleData(devideNewPetsData(TABLET_NUM_OF_PAGINATION_CARDS));
		appendPages(tabletPages, TABLET_NUM_OF_PAGINATION_CARDS);
	}

	if (event.matches && event.media === '(max-width: 767px)') {
		shuffledData = shuffleData(devideNewPetsData(MOBILE_NUM_OF_PAGINATION_CARDS));
		appendPages(mobilePages, MOBILE_NUM_OF_PAGINATION_CARDS);
	}
}

function swapPages(activePage, hiddenPage) {
	activePage.classList.remove('pagination__cards_hidden');
	activePage.classList.add('pagination__cards_active');
	hiddenPage.classList.remove('pagination__cards_active');
	hiddenPage.classList.add('pagination__cards_hidden');
}

function swapButtonClasses(activeButton, inactiveButton) {
	activeButton.classList.remove('pagination-buttons__button_inactive');
	activeButton.classList.add('pagination-buttons__button_paginator');
	inactiveButton.classList.remove('pagination-buttons__button_paginator');
	inactiveButton.classList.add('pagination-buttons__button_inactive');
}

FIRST_PAGE_BUTTON.addEventListener('click', () => {
	BUTTON_PAGINATOR_CURRENT_PAGE_NUM.textContent = FIRST_PAGE_NUM;
	pageCounter = FIRST_PAGE_NUM;
	currentDevice.forEach(item => item.className = 'pagination__cards pagination__cards_hidden');
	firstPage.className = 'pagination__cards pagination__cards_active';
	swapButtonClasses(BUTTON_PAGINATOR_NEXT, BUTTON_PAGINATOR_PREV);
	swapButtonClasses(LAST_PAGE_BUTTON, FIRST_PAGE_BUTTON);
});

LAST_PAGE_BUTTON.addEventListener('click', () => {
	BUTTON_PAGINATOR_CURRENT_PAGE_NUM.textContent = lastPageNum;
	pageCounter = lastPageNum;
	currentDevice.forEach(item => item.className = 'pagination__cards pagination__cards_hidden');
	lastPage.className = 'pagination__cards pagination__cards_active';
	swapButtonClasses(BUTTON_PAGINATOR_PREV, BUTTON_PAGINATOR_NEXT);
	swapButtonClasses(FIRST_PAGE_BUTTON, LAST_PAGE_BUTTON);
});

function createNewPetsData() {
	const PETS_DATA = [];

	while (PETS_DATA.length < DESKTOP_NUM_OF_PAGINATION_PAGES) {
		PETS_DATA.push(petsData);
	}

	return PETS_DATA.flat(1);
}

function devideNewPetsData(numOfPages) {
	const DEVIDED_NEW_PETS_DATA = [];
	let counter = 1;
	let newPetsData = createNewPetsData();
	let tempData = [];

	newPetsData.forEach(data => {
		tempData.push(data);

		if (counter === numOfPages) {
			DEVIDED_NEW_PETS_DATA.push(tempData);
			tempData = [];
			counter = 0;
		}

		counter++;
	});

	return DEVIDED_NEW_PETS_DATA;
}

function shuffleData(data) {
	return data.map(dataItem => {
		for (let i = dataItem.length - 1; i > 0; i--) {
			const RANDOM_NUM = Math.floor(Math.random() * i);
			[dataItem[i], dataItem[RANDOM_NUM]] = [dataItem[RANDOM_NUM], dataItem[i]];
		}
		return dataItem;
	});
}

function createCardsFromData() {
	return shuffledData.map(data => {
		return data.map(dataItem => {
			const SRC = `${dataItem.img.slice(0, dataItem.img.indexOf('images'))}imgs/png/pets-${dataItem.name.toLowerCase()}.png`;
			const CARD = new PaginationCard(dataItem.name, SRC);
			return CARD.createPaginationCard(dataItem.name, SRC);
		});
	}).flat(1);
}

function createPaginationCardsBlock() {
	const DIV = document.createElement('div');
	DIV.className = 'pagination__cards';
	return DIV;
}

function createPagesForDiffrentResolutions(numOfCards) {
	let pages = [];
	let tempPage = [];
	let counter = 1;

	createCardsFromData().forEach(card => {
		tempPage.push(card);

		if (counter === numOfCards) {
			let paginationCardsBlock = createPaginationCardsBlock();
			paginationCardsBlock.append(...tempPage);
			pages.push(paginationCardsBlock);
			tempPage = [];
			counter = 0;
		}

		counter++;
	});

	return pages;
}




