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
    this.controller.getProducts((products: ProductsT): void => {
      this.view.render(products);
      const main: Main = this.view.getMain();
      const createdCards: HTMLDivElement[] = main.getCreatedCards() as HTMLDivElement[];
      const createdCounter: HTMLElement = this.view.header.createdCounter as HTMLElement;
      this.controller.addToCart(createdCards, createdCounter);
    });
  }
}
