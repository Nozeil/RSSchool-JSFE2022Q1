import AppViewI from './appViewI';
import Component from './component/component';
import TextComponent from './textComponent/textComponent';

export default class AppView implements AppViewI {
  wrapper: Component;
  header: Component;
  headerContainer: Component;
  headerTitle: TextComponent;
  headerCart: Component;
  headerCartCounter: TextComponent;
  main: Component;
  footer: Component;

  constructor() {
    this.wrapper = new Component();
    this.header = new Component();
    this.headerContainer = new Component();
    this.headerTitle = new TextComponent();
    this.headerCart = new Component();
    this.headerCartCounter = new TextComponent();
    this.main = new Component();
    this.footer = new Component();
  }

  render() {
    const wrapper: HTMLElement = this.wrapper.createComponent('div', 'wrapper', document.body);

    const header: HTMLElement = this.header.createComponent('header', 'header', wrapper);
    const headerContainer = this.headerContainer.createComponent('div', 'header__container container', header);
    this.headerTitle.createTextComponent('h1', 'header__title title', headerContainer, 'Cars Store');
    const headerCart: HTMLElement = this.headerCart.createComponent('div', 'header__cart', headerContainer);
    this.headerCartCounter.createTextComponent('span', 'header__cart-counter', headerCart, '0');

    const main = this.main.createComponent('main', 'main', wrapper);

    const footer = this.main.createComponent('footer', 'main', wrapper);
  }
}
