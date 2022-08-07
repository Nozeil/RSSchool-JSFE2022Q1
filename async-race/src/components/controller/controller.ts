import Model from '../model/model';
import TextComponent from '../view/constructor/textComponent/textComponent';
import Garage from '../view/garage/garageView';
import Winners from '../view/winners/winners';
import CarAnimation from './animation/animation';

export default class Controller {
  model: Model;

  textComponent: TextComponent;

  animation: Animation;

  constructor() {
    this.model = new Model();
    this.textComponent = new TextComponent();
    this.animation = new CarAnimation();
    this.animationState = {};
  }

  async getCarsData(pageValue?: number, limitValue?: number) {
    return this.model.getCarsAndCarsCount(pageValue, limitValue);
  }

  async getWinnersButtonHandler(
    sort: 'id' | 'wins' | 'time',
    order: 'ASC' | 'DESC',
    pageValue?: number,
    limitValue?: number
  ) {
    return this.model.getWinners(sort, order, pageValue, limitValue);
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

  async createWinner(id: number, wins: number, time: number, updateState) {
    const winnerModal = this.textComponent.getTextComponent(
      'div',
      updateState.garageContainer,
      'modal',
      `Winner is ${updateState.winnerInfo.title}! Time: ${updateState.winnerInfo.time}s`
    );

    const res = await this.model.createWinner(id, wins, time);
    if (res.status === 500) {
      const winner = await this.model.getWinner(id);
      const newTime = winner.time < time ? winner.time : time;
      await this.model.updateWinner(id, (winner.wins += 1), newTime);
    }

    const timeoutTime = 5000;
    setTimeout(() => winnerModal.remove(), timeoutTime);
  }

  async deleteWinner(id: number) {
    return this.model.deleteWinner(id);
  }

  async getStartButtonHandler(id: number, carImage, startButton, endButton?, updateState?) {
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
        id,
        updateState,
        this.createWinner.bind(this)
      );
    } else {
      this.animation.animateCar(car, start, finish, duration, this.animationState, animationStateKey);
    }

    const checkDrive = await this.getDriveHandler(id);

