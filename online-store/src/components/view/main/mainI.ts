import { ProductsT, rangeHandler, SliderHandlerT, ValueFiltersT } from '../../../types/types';
import MinMaxI from '../../controller/minMaxI';
import Header from '../header/header';

export default interface MainI {
  renderMain(
    valueFilterHandler: rangeHandler,
    valueFilterValues: ValueFiltersT,
    parentEl: HTMLElement,
    products: ProductsT,
    localStorageIds: string[] | null,
    minMaxAmounts: MinMaxI,
    minMaxYears: MinMaxI,
    sliderAmountHandler: SliderHandlerT,
    sliderYearHandler: SliderHandlerT,
    header: Header
  ): void;
  getCreatedCards(): HTMLDivElement[] | undefined;
  getSortValue(): HTMLElement;
  setSortValue(el: HTMLElement): void;
}
