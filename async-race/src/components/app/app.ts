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
    const { cars, carsCount, pageValue } = await this.controller.getCarsData();

    this.view.renderView(cars, carsCount, pageValue, await this.exportButtonsHandlers());
  }

  async exportButtonsHandlers() {
    const carsData = this.controller.getCarsData.bind(this.controller);
    const createHandler = this.controller.getCreateButtonHandler.bind(this.controller);
    const garageButtonHandler = this.controller.garageButtonHandler.bind(this.controller);
    const vehicleInputHandler = this.controller.vehicleInputHandler.bind(this.controller);
    const winnersButtonHandler = this.controller.winnersButtonHandler.bind(this.controller);
    const vehicleСreationButtonHandler = this.controller.vehicleСreationButtonHandler.bind(this.controller);
    const carHandler = this.controller.getCarHandler.bind(this.controller);
    const vehicleUpdateControlsHandler = this.controller.vehicleUpdateControlsHandler.bind(this.controller);
    const deleteHandler = this.controller.getDeleteHandler.bind(this.controller);
    const startButtonHandler = this.controller.getStartButtonHandler.bind(this.controller);
    const stopButtonHandler = this.controller.getStopButtonHandler.bind(this.controller);
    const raceStartButtonHandler = this.controller.raceStartButtonHandler.bind(this.controller);
    const raceResetButtonHandler = this.controller.raceResetButtonHandler.bind(this.controller);
    const paginationNextButtonHandler = this.controller.nextButtonHandler.bind(this.controller);
    const paginationPrevButtonHandler = this.controller.prevButtonHandler.bind(this.controller);
    const activateOrDeactivateNextPaginationButton = this.controller.activateOrDeactivateNextPaginationButton.bind(
      this.controller
    );
    const activateOrDeactivatePrevPaginationButton = this.controller.activateOrDeactivatePrevPaginationButton.bind(
      this.controller
    );
    const randomVehiclesGenerationButtonHandler = this.controller.randomVehiclesGenerationButtonHandler.bind(
      this.controller
    );
    const selectButtonHandler = this.controller.selectButtonHandler.bind(this.controller);
    const removeButtonHandler = this.controller.removeButtonHandler.bind(this.controller);
    return {
      createHandler,
      carsData,
      garageButtonHandler,
      vehicleInputHandler,
      winnersButtonHandler,
      vehicleСreationButtonHandler,
      carHandler,
      vehicleUpdateControlsHandler,
      deleteHandler,
      startButtonHandler,
      stopButtonHandler,
      raceStartButtonHandler,
      raceResetButtonHandler,
      paginationNextButtonHandler,
      paginationPrevButtonHandler,
      activateOrDeactivateNextPaginationButton,
      activateOrDeactivatePrevPaginationButton,
      randomVehiclesGenerationButtonHandler,
      selectButtonHandler,
      removeButtonHandler,
    };
  }
}
