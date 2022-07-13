import Component from '../component/component';
import TextComponent from '../textComponent/textComponent';
import HeaderI from './headerI';

export default class Header implements HeaderI {
  header: Component;
  headerContainer: Component;
  headerTitle: TextComponent;
  headerCart: Component;
  headerCartCounter: TextComponent;
  createdCounter: HTMLElement | undefined;

  constructor() {
    this.header = new Component();
    this.headerContainer = new Component();
    this.headerTitle = new TextComponent();
    this.headerCart = new Component();
    this.headerCartCounter = new TextComponent();
  }

  renderHeader(parentEl: HTMLElement): void {
    const header: HTMLElement = this.header.createComponent('header', 'header', parentEl);
    const headerContainer: HTMLElement = this.headerContainer.createComponent(
      'div',
      'header__container container',
      header
    );
    this.headerTitle.createTextComponent('h1', 'header__title title', headerContainer, 'Cars Store');
    const headerCart: HTMLElement = this.headerCart.createComponent('div', 'header__cart', headerContainer);
    this.createdCounter = this.headerCartCounter.createTextComponent('span', 'header__cart-counter', headerCart, '0');
  }
}
