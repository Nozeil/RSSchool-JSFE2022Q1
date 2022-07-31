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
    const { cars, carsCount, pageValue } = await this.controller.getGarageButtonHandler();
    console.log(cars, carsCount, pageValue);

    this.view.renderView(cars, carsCount, pageValue, await this.exportButtonsHandlers());
  }

  async exportButtonsHandlers() {
    const garageHandler = this.controller.getGarageButtonHandler.bind(this.controller);
    const winnersHandler = this.controller.getWinnersButtonHandler.bind(this.controller);
    const createHandler = this.controller.getCreateButtonHandler.bind(this.controller);
    const carHandler = this.controller.getCarHandler.bind(this.controller);
    const updateHandler = this.controller.getUpdateHandler.bind(this.controller);
    const deleteHandler = this.controller.getDeleteHandler.bind(this.controller);
    return { garageHandler, winnersHandler, createHandler, carHandler, updateHandler, deleteHandler };
  }
}
