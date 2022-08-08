import { HandlersT, ServerResT } from '../types/types';
import Root from './root/root';

export default class View {
  root: Root;

  constructor() {
    this.root = new Root();
  }

  async renderView(cars: ServerResT[], garageSize: number, garagePage: number, handlers: HandlersT) {
    this.root.renderRoot(cars, garageSize, garagePage, handlers);
  }
}
