import ProductI from '../components/controller/loader/productI';
import * as noUiSlider from 'nouislider';

export type ProductsT = ProductI[];
export type CallbackT = (products: ProductsT) => void;
export type SliderHandlerT = (
  this: noUiSlider.API,
  values: (string | number)[],
  handleNumber: number,
  unencoded: number[],
  tap: boolean,
  locations: number[],
  slider: noUiSlider.API
) => void;
export type SliderKeysT = 'cars-store-amount-slider' | 'cars-store-year-slider';
export type SliderPropsT = 'amount' | 'year';
export type ValueFiltersT = { [s: string]: Set<string> };
export type storageValueFiltersT = { [s: string]: string[] };
export type rangeHandler = (key: string, value: string) => void;
