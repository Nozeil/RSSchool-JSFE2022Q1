import { ProductsT } from '../../../types/types';
import ProductI from '../../controller/loader/productI';
import Component from '../component/component';
import ImgComponent from '../imgComponent/imgComponent';
import TextComponent from '../textComponent/textComponent';
import CardsI from './cardsI';

export default class Cards implements CardsI {
  component: Component;
  textComponent: TextComponent;
  imgComponent: ImgComponent;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
    this.imgComponent = new ImgComponent();
  }

  renderCards(parentEl: HTMLElement, products: ProductsT, localStorageIds: string[] | null): HTMLDivElement[] {
    parentEl.innerHTML = '';
    const cards: HTMLDivElement[] = products.map((product: ProductI): HTMLDivElement => {
      const card: HTMLDivElement = this.component.createComponent(
        'div',
        'products__card card',
        parentEl
      ) as HTMLDivElement;
      if (localStorageIds?.includes(`${product.id}`)) card.classList.add('card_in-cart');
      card.setAttribute('data-id', product.id);
      const cardInfo: HTMLElement = this.component.createComponent('div', 'card__info', card);
      this.textComponent.createTextComponent('h3', 'card__title title', cardInfo, product.model);
      const infoList: HTMLElement = this.component.createComponent('ul', 'card__list', cardInfo);

      for (const key in product) {
        if (key !== 'image' && key !== 'model' && key !== 'id') {
          this.textComponent.createTextComponent('li', 'card__item', infoList, `${key}: ${product[key]}`);
        }
      }

      this.imgComponent.createImgComponent('card__img', card, product.image, product.model);

      return card;
    });
    return cards;
  }
}
