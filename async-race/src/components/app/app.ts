import Controller from '../controller/controller';
import View from '../view/view';
import AppI from './appI';

export default class App implements AppI {
  private view: View;

  private controller: Controller;

  constructor() {
    this.view = new View();
    this.controller = new Controller();
  }

  async start() {
    const { cars, carsCount, pageValue } = await this.controller.garageButtonHandler();
    console.log(cars, carsCount, pageValue);

    if (carsCount) {
      await this.view.renderView(carsCount, pageValue, await this.exportButtonsHandlers());
    }
  }

  async exportButtonsHandlers() {
    const garageHandler = this.controller.garageButtonHandler.bind(this.controller);
    const winnersHandler = this.controller.winnersButtonHandler.bind(this.controller);
    return { garageHandler, winnersHandler };
  }
}
