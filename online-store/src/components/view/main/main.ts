import { ProductsT } from '../../../types/types';
import ProductI from '../../controller/loader/productI';
import Component from '../component/component';
import ImgComponent from '../imgComponent/imgComponent';
import TextComponent from '../textComponent/textComponent';
import MainI from './mainI';

export default class Main implements MainI {
  component: Component;
  textComponent: TextComponent;
  imgComponent: ImgComponent;
  createdCards: HTMLDivElement[] | undefined;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
    this.imgComponent = new ImgComponent();
  }

  renderMain(parentEl: HTMLElement, products: ProductsT): void {
    const main: HTMLElement = this.component.createComponent('main', 'main', parentEl);
    const mainContainer: HTMLElement = this.component.createComponent('div', 'main__container container', main);
    const filtersSection: HTMLElement = this.component.createComponent('section', 'filters', mainContainer);
    const productsSection: HTMLElement = this.component.createComponent('section', 'products', mainContainer);
    this.createdCards = this.createCards(productsSection, products);
  }

  createCards(parentEl: HTMLElement, products: ProductsT): HTMLDivElement[] {
    const cards: HTMLDivElement[] = products.map((product: ProductI): HTMLDivElement => {
      const card: HTMLDivElement = this.component.createComponent(
        'div',
        'products__card card',
        parentEl
      ) as HTMLDivElement;
      const cardInfo: HTMLElement = this.component.createComponent('div', 'card__info', card);
      this.textComponent.createTextComponent('h3', 'card__title title', cardInfo, product.model);
      const infoList: HTMLElement = this.component.createComponent('ul', 'card__list', cardInfo);

      for (const key in product) {
        if (key !== 'image' && key !== 'model') {
          this.textComponent.createTextComponent('li', 'card__item', infoList, `${key}: ${product[key]}`);
        }
      }

      this.imgComponent.createImgComponent('card__img', card, product.image, product.model);

      return card;
    });
    return cards;
  }

  getCreatedCards(): HTMLDivElement[] | undefined {
    return this.createdCards;
  }
}
