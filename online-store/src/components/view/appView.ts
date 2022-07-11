import { ProductsT } from '../../types/types';
import AppViewI from './appViewI';
import Component from './component/component';
import Header from './header/header';
import Main from './main/main';

export default class AppView implements AppViewI {
  wrapper: Component;
  header: Header;
  main: Main;
  footer: Component;

  constructor() {
    this.wrapper = new Component();
    this.header = new Header();
    this.main = new Main();
    this.footer = new Component();
  }

  render(products: ProductsT) {
    const wrapper: HTMLElement = this.wrapper.createComponent('div', 'wrapper', document.body);

    this.header.renderHeader(wrapper);
    this.main.renderMain(wrapper, products);

    const footer = this.footer.createComponent('footer', 'footer', wrapper);
  }
}
