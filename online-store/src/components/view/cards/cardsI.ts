import { ProductsT } from '../../../types/types';

export default interface CardsI {
  renderCards: (parentEl: HTMLElement, products: ProductsT) => HTMLDivElement[];
}
