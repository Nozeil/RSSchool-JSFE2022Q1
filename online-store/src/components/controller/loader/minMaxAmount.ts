import { ProductsT } from '../../../types/types';
import MinMaxI from '../minMaxI';
import MinMaxAmountI from './minMaxAmountI';
import ProductI from './productI';

export default class MinMaxAmount implements MinMaxAmountI {
  getMinMax(products: ProductsT, prop: string): MinMaxI {
    const productsAmounts: number[] = products.map((product: ProductI): number => +product[prop]);
    return {
      min: Math.min(...productsAmounts),
      max: Math.max(...productsAmounts),
    };
  }
}
