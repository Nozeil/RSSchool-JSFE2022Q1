import { ProductsT, SliderHandlerT } from '../../types/types';
import MinMaxI from '../controller/minMaxI';
import AppViewI from './appViewI';
import Component from './component/component';
import Header from './header/header';
import Main from './main/main';

export default class AppView implements AppViewI {
  component: Component;
  header: Header;
  main: Main;

  constructor() {
    this.component = new Component();
    this.header = new Header();
    this.main = new Main();
  }

  render(
    valueFilterHandler,
    _filteredProducts: ProductsT,
    valueFilterValues,
    products: ProductsT,
    localStorageIds: string[] | null,
    minMaxAmounts: MinMaxI,
    minMaxYears: MinMaxI,
    sliderAmountHandler: SliderHandlerT,
    sliderYearHandler: SliderHandlerT,
    controller
  ) {
    const wrapper: HTMLElement = this.component.createComponent('div', 'wrapper', document.body);
    this.header.renderHeader(wrapper, localStorageIds?.length);
    this.main.renderMain(
      valueFilterHandler,
      valueFilterValues,
      wrapper,
      products,
      localStorageIds,
      minMaxAmounts,
      minMaxYears,
      sliderAmountHandler,
      sliderYearHandler,
      this.header,
      controller
    );

    const footer = this.component.createComponent('footer', 'footer', wrapper);
  }

  getMain(): Main {
    return this.main;
  }
}
