import { ProductsT } from '../../types/types';
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

  render(products: ProductsT, localStorageIds: string[] | null) {
    const wrapper: HTMLElement = this.component.createComponent('div', 'wrapper', document.body);
    this.header.renderHeader(wrapper, localStorageIds?.length);
    this.main.renderMain(wrapper, products, localStorageIds);

    const footer = this.component.createComponent('footer', 'footer', wrapper);
  }

  getMain(): Main {
    return this.main;
  }
}
