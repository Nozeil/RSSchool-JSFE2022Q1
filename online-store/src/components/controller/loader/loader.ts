import { CallbackT, ProductsT } from '../../../types/types';
import LoaderI from './loaderI';

export default class Loader implements LoaderI {
  private url: string;

  constructor() {
    this.url = './assets/products.json';
  }
  public async loadData(callback: CallbackT, url: string = this.url): Promise<void> {
    try {
      const res: Response = await fetch(url);
      const products: ProductsT = await res.json();
      callback(products);
    } catch (e) {
      console.error(e);
    }
  }
}
