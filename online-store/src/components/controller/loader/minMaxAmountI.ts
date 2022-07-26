import { ProductsT } from '../../../types/types';
import MinMaxI from '../minMaxI';

export default interface MinMaxAmountI {
  getMinMax(products: ProductsT, prop: string): MinMaxI;
}
