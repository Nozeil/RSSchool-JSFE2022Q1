import { ProductsT } from '../../../types/types';
import Cards from '../cards/cards';
import Component from '../component/component';
import MainI from './mainI';

export default class Main implements MainI {
  component: Component;
  cards: Cards;
  createdCards: HTMLDivElement[] | undefined;

  constructor() {
    this.component = new Component();
    this.cards = new Cards();
  }

  renderMain(parentEl: HTMLElement, products: ProductsT): void {
    const main: HTMLElement = this.component.createComponent('main', 'main', parentEl);
    const mainContainer: HTMLElement = this.component.createComponent('div', 'main__container container', main);
    const filtersSection: HTMLElement = this.component.createComponent('section', 'filters', mainContainer);
    const productsSection: HTMLElement = this.component.createComponent('section', 'products', mainContainer);
    this.createdCards = this.cards.renderCards(productsSection, products);
  }

  getCreatedCards(): HTMLDivElement[] | undefined {
    return this.createdCards;
  }
}
