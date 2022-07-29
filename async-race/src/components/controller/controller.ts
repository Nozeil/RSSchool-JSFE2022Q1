import Model from '../model/model';

export default class Controller {
  model: Model;

  constructor() {
    this.model = new Model();
  }

  async garageButtonHandler() {
    return this.model.getCarsAndCarsCount();
  }

  async winnersButtonHandler() {
    return this.model.getWinners();
  }
}
