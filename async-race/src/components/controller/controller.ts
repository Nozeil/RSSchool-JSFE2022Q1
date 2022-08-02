import Model from '../model/model';
import CarAnimation from './animation/animation';

export default class Controller {
  model: Model;

  animation: Animation;

  constructor() {
    this.model = new Model();
    this.animation = new CarAnimation();
    this.animationState = {};
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

  async getStopHandler(id: number) {
    return this.model.stopCarsEngine(id);
  }

  async getStartButtonHandler(id: number, carImage, startButton, endButton?, updateState?) {
    try {
      startButton.disabled = true;

      const animationStateKey = `id${id}`;

      this.animationState[animationStateKey] = {
        animationId: null,
      };
      const car = carImage.firstChild;
      car.style.transform = 'translateX(0)';
      const start = car.getBoundingClientRect().x;
      const carState = this.animationState[animationStateKey];
      const res = await this.getStartHandler(id);
      const finish = document.documentElement.clientWidth - 150;
      const duration = Math.floor(res.params.distance / res.params.velocity);

      if (endButton && !updateState) {
        endButton.disabled = false;
      }
      if (updateState) {
        this.animation.animateCar(
          car,
          start,
          finish,
          duration,
          this.animationState,
          animationStateKey,
          updateState,
          id
        );
      } else {
        this.animation.animateCar(car, start, finish, duration, this.animationState, animationStateKey);
      }

      const checkDrive = await this.getDriveHandler(id);

      if (checkDrive.status === 500) {
        cancelAnimationFrame(carState.animationId);
      }
      return res.res;
    } catch (e) {
      console.log(e.message);
    }
  }

  async getStopButtonHandler(id: number, startButton, endButton, carImage, raceButton?) {
    try {
      endButton.disabled = true;

      const res = await this.getStopHandler(id);
      const animationStateKey = `id${id}`;
      const car = carImage.firstChild;

      if (raceButton) {
        raceButton.disabled = false;
      }

      if (res.status === 200) {
        const carState = this.animationState[animationStateKey];
        cancelAnimationFrame(carState.animationId);
        carState.animationId = null;
        startButton.disabled = false;
        car.style.transform = 'translateX(0)';
      }
      return res;
    } catch (e) {
      console.log(e.message);
    }
  }

  async getDriveHandler(id: number) {
    return this.model.switchCarsEngineToDriveMode(id);
  }
}
