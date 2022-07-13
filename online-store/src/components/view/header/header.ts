import Component from '../component/component';
import TextComponent from '../textComponent/textComponent';
import HeaderI from './headerI';

export default class Header implements HeaderI {
  component: Component;
  textComponent: TextComponent;
  createdCounter: HTMLElement | undefined;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
  }

  renderHeader(parentEl: HTMLElement): void {
    const header: HTMLElement = this.component.createComponent('header', 'header', parentEl);
    const headerContainer: HTMLElement = this.component.createComponent('div', 'header__container container', header);
    this.textComponent.createTextComponent('h1', 'header__title title', headerContainer, 'Cars Store');
    const headerCart: HTMLElement = this.component.createComponent('div', 'header__cart', headerContainer);
    this.createdCounter = this.textComponent.createTextComponent('span', 'header__cart-counter', headerCart, '0');
  }
}
