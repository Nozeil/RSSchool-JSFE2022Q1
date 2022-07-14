import { CallbackT, ProductsT } from '../../types/types';
import { SortValues } from '../enums/enums';
import Main from '../view/main/main';
import Loader from './loader/loader';
import ProductI from './loader/productI';

export default class AppController extends Loader {
  cart: string[];
  sortValue: string;

  constructor() {
    super();
    this.cart = this.getFromLocalStorage('cars-store-products-cart') || [];
    this.sortValue = this.getFromLocalStorage('cars-store-sort-value');
  }

  getProducts(callback: CallbackT) {
    super.loadData(callback);
  }

  addIdToProducts(products: ProductsT) {
    products.forEach((product, index) => (product.id = `${index}`));
  }

  addToCart(cards: HTMLDivElement[], productsCounter: HTMLElement): void {
    cards.forEach((card: HTMLDivElement): void =>
      card.addEventListener('click', (e) => {
        const productCard: HTMLDivElement = (e.target as HTMLDivElement).closest('.card') as HTMLDivElement;
        const productCardId: string = productCard.dataset.id as string;
        const isInCart: boolean = productCard.classList.contains('card_in-cart');
        const maxNumOfCards = 20;
        const cardTimer = 3000;

        if (this.cart.length === maxNumOfCards && !isInCart) {
          productCard.classList.add('card_notification-active');
          setTimeout(() => {
            productCard.classList.remove('card_notification-active');
          }, cardTimer);
        }

        if (!isInCart && this.cart.length < maxNumOfCards) {
          productCard.classList.add('card_in-cart');
          this.cart.push(productCardId);
          productsCounter.innerHTML = `${this.cart.length}`;
        } else if (isInCart) {
          productCard.classList.remove('card_in-cart');
          this.cart = this.cart.filter((productId: string): boolean => productId !== productCardId);
          productsCounter.innerHTML = `${this.cart.length}`;
        }
        this.saveToLocalStorage('cars-store-products-cart', this.cart);
      })
    );
  }

  sortProducts(
    products: ProductsT,
    selectValue: SortValues | string = this.sortValue || SortValues.byNameAZ
  ): ProductsT {
    const copyProducts = [...products];
    switch (selectValue) {
      case SortValues.byNameAZ:
        return copyProducts.sort((a: ProductI, b: ProductI): number => {
          if (a.model > b.model) return 1;
          if (a.model < b.model) return -1;
          return 0;
        });
      case SortValues.byNameZA:
        return copyProducts.sort((a: ProductI, b: ProductI): number => {
          if (a.model < b.model) return 1;
          if (a.model > b.model) return -1;
          return 0;
        });
      case SortValues.byYearAscending:
        return copyProducts.sort((a: ProductI, b: ProductI): number => +a.year - +b.year);
      case SortValues.byYearDescending:
        return copyProducts.sort((a: ProductI, b: ProductI): number => +b.year - +a.year);
      default:
        return products;
    }
  }

  addListenerToSortFilters(
    sortFilters: HTMLElement,
    sortValue: HTMLElement,
    products: ProductsT,
    main: Main,
    productsCounter: HTMLElement
  ): void {
    if (this.sortValue) {
      sortValue.textContent = this.sortValue;
      this.sortProducts(products, sortValue.textContent as string) as ProductsT;
    }
    sortFilters.addEventListener('click', (e: MouseEvent): void => {
      const target: HTMLElement = e.target as HTMLElement;
      if (target.classList.contains('sort__value')) {
        sortFilters.classList.toggle('sort_active');
      }
      if (target.classList.contains('sort__item')) {
        sortFilters.classList.toggle('sort_active');
        sortValue.textContent = target.textContent;
        this.saveToLocalStorage('cars-store-sort-value', sortValue.textContent as string);
        this.addToCart(
          main.cards.renderCards(
            main.productsSection,
            this.sortProducts(products, sortValue.textContent as string) as ProductsT,
            this.getFromLocalStorage('cars-store-products-cart')
          ),
          productsCounter
        );
      }
    });
  }

  saveToLocalStorage(key: string, data: string[] | string) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key) as string);
  }
}
