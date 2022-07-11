import { ProductsT } from '../../types/types';

export default interface AppViewI {
  render: (products: ProductsT) => void;
}
