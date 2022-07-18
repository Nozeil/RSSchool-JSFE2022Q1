import { target } from 'nouislider';
import { ProductsT, rangeHandler, SliderHandlerT, ValueFiltersT } from '../../../types/types';
import AppController from '../../controller/appController';
import ProductI from '../../controller/loader/productI';
import MinMaxI from '../../controller/minMaxI';
import { SortValues } from '../../enums/enums';
import Cards from '../cards/cards';
import Component from '../component/component';
import Header from '../header/header';
import Slider from '../rangeSlider/rangeSlider';
import TextComponent from '../textComponent/textComponent';
import MainI from './mainI';

export default class Main implements MainI {
  component: Component;
  cards: Cards;
  createdCards: HTMLDivElement[] | undefined;
  textComponent: TextComponent;
  productsSection!: HTMLElement;
  filtersSort!: HTMLElement;
  private sortValue!: HTMLElement;
  slider: Slider;
  buttons: HTMLElement[] = [];
  controller: AppController;

  constructor() {
    this.component = new Component();
    this.cards = new Cards();
    this.textComponent = new TextComponent();
    this.slider = new Slider();
    this.controller = new AppController();
  }

  renderMain(
    valueFilterHandler: rangeHandler,
    valueFilterValues: ValueFiltersT,
    parentEl: HTMLElement,
    products: ProductsT,
    localStorageIds: string[] | null,
    minMaxAmounts: MinMaxI,
    minMaxYears: MinMaxI,
    sliderAmountHandler: SliderHandlerT,
    sliderYearHandler: SliderHandlerT,
    header: Header
  ): void {
    const main: HTMLElement = this.component.createComponent('main', 'main', parentEl);
    const mainContainer: HTMLElement = this.component.createComponent('div', 'main__container container', main);
    const filtersSection: HTMLElement = this.component.createComponent('section', 'filters', mainContainer);
    this.productsSection = this.component.createComponent('section', 'products', mainContainer);

    const searchContainer: HTMLElement = this.component.createComponent(
      'div',
      'filters__search-container',
      filtersSection
    );
    this.textComponent.createTextComponent('h3', 'filters__title', searchContainer, 'Search');
    const search: HTMLInputElement = this.component.createComponent(
      'input',
      'filters__search',
      searchContainer
    ) as HTMLInputElement;
    search.type = 'search';
    search.autocomplete = 'off';
    search.placeholder = 'Car...';
    search.addEventListener('input', (): void => {
      let copyProducts: ProductsT = this.controller.filteredProducts || products;
      if (search.value) {
        copyProducts = products.filter((product: ProductI): boolean =>
          product.model.toLowerCase().includes(search.value.toLowerCase())
        );
      }

      this.controller.addToCart(
        this.cards.renderCards(
          this.productsSection,
          copyProducts,
          this.controller.getFromLocalStorage('cars-store-products-cart')
        ),
        header.createdCounter as HTMLElement
      );
      if (!copyProducts.length) {
        this.textComponent.createTextComponent(
          'h2',
          'products__not-find',
          this.productsSection,
          'Sorry, no matches found'
        );
      }
    });
    window.addEventListener('load', (): void => search.focus());
    this.createdCards = this.cards.renderCards(this.productsSection, products, localStorageIds);
    this.renderSort(filtersSection);
    const amountSlider: target = this.slider.renderSlider(filtersSection, 'Amount', minMaxAmounts, sliderAmountHandler);
    const yearSlider: target = this.slider.renderSlider(filtersSection, 'Year', minMaxYears, sliderYearHandler);
    this.renderValuesFilters(valueFilterHandler, valueFilterValues, filtersSection);

    const resetFiltersButton: HTMLElement = this.textComponent.createTextComponent(
      'button',
      'filters__button filters__reset-filters',
      filtersSection,
      'reset filters'
    );

    resetFiltersButton.addEventListener('click', (): void => {
      const sortedPoducts: ProductsT = this.controller.sortProducts(
        this.controller.getFromLocalStorage('cars-store-sort-value') || SortValues.byNameAZ,
        products
      ) as ProductsT;

      this.buttons.forEach((button: HTMLElement): void => button.classList.remove('filters_button-active'));

      const defaultSetting: { [s: string]: string[] } = {
        manufacturer: [],
        transmission: [],
        color: [],
        popular: [],
      };

      this.controller.saveToLocalStorage('cars-store-value-filters', defaultSetting);
      amountSlider.noUiSlider?.set([minMaxAmounts.min, minMaxAmounts.max]);
      yearSlider.noUiSlider?.set([minMaxYears.min, minMaxYears.max]);
      this.controller.addToCart(
        this.cards.renderCards(
          this.productsSection,
          sortedPoducts,
          this.controller.getFromLocalStorage('cars-store-products-cart')
        ),
        header.createdCounter as HTMLElement
      );
    });

    const resetSettingsButton: HTMLElement = this.textComponent.createTextComponent(
      'button',
      'filters__button filters__reset-settings',
      filtersSection,
      'reset settings'
    );

    resetSettingsButton.addEventListener('click', (): void => {
      window.location.reload();
      localStorage.clear();
    });
  }

