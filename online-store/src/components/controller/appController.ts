import { CallbackT } from '../../types/types';
import Loader from './loader/loader';

export default class AppController extends Loader {
  constructor() {
    super();
  }

  getProducts(callback: CallbackT) {
    super.loadData(callback);
  }

  addToCart(cards: HTMLDivElement[], productsCounter: HTMLElement): void {
    cards.forEach((card: HTMLDivElement): void =>
      card.addEventListener('click', (e) => {
        const productCard: HTMLDivElement = (e.target as HTMLDivElement).closest('.card') as HTMLDivElement;
        let numOfProducts: number = +productsCounter.innerHTML;
        const isInCart: boolean = productCard.classList.contains('card_in-cart');
        const maxNumOfCards = 20;
        const cardTimer = 3000;

        if (numOfProducts === maxNumOfCards && !isInCart) {
          productCard.classList.add('card_notification-active');
          setTimeout(() => {
            productCard.classList.remove('card_notification-active');
          }, cardTimer);
        }

        if (!isInCart && numOfProducts < maxNumOfCards) {
          productCard.classList.add('card_in-cart');
          productsCounter.innerHTML = `${++numOfProducts}`;
        } else if (isInCart) {
          productCard.classList.remove('card_in-cart');
          productsCounter.innerHTML = `${--numOfProducts}`;
        }
      })
    );
  }
}
