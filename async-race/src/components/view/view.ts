import Root from './root/root';

export default class View {
  root: Root;

  constructor() {
    this.root = new Root();
  }

  async renderView<T>(garageSize: number, garagePage: number, handlers: T) {
    this.root.renderRoot(garageSize, garagePage, handlers);
  }
}
