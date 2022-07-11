import { ProductsT } from '../../../types/types';

export default interface MainI {
  renderMain: (parentEl: HTMLElement, products: ProductsT) => void;
}
