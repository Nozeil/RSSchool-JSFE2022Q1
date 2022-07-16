import { ProductsT } from '../../types/types';
import AppController from '../controller/appController';
import AppView from '../view/appView';
import Main from '../view/main/main';
import AppI from './appI';

export default class App implements AppI {
  view: AppView;
  controller: AppController;

  constructor() {
    this.view = new AppView();
    this.controller = new AppController();
  }

  start() {
    this.controller.getResp((products: ProductsT): void => {
      this.controller.addIdToProducts(products);
      this.controller.setProducts(products);
      const main: Main = this.view.getMain();
      this.controller.setMain(main);
      this.view.render(
        this.controller.filterProducts(
          'cars-store-year-slider',
          'year',
          this.controller.filterProducts('cars-store-amount-slider', 'amount')
        ),
        this.controller.sortProducts(),
        this.controller.getFromLocalStorage('cars-store-products-cart'),
        this.controller.getMinMax(products, 'amount'),
        this.controller.getMinMax(products, 'year'),
        this.controller.sliderAmountHandler.bind(this.controller),
        this.controller.sliderYearHandler.bind(this.controller)
      );

      const createdCards: HTMLDivElement[] = main.getCreatedCards() as HTMLDivElement[];
      const createdCounter: HTMLElement = this.view.header.createdCounter as HTMLElement;
      this.controller.setCreatedCounter(createdCounter);
      this.controller.addToCart(createdCards, createdCounter);
      this.controller.addListenerToSortFilters(main.filtersSort, main.getSortValue(), main, createdCounter);
    });
  }
}