    if (checkDrive.status === 500) {
      cancelAnimationFrame(carState.animationId);
    }
    return res.res;
  }

  async getStopButtonHandler(id: number, startButton, endButton, carImage, raceButton?) {
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
  }

  async getDriveHandler(id: number) {
    return this.model.switchCarsEngineToDriveMode(id);
  }

  async rootControlsHandler(...controls: HTMLElement[]) {
    controls.forEach((control: HTMLElement) => control.classList.toggle('hidden'));
  }

  async winnersButtonHandler(rootContainer: HTMLElement, winnersClass: Winners, handlers, updateState) {
    const { winners, winnersCount, pageValue } = await this.getWinnersButtonHandler(
      updateState.sort,
      updateState.order,
      updateState.winnersPage || 1
    );

    winnersClass.renderWinners(rootContainer, winners, winnersCount, pageValue, handlers, updateState);
  }

  async vehicleСreationButtonHandler(controls, updateState, containerParent, handlers, garage: Garage) {
    if (
      controls.vehicleCreationTextInput instanceof HTMLInputElement &&
      controls.vehicleCreationColorInput instanceof HTMLInputElement
    ) {
      const res = await this.getCreateButtonHandler(
        controls.vehicleCreationTextInput.value,
        controls.vehicleCreationColorInput.value
      );

      if (res.status === 201) {
        const controlsCopy = controls;
        controlsCopy.vehicleCreationTextInput.value = '';
        const { cars, carsCount, pageValue } = await this.getCarsData(updateState.page);

        updateState.createInputText = null;
        updateState.createInputColor = null;

        updateState.size = carsCount;
        containerParent.innerHTML = '';

        garage.renderGarage(cars, containerParent, carsCount, pageValue, handlers, updateState);
      }
    }
  }

  vehicleInputHandler(updateState, stateProp: string, input) {
    const copyUpdateState = updateState;
    copyUpdateState[stateProp] = input.value;
  }

  async vehicleUpdateControlsHandler(controls, updateState, containerParent: HTMLElement, handlers, garage: Garage) {
    const copyUpdateState = updateState;
    const copyContainerParent = containerParent;
    if (
      controls.vehicleUpdateColorInput instanceof HTMLInputElement &&
      controls.vehicleUpdateTextInput instanceof HTMLInputElement
    ) {
      const res = await this.getUpdateHandler(
        controls.vehicleUpdateTextInput.value,
        controls.vehicleUpdateColorInput.value,
        copyUpdateState.id
      );

      if (res.status === 200) {
        const { cars, carsCount, pageValue } = await this.getCarsData(copyUpdateState.page);

        copyUpdateState.updateInputText = null;
        copyUpdateState.updateInputColor = null;

        copyContainerParent.innerHTML = '';
        garage.renderGarage(cars, containerParent, carsCount, pageValue, handlers, updateState);
      }
    }
  }

  async raceStartButtonHandler(
    updateState,
    handlers,
    paginationButtons,
    raceStartButton,
    raceResetButton,
    randomVehicleGenerationButton,
    creationControls,
    vehicleUpdateControls
  ) {
    const args = {
      updateState,
      handlers,
      paginationButtons,
      raceStartButton,
      raceResetButton,
      randomVehicleGenerationButton,
      creationControls,
      vehicleUpdateControls,
    };
    args.updateState.winnerInfo = null;

    const res = await this.updateCarStatus(args.updateState, true);
    const carsControls = args.updateState.cars.map((car) => [car.selectButton, car.removeButton]).flat(1);
    const garageControls = { ...args.vehicleUpdateControls, ...args.creationControls };

    this.activateOrDeactivateControls(
      [
        args.paginationButtons.nextButton,
        args.paginationButtons.prevButton,
        args.raceStartButton,
        args.raceResetButton,
        args.randomVehicleGenerationButton,
        ...carsControls,
      ],
      true
    );

    this.activateOrDeactivateGarageControls(garageControls, true);

    if (await this.areTheRequestsSuccessful(res, 200)) {
      this.activateOrDeactivateControls(
        [args.raceResetButton, args.randomVehicleGenerationButton, ...carsControls],
        false
      );
      this.activateOrDeactivateGarageControls(args.creationControls, false);

      if (args.updateState.updateInputText || args.updateState.updateInputColor) {
        this.activateOrDeactivateGarageControls(args.vehicleUpdateControls, false);
      } else {
        this.activateOrDeactivateGarageControls(args.vehicleUpdateControls, true);
      }
      this.activateOrDeactivatePrevPaginationButton(args.paginationButtons.prevButton, updateState, updateState.page);
      this.activateOrDeactivateNextPaginationButton(
        args.paginationButtons.nextButton,
        updateState,
        updateState.page,
        updateState.size,
        updateState.limit
      );
    }
  }

  activateOrDeactivatePrevPaginationButton(prevButton: HTMLElement, updateState, page) {
    const prevButtonCopy = prevButton;
    if (prevButtonCopy instanceof HTMLButtonElement) {
      prevButtonCopy.disabled = page === updateState.firstPage;
    }
  }

  activateOrDeactivateNextPaginationButton(nextButton: HTMLElement, updateState, page, size, limit) {
    const nextButtonCopy = nextButton;
    if (nextButtonCopy instanceof HTMLButtonElement) {
      nextButtonCopy.disabled = page === updateState.getLastPage(size, limit) || !updateState.getLastPage(size, limit);
    }
  }

  activateOrDeactivateControls(controls, disabled: boolean) {
    controls.forEach((control) => {
      if (control instanceof HTMLButtonElement || control instanceof HTMLInputElement) {
        const controlCopy = control;
        controlCopy.disabled = disabled;
      }
    });
  }

  activateOrDeactivateGarageControls(controls, disabled: boolean) {
    const garageControls = Object.values(controls);
    this.activateOrDeactivateControls(garageControls, disabled);
  }

  async updateCarStatus(updateState, isStart: boolean) {
    const res = await updateState.cars.map(async (car) => {
      const resProps = isStart
        ? await this.getStartButtonHandler(car.id, car.carImage, car.startButton, car.endButton, updateState)
        : await this.getStopButtonHandler(car.id, car.startButton, car.endButton, car.carImage);
      return resProps;
    });
    return res;
  }

  async raceResetButtonHandler(updateState, raceStartButton, raceResetButton) {
    const res = await this.updateCarStatus(updateState, false);

    this.activateOrDeactivateControls([raceResetButton], true);

    if (await this.areTheRequestsSuccessful(await res, 200)) {
      this.activateOrDeactivateControls([raceStartButton], false);
    }
  }

  async areTheRequestsSuccessful(res, statusCode: number): Promise<boolean> {
    return (await Promise.all(res)).every(async (r) => (await r.status) === statusCode);
  }

  async prevButtonHandler(updateState, containerParent: HTMLElement, garage: Garage, handlers, step) {
    if (updateState.page > updateState.firstPage) {
      await this.paginationButtonHandler(updateState, containerParent, garage, handlers, step);
    }
  }

  async nextButtonHandler(updateState, containerParent: HTMLElement, garage: Garage, handlers, step) {
    if (updateState.page < updateState.getLastPage(updateState.size, updateState.limit)) {
      await this.paginationButtonHandler(updateState, containerParent, garage, handlers, step);
    }
  }

  async paginationButtonHandler(updateState, containerParent: HTMLElement, garage: Garage, handlers, step) {
    const updateStateCopy = updateState;
    const containerParentCopy = containerParent;
    updateStateCopy.page += step;
    const { cars, carsCount, pageValue } = await handlers.carsData(updateStateCopy.page);
    containerParentCopy.innerHTML = '';
    garage.renderGarage(cars, containerParentCopy, carsCount, pageValue, handlers, updateStateCopy);
  }

  async winnersPaginationButtonHandler(
    updateState,
    containerParent: HTMLElement,
    winnersClass: Winners,
    handlers,
    step: number
  ) {
    const updateStateCopy = updateState;
    const containerParentCopy = containerParent;
    updateStateCopy.winnersPage += step;
    const { winners, winnersCount, pageValue } = await this.getWinnersButtonHandler(
      updateState.sort,
      updateState.order,
      updateStateCopy.winnersPage
    );
    containerParentCopy.innerHTML = '';
    winnersClass.renderWinners(containerParentCopy, winners, winnersCount, pageValue, handlers, updateState);
  }

  async prevWinnersButtonHandler(updateState, containerParent: HTMLElement, winners: Winners, handlers, step: number) {
    if (updateState.winnersPage > updateState.firstPage) {
      await this.winnersPaginationButtonHandler(updateState, containerParent, winners, handlers, step);
    }
  }

  async nextWinnersButtonHandler(updateState, containerParent: HTMLElement, winners: Winners, handlers, step: number) {
    if (updateState.winnersPage < updateState.getLastPage(updateState.winnersSize, updateState.winnersLimit)) {
      await this.winnersPaginationButtonHandler(updateState, containerParent, winners, handlers, step);
    }
  }

  async randomVehiclesGenerationButtonHandler(containerParent: HTMLElement, garage: Garage, updateState, handlers) {
    const carBrand = [
      'Acura',
      'Alfa Romeo',
      'Alpine',
      'Apollo',
      'Apple',
      'Aston Martin',
      'Audi',
      'Automobili Pininfarina',
      'Bentley',
      'BMW',
      'Bollinger',
      'Brilliance',
      'Bugatti',
      'Buick',
      'BYD',
      'Cadillac',
      'Chana',
      'Chery',
      'Chevrolet',
      'Chrysler',
      'Citroen',
      'Continental',
      'CUPRA',
      'Dacia',
      'Daewoo',
      'Daihatsu',
      'Datsun',
      'Detroit Electric',
      'Dodge',
      'DS Automobiles',
      'FAW',
      'Ferrari',
      'Fiat',
      'Fisker',
      'Ford',
      'Foxtron',
      'Geely',
      'Genesis',
      'GMC',
      'Great Wall',
      'Haval',
      'Honda',
      'Hummer',
      'Hyundai',
      'Ineos',
      'Infiniti',
      'Iran Khodro',
      'JAC',
      'Jaguar',
      'Jeep',
      'JETOUR',
      'KIA',
      'Koenigsegg',
      'Lada',
      'Lamborghini',
      'Lancia',
      'Land Rover',
      'Lexus',
      'Lifan',
      'Lincoln',
      'Lordstown',
      'Lotus',
      'Lucid',
      'LvChi',
      'Lynk & Co',
      'Maserati',
      'Maybach',
      'Mazda',
      'MCLaren',
      'Mercedes-Benz',
      'MG',
      'MINI',
      'Mitsubishi',
      'Nikola',
      'NIO',
      'Nissan',
      'Opel',
      'Pagani',
      'Peugeot',
      'Polestar',
      'Porsche',
      'Qoros',
      'Range Rover',
      'Ravon',
      'Renault',
      'Rimac',
      'Rivian',
      'Rolls-Royce',
      'Saab',
      'Saipa',
      'SEAT',
      'Skoda',
      'smart',
      'SsangYong',
      'SSC North America',
      'Stellantis',
      'Subaru',
      'Suzuki',
      'Tata',
      'Tesla',
      'Torsus',
      'Toyota',
      'VinFast',
      'Volkswagen',
      'Volvo',
      'Xpeng',
      'Zotye',
    ];
    const carModel = [
      'Durango',
      'Ram',
      'Challenger',
      'Charger',
      'Grand Caravan',
      'X7',
      'X5',
      'X3',
      'X6 M',
      'X6',
      'X1',
      'X4',
      'C3 Aircross',
      'C5 Aircross',
      'Duster',
      'CR-V',
      'Corolla',
      'C4 Cactus',
      'DS3 Crossback',
      'C1',
      'C3',
      'Berlingo Multispace',
      'DS4 Crossback',
      'UX 250h',
      'NX 300h',
      'LC 500',
      'RX 350/200t',
      'Rapid',
      'Largus',
      'IS 200t',
      'LS 500h',
      'RX',
      'ES 200/250/350',
      'Hatchback',
      'CX-5',
      'Sedan',
      'CX-30',
      'CX-9',
      'CX-3',
      'MX-5 Roadster',
      'Phantom',
      'Camry',
      'Polo',
      'Cullinan',
      'Ghost',
      'Dawn',
      'Duster',
      'Arkana',
      'Sandero',
      'Logan',
      'Trafic Fourgon',
      'Logan MCV',
      'Captur',
      'Kadjar',
      'RAV4',
      'Rio',
      'Creta',
      'Solaris',
    ];
    const numOfRandomCars = 100;

    const randomCars = [];

    for (let i = 0; i < numOfRandomCars; i += 1) {
      const randomBrandIndex = Math.floor(Math.random() * carBrand.length);
      const randomModelIndex = Math.floor(Math.random() * carModel.length);
      const randomCarName = `${carBrand[randomBrandIndex]} ${carModel[randomModelIndex]}`;
      const colorBorder = 16777215;
      const colorRadix = 16;
      const randomColor = `#${Math.floor(Math.random() * colorBorder).toString(colorRadix)}`;
      randomCars.push({ name: randomCarName, color: randomColor });
    }

    const requests = randomCars.map((car) => this.getCreateButtonHandler(car.name, car.color));

    if (await this.areTheRequestsSuccessful(requests, 201)) {
      const containerParentCopy = containerParent;
      const { cars, carsCount, pageValue } = await this.getCarsData(updateState.page);
      containerParentCopy.innerHTML = '';
      garage.renderGarage(cars, containerParentCopy, carsCount, pageValue, handlers, updateState);
    }
  }

  async selectButtonHandler(vehicleUpdateControls, updateState, id: number) {
    const car = await this.getCarHandler(id);
    const vehicleUpdateControlsCopy = vehicleUpdateControls;
    const updateStateCopy = updateState;

    [vehicleUpdateControlsCopy.vehicleUpdateTextInput.value, vehicleUpdateControlsCopy.vehicleUpdateColorInput.value] =
      [car.name, car.color];

    [updateStateCopy.updateInputText, updateStateCopy.updateInputColor, updateStateCopy.id] = [
      car.name,
      car.color,
      car.id,
    ];

    this.activateOrDeactivateGarageControls(vehicleUpdateControls, false);
  }

  async removeButtonHandler(
    id: number,
    vehicleUpdateControls,
    updateState,
    paginationButtons,
    carContainer,
    garageTitle,
    garagePageTitle,
    handlers,
    carsClass,
    raceButtons
  ) {
    const raceButtonsCopy = raceButtons;
    raceButtonsCopy.raceStartButton.disabled = false;
    raceButtonsCopy.raceResetButton.disabled = true;

    await this.deleteWinner(id);
    const resFromGarage = await this.getDeleteHandler(id);
    const updateStateCopy = updateState;
    const paginationButtonsCopy = paginationButtons;
    const carContainerCopy = carContainer;
    const garageTitleCopy = garageTitle;
    const garagePageTitleCopy = garagePageTitle;
    const vehicleUpdateControlsCopy = vehicleUpdateControls;

    if (resFromGarage.status === 200) {
      updateStateCopy.updateInputText = null;
      updateStateCopy.updateInputColor = null;
      vehicleUpdateControlsCopy.vehicleUpdateTextInput.value = '';
      vehicleUpdateControlsCopy.vehicleUpdateColorInput.value = '#111111';
      this.activateOrDeactivateGarageControls(vehicleUpdateControlsCopy, true);

      let { cars, carsCount, pageValue } = await this.getCarsData(updateStateCopy.page);

      if (!cars.length && pageValue !== updateState.firstPage) {
        updateStateCopy.page -= 1;
        const prevPageData = await this.getCarsData(updateState.page);
        cars = prevPageData.cars;
        carsCount = prevPageData.carsCount;
        pageValue = prevPageData.pageValue;
      }

      if (!(carsCount % updateState.limit)) {
        paginationButtonsCopy.nextButton.disabled = true;
      }

      if (pageValue === updateState.firstPage) {
        paginationButtonsCopy.prevButton.disabled = true;
      }

      carContainerCopy.innerHTML = '';
      updateStateCopy.page = pageValue;
      garageTitleCopy.textContent = `Garage (${carsCount})`;
      garagePageTitleCopy.textContent = `Page #${pageValue}`;

      carsClass.renderCars(
        cars,
        garageTitleCopy,
        garagePageTitleCopy,
        vehicleUpdateControlsCopy,
        updateStateCopy,
        handlers,
        carContainerCopy,
        paginationButtonsCopy,
        raceButtons
      );
    }
  }

  async sortWinners(winnersContainer: HTMLElement, winners: Winners, handlers, updateState) {
    const updateStateCopy = updateState;
    updateStateCopy.order = updateState.order === 'ASC' ? 'DESC' : 'ASC';
    await this.winnersButtonHandler(winnersContainer, winners, handlers, updateState);
  }
}
