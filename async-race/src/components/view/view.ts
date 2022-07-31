import Root from './root/root';

export default class View {
  root: Root;

  constructor() {
    this.root = new Root();
  }

  async renderView<T>(cars, garageSize: number, garagePage: number, handlers: T) {
    this.root.renderRoot(cars, garageSize, garagePage, handlers);
  }
}
