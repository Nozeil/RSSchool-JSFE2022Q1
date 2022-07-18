import { CallbackT, ProductsT, SliderKeysT, SliderPropsT, ValueFiltersT } from '../../types/types';
import { SortValues } from '../enums/enums';
import Main from '../view/main/main';
import MinMaxI from './minMaxI';

export default interface AppControllerI {
  getResp(callback: CallbackT): void;
  addIdToProducts(products: ProductsT): void;
  addToCart(cards: HTMLDivElement[], productsCounter: HTMLElement): void;
  sortProducts(selectValue: string | SortValues, products: ProductsT): ProductsT;
  addListenerToSortFilters(
    sortFilters: HTMLElement,
    sortValue: HTMLElement,
    main: Main,
    productsCounter: HTMLElement
  ): void;
  getMinMax(products: ProductsT, prop: string): MinMaxI;
  saveToLocalStorage<T>(key: string, data: T): void;
  sliderAmountHandler<T>(values: T): void;
  sliderYearHandler<T>(values: T): void;
  sliderHandler<T>(
    key: SliderKeysT,
    prop: SliderPropsT,
    values: T,
    oppositeKey: SliderKeysT,
    oppositeProp: SliderPropsT
  ): void;
  filterProducts(key: SliderKeysT, prop: SliderPropsT, products: ProductsT): ProductsT;
  getProducts(): ProductsT;
  setProducts(products: ProductsT): void;
  setMain(main: Main): void;
  getCreatedCounter(): HTMLElement;
  getValuesForValueFilter(products: ProductsT): ValueFiltersT;
  valueFilterHandler(key: string, value: string): void;
}
