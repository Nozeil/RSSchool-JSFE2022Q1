import { CallbackT, ProductsT, SliderKeysT, SliderPropsT, ValueFiltersT } from '../../types/types';
import { SortValues } from '../enums/enums';
import Main from '../view/main/main';
import MinMaxI from './minMaxI';
import Loader from './loader/loader';
import ProductI from './loader/productI';

export default class AppController extends Loader {
  cart: string[];
  sortValue: string;
  respProducts!: ProductsT;
  main!: Main;
  filteredProducts!: ProductsT;
  createdCounter!: HTMLElement;
  filteredByValue: number[] = [];
  products = [];

  constructor() {
    super();
    this.cart = this.getFromLocalStorage('cars-store-products-cart') || [];
    this.sortValue = this.getFromLocalStorage('cars-store-sort-value');
  }

  getResp(callback: CallbackT) {
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
    selectValue: string | SortValues = this.sortValue || SortValues.byNameAZ,
    products: ProductsT = this.filteredProducts
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
        this.respProducts = products;
        return this.respProducts;
    }
  }

  addListenerToSortFilters(
    sortFilters: HTMLElement,
    sortValue: HTMLElement,
    main: Main,
    productsCounter: HTMLElement
  ): void {
    if (this.sortValue) {
      sortValue.textContent = this.sortValue;
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
        const sortedPoducts = this.sortProducts(sortValue.textContent as string) as ProductsT;
        this.addToCart(
          main.cards.renderCards(
            main.productsSection,
            sortedPoducts,
            this.getFromLocalStorage('cars-store-products-cart')
          ),
          productsCounter
        );
      }
    });
  }

  getMinMax(products: ProductsT, prop: string): MinMaxI {
    const productsAmounts: number[] = products.map((product: ProductI): number => +product[prop]);
    return {
      min: Math.min(...productsAmounts),
      max: Math.max(...productsAmounts),
    };
  }

  saveToLocalStorage<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  getFromLocalStorage<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key) as string);
  }

  sliderAmountHandler<T>(values: T): void {
    this.sliderHandler('cars-store-amount-slider', 'amount', values, 'cars-store-year-slider', 'year');
  }

  sliderYearHandler<T>(values: T): void {
    this.sliderHandler('cars-store-year-slider', 'year', values, 'cars-store-amount-slider', 'amount');
  }

  sliderHandler<T>(
    key: SliderKeysT,
    prop: SliderPropsT,
    values: T,
    oppositeKey: SliderKeysT,
    oppositeProp: SliderPropsT
  ): void {
    this.saveToLocalStorage(key, values);
    this.filterProducts(key, prop);
    this.filterProducts(oppositeKey, oppositeProp, this.filteredProducts);
  }

  filterProducts(key: SliderKeysT, prop: SliderPropsT, products = this.respProducts) {
    const values: string[] = this.getFromLocalStorage(key) || Object.values(this.getMinMax(this.getProducts(), prop));
    const copyProducts = products;
    const [min, max] = values;

    this.filteredProducts = copyProducts.filter((product) => +product[prop] >= +min && +product[prop] <= +max);

    if (this.getCreatedCounter()) {
      this.filteredProducts = this.sortProducts(this.main.getSortValue().textContent as string);
      this.addToCart(
        this.main.cards.renderCards(
          this.main.productsSection,
          this.filteredProducts,
          this.getFromLocalStorage('cars-store-products-cart')
        ),
        this.getCreatedCounter()
      );
    }

    return this.filteredProducts;
  }

  getProducts() {
    return this.respProducts;
  }

  setProducts(products: ProductsT) {
    this.respProducts = products;
  }

  setMain(main: Main) {
    this.main = main;
  }

  getCreatedCounter(): HTMLElement {
    return this.createdCounter;
  }

  setCreatedCounter(counter: HTMLElement): void {
    this.createdCounter = counter;
  }

  getValuesForValueFilter(products: ProductsT): ValueFiltersT {
    const result: ValueFiltersT = {
      manufacturer: new Set(),
      transmission: new Set(),
      color: new Set(),
      popular: new Set(),
    };
    products.forEach((product) => {
      result.manufacturer.add(product.manufacturer);
      result.color.add(product.color);
      result.transmission.add(product.transmission);
    });
    result.popular.add('yes');
    if (!this.getFromLocalStorage('cars-store-value-filters')) {
      this.saveToLocalStorage(
        'cars-store-value-filters',
        Object.keys(result).reduce((prev, curr) => {
          prev[curr] = [];
          return prev;
        }, <{ [s: string]: [] }>{})
      );
    }
    return result;
  }

  valueFilterHandler(key?, value?) {
    let storageValueFilters = this.getFromLocalStorage('cars-store-value-filters');

    !storageValueFilters[key].includes(value)
      ? storageValueFilters[key].push(value)
      : (storageValueFilters[key] = storageValueFilters[key].filter((item) => item !== value));

    this.saveToLocalStorage('cars-store-value-filters', storageValueFilters);

    this.filteredByValue = [];
    let tempProducts = [];

    for (const filterKey in storageValueFilters) {
      if (!this.filteredByValue.length) {
        storageValueFilters[filterKey].forEach((f) => {
          tempProducts.push(...this.filteredProducts.filter((product) => product[filterKey] === f));
        });
        this.filteredByValue.push(...tempProducts);
        tempProducts = [];
      } else {
        if (storageValueFilters[filterKey].length) {
          storageValueFilters[filterKey].forEach((f) => {
            tempProducts.push(...this.filteredByValue.filter((product) => product[filterKey] === f));
          });
          this.filteredByValue = [...tempProducts];
          tempProducts = [];
        }
      } 
    }

    if (!this.filteredByValue.length) this.filteredByValue = this.filteredProducts;

    if (this.getCreatedCounter()) {
      this.filteredByValue = this.sortProducts(this.main.getSortValue().textContent as string, this.filteredByValue);
      this.addToCart(
        this.main.cards.renderCards(
          this.main.productsSection,
          this.filteredByValue,
          this.getFromLocalStorage('cars-store-products-cart')
        ),
        this.getCreatedCounter()
      );
    }
  }
}
