import { ProductsT, rangeHandler, SliderHandlerT, ValueFiltersT } from '../../types/types';
import MinMaxI from '../controller/minMaxI';
import AppViewI from './appViewI';
import Component from './component/component';
import Header from './header/header';
import Main from './main/main';
import TextComponent from './textComponent/textComponent';

export default class AppView implements AppViewI {
  component: Component;
  textComponent: TextComponent;
  header: Header;
  main: Main;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
    this.header = new Header();
    this.main = new Main();
  }

  render(
    valueFilterHandler: rangeHandler,
    _filteredProducts: ProductsT,
    valueFilterValues: ValueFiltersT,
    products: ProductsT,
    localStorageIds: string[] | null,
    minMaxAmounts: MinMaxI,
    minMaxYears: MinMaxI,
    sliderAmountHandler: SliderHandlerT,
    sliderYearHandler: SliderHandlerT
  ): void {
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
      this.header
    );

    const footer: HTMLElement = this.component.createComponent('footer', 'footer', wrapper);
    const footerContainer: HTMLElement = this.component.createComponent('div', 'footer__container container', footer);
    const githubLink: HTMLLinkElement = this.textComponent.createTextComponent(
      'a',
      'footer__link',
      footerContainer,
      'GitHub'
    ) as HTMLLinkElement;
    githubLink.href = 'https://github.com/nozeil';

    this.textComponent.createTextComponent('div', 'footer__year', footerContainer, '2022');

    const rsSchoolLink: HTMLLinkElement = this.textComponent.createTextComponent(
      'a',
      'footer__link rss-link',
      footerContainer,
      ''
    ) as HTMLLinkElement;
    rsSchoolLink.href = 'https://rs.school/js/';
  }

  getMain(): Main {
    return this.main;
  }
}