  renderValuesFilters(valueFilterHandler: rangeHandler, values: ValueFiltersT, parentEl: HTMLElement): void {
    this.renderValueFilter(valueFilterHandler, values, parentEl);
  }

  renderValueFilter(valueFilterHandler: rangeHandler, values: ValueFiltersT, parentEl: HTMLElement): void {
    for (const key in values) {
      const filter: HTMLElement = this.component.createComponent('div', `filters__${key}`, parentEl);
      this.textComponent.createTextComponent('h3', 'filters__title', filter, key);
      const filterButtons: HTMLElement = this.component.createComponent('div', 'filters__buttons', filter);

      values[key].forEach((value: string): void => {
        const button: HTMLElement =
          key === 'popular'
            ? this.textComponent.createTextComponent('button', `filters__button ${key}`, filterButtons, value)
            : this.textComponent.createTextComponent('button', `filters__button ${value}`, filterButtons, value);

        this.buttons.push(button);

        button.addEventListener('click', (): void => {
          button.classList.toggle('filters_button-active');
          valueFilterHandler(key, value);
        });
      });
    }
    this.updateActiveButtons(this.buttons);
  }

  updateActiveButtons(buttons: HTMLElement[]) {
    const activeButtonsClasses: string[] = Object.values(
      this.controller.getFromLocalStorage('cars-store-value-filters')
    ).flat(1) as string[];

    buttons.forEach((button: HTMLElement): void => {
      activeButtonsClasses.forEach((activeButtonClass: string): void => {
        if (
          button.classList.contains(activeButtonClass.split(' ')[0]) ||
          (button.classList.contains('popular') && activeButtonClass.split(' ')[0] === 'yes')
        ) {
          button.classList.toggle('filters_button-active');
        }
      });
    });
  }

  renderSort(parentEl: HTMLElement, sortValue: SortValues = SortValues.byNameAZ): void {
    this.filtersSort = this.component.createComponent('div', 'filters__sort sort', parentEl) as HTMLElement;
    const sortValues: string[] = [
      SortValues.byNameAZ,
      SortValues.byNameZA,
      SortValues.byYearAscending,
      SortValues.byYearDescending,
    ];
    this.textComponent.createTextComponent('h3', 'filters__title', this.filtersSort, 'Sort');
    this.setSortValue(this.textComponent.createTextComponent('div', 'sort__value', this.filtersSort, sortValue));
    const sortList: HTMLElement = this.component.createComponent('ul', 'sort__list', this.filtersSort);
    sortValues.forEach(
      (value: string): HTMLElement => this.textComponent.createTextComponent('li', 'sort__item', sortList, value)
    );
  }

  getCreatedCards(): HTMLDivElement[] | undefined {
    return this.createdCards;
  }

  getSortValue(): HTMLElement {
    return this.sortValue;
  }

  setSortValue(el: HTMLElement): void {
    this.sortValue = el;
  }
}
