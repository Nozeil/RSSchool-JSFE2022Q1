import { ProductsT, rangeHandler, SliderHandlerT, ValueFiltersT } from '../../types/types';
import MinMaxI from '../controller/minMaxI';
import Main from './main/main';

export default interface AppViewI {
  render: (
    valueFilterHandler: rangeHandler,
    _filteredProducts: ProductsT,
    valueFilterValues: ValueFiltersT,
    products: ProductsT,
    localStorageIds: string[] | null,
    minMaxAmounts: MinMaxI,
    minMaxYears: MinMaxI,
    sliderAmountHandler: SliderHandlerT,
    sliderYearHandler: SliderHandlerT
  ) => void;
  getMain(): Main;
}
