import { ProductsT, SliderHandlerT } from '../../../types/types';
import MinMaxI from '../../controller/minMaxI';
import { SortValues } from '../../enums/enums';
import Cards from '../cards/cards';
import Component from '../component/component';
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

  constructor() {
    this.component = new Component();
    this.cards = new Cards();
    this.textComponent = new TextComponent();
    this.slider = new Slider();
  }

  renderMain(
    parentEl: HTMLElement,
    products: ProductsT,
    localStorageIds: string[] | null,
    minMaxAmounts: MinMaxI,
    minMaxYears: MinMaxI,
    sliderAmountHandler: SliderHandlerT,
    sliderYearHandler: SliderHandlerT
  ): void {
    const main: HTMLElement = this.component.createComponent('main', 'main', parentEl);
    const mainContainer: HTMLElement = this.component.createComponent('div', 'main__container container', main);
    const filtersSection: HTMLElement = this.component.createComponent('section', 'filters', mainContainer);

    this.productsSection = this.component.createComponent('section', 'products', mainContainer);
    this.createdCards = this.cards.renderCards(this.productsSection, products, localStorageIds);
    this.renderSort(filtersSection);
    this.slider.renderSlider(filtersSection, 'Amount', minMaxAmounts, sliderAmountHandler);
    this.slider.renderSlider(filtersSection, 'Year', minMaxYears, sliderYearHandler);
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
    const sortList = this.component.createComponent('ul', 'sort__list', this.filtersSort);
    sortValues.forEach((value) => this.textComponent.createTextComponent('li', 'sort__item', sortList, value));
  }

  getCreatedCards(): HTMLDivElement[] | undefined {
    return this.createdCards;
  }

  getSortValue() {
    return this.sortValue;
  }

  setSortValue(el: HTMLElement): void {
    this.sortValue = el;
  }
}
