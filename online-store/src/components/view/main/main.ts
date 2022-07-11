import { ProductsT } from '../../../types/types';
import ProductI from '../../controller/loader/productI';
import Component from '../component/component';
import ImgComponent from '../imgComponent/imgComponent';
import TextComponent from '../textComponent/textComponent';
import MainI from './mainI';

export default class Main implements MainI {
  main: Component;
  mainContainer: Component;
  filtersSections: Component;
  productsSections: Component;
  card: Component;
  cardInfo: Component;
  cardTitle: TextComponent;
  infoList: Component;
  infoListItem: TextComponent;
  cardImg: ImgComponent;

  constructor() {
    this.main = new Component();
    this.mainContainer = new Component();
    this.filtersSections = new Component();
    this.productsSections = new Component();
    this.card = new Component();
    this.cardInfo = new Component();
    this.cardTitle = new TextComponent();
    this.infoList = new Component();
    this.infoListItem = new TextComponent();
    this.cardImg = new ImgComponent();
  }

  renderMain(parentEl: HTMLElement, products: ProductsT): void {
    const main: HTMLElement = this.main.createComponent('main', 'main', parentEl);
    const mainContainer: HTMLElement = this.mainContainer.createComponent('div', 'main__container container', main);
    const filtersSection: HTMLElement = this.filtersSections.createComponent('section', 'filters', mainContainer);
    const productsSection: HTMLElement = this.productsSections.createComponent('section', 'products', mainContainer);
    console.log(this.createCards(productsSection, products));
  }

  createCards(parentEl: HTMLElement, products: ProductsT): HTMLElement[] {
    const cards: HTMLElement[] = products.map((product: ProductI): HTMLElement => {
      const card: HTMLElement = this.card.createComponent('div', 'products__card card', parentEl);
      const cardInfo: HTMLElement = this.cardInfo.createComponent('div', 'card__info', card);
      this.cardTitle.createTextComponent('h3', 'card__title title', cardInfo, product.model);
      const infoList: HTMLElement = this.infoList.createComponent('ul', 'card__list', cardInfo);

      for (const key in product) {
        if (key !== 'image' && key !== 'model') {
          this.infoListItem.createTextComponent('li', 'card__item', infoList, `${key}: ${product[key]}`);
        }
      }

      this.cardImg.createImgComponent('card__img', card, product.image, product.model);

      return card;
    });
    return cards;
  }
}
