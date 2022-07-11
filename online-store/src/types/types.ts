import ProductI from '../components/controller/loader/productI';

export type ProductsT = ProductI[];
export type CallbackT = (products: ProductsT) => void;
