import Model from '../model/model';

export default class Controller {
  model: Model;

  constructor() {
    this.model = new Model();
  }

  async getGarageButtonHandler(pageValue?: number, limitValue?: number) {
    return this.model.getCarsAndCarsCount(pageValue, limitValue);
  }

  async getWinnersButtonHandler() {
    return this.model.getWinners();
  }

  async getCreateButtonHandler(name, color) {
    return this.model.createCar(name, color);
  }

  async getCarHandler(id: number) {
    return this.model.getCar(id);
  }

  async getUpdateHandler(name: string, color: string, id: number) {
    return this.model.updateCar(name, color, id);
  }

  async getDeleteHandler(id: number) {
    return this.model.deleteCar(id);
  }

  async getStartHandler(id: number) {
    return this.model.startCarsEngine(id);
  }

  async getDriveHandler(id: number) {
    return this.model.switchCarsEngineToDriveMode(id);
  }

  async getStopHandler(id: number) {
    return this.model.stopCarsEngine(id);
  }
}
