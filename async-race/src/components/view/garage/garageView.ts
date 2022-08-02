import Cars from '../cars/cars';
import Component from '../constructor/component/component';
import TextComponent from '../constructor/textComponent/textComponent';

export default class Garage {
  private component: Component;

  private textComponent: TextComponent;

  private cars: Cars;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
    this.cars = new Cars();
  }

  getGarageContainer(parentEl: HTMLElement, elName = 'div', elClassName = 'root__garage-container'): HTMLElement {
    return this.component.getComponent(elName, parentEl, elClassName);
  }

  getTitle(parentEl: HTMLElement, text: string, elName = 'h2', elClassName = 'root__title'): HTMLElement {
    return this.textComponent.getTextComponent(elName, parentEl, elClassName, text);
  }

  getPageTitle(parentEl: HTMLElement, text: string, elName = 'h3', elClassName = 'root__page-title'): HTMLElement {
    return this.textComponent.getTextComponent(elName, parentEl, elClassName, text);
  }

  getGarage(parentEl: HTMLElement, elName = 'div', elClassName = 'root__garage'): HTMLElement {
    return this.component.getComponent(elName, parentEl, elClassName);
  }

  getCreateControls(parentEl: HTMLElement, containerParent: HTMLElement, handlers, updateState) {
    const controls = this.component.getComponent('div', parentEl, 'root__create-controls');
    const createControls = {
      createButton: this.getCreateButton(controls),
      createTextInput: this.getCreateTextInput(controls),
      createColorInput: this.getCreateColorInput(controls),
    };

    if (updateState.createInputText) {
      createControls.createTextInput.value = updateState.createInputText;
    }

    if (updateState.createInputColor) {
      createControls.createColorInput.value = updateState.createInputColor;
    }

    createControls.createButton.addEventListener('click', async () => {
      if (
        createControls.createTextInput instanceof HTMLInputElement &&
        createControls.createColorInput instanceof HTMLInputElement
      ) {
        try {
          const res = await handlers.createHandler(
            createControls.createTextInput.value,
            createControls.createColorInput.value
          );
          if ((await res.status) === 201) {
            createControls.createTextInput.value = '';
            const { cars, carsCount, pageValue } = await handlers.garageHandler(updateState.page);

            updateState.createInputText = null;
            updateState.createInputColor = null;

            updateState.size = carsCount;
            containerParent.innerHTML = '';
            this.renderGarage(cars, containerParent, carsCount, pageValue, handlers, updateState);
          }
        } catch (e) {
          console.error(e);
        }
      }
    });

    createControls.createTextInput.addEventListener('input', () => {
      updateState.createInputText = createControls.createTextInput.value;
    });

    createControls.createColorInput.addEventListener('input', () => {
      updateState.createInputColor = createControls.createColorInput.value;
    });

    return createControls;
  }

  getUpdateControls(parentEl: HTMLElement, containerParent: HTMLElement, handlers, updateState) {
    const controls = this.component.getComponent('div', parentEl, 'root__update-controls');
    const updateControls = {
      updateButton: this.getUpdateButton(controls),
      updateTextInput: this.getUpdateTextInput(controls),
      updateColorInput: this.getUpdateColorInput(controls),
    };

    if (updateState.updateInputText && updateState.updateInputColor) {
      updateControls.updateButton.disabled = false;
      updateControls.updateColorInput.disabled = false;
      updateControls.updateTextInput.disabled = false;

      updateControls.updateColorInput.value = updateState.updateInputColor;
      updateControls.updateTextInput.value = updateState.updateInputText;
    }

    updateControls.updateButton.addEventListener('click', async () => {
      try {
        if (
          updateControls.updateColorInput instanceof HTMLInputElement &&
          updateControls.updateTextInput instanceof HTMLInputElement
        ) {
          const res = await handlers.updateHandler(
            updateControls.updateTextInput.value,
            updateControls.updateColorInput.value,
            updateState.id
          );
          console.log(await res.status);
          if ((await res.status) === 200) {
            const { cars, carsCount, pageValue } = await handlers.garageHandler(updateState.page);

            updateState.updateInputText = null;
            updateState.updateInputColor = null;

            containerParent.innerHTML = '';
            this.renderGarage(cars, containerParent, carsCount, pageValue, handlers, updateState);
          }
        }
      } catch (e) {
        console.error(e);
      }
    });

    updateControls.updateColorInput.addEventListener('input', () => {
      updateState.updateInputColor = updateControls.updateColorInput.value;
    });

    updateControls.updateTextInput.addEventListener('input', () => {
      updateState.updateInputText = updateControls.updateTextInput.value;
    });

    return updateControls;
  }

  getCreateButton(parentEl: HTMLElement) {
    return this.textComponent.getTextComponent('button', parentEl, 'root__create', 'Create');
  }

  getUpdateButton(parentEl: HTMLElement) {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__update', 'Update');

    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
    }

    return button;
  }

  getUpdateTextInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'text';
      input.disabled = true;
    }

    return input;
  }

  getUpdateColorInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'color';
      input.disabled = true;
    }

    return input;
  }

  getCreateTextInput(parentEl: HTMLElement): HTMLInputElement | HTMLElement {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'text';
      return input;
    }

    return input;
  }

  getCreateColorInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'color';
    }

    return input;
  }

  getCarContainer(parentEl: HTMLElement) {
    return this.component.getComponent('div', parentEl, 'root__cars');
  }

  getRaceButtons(
    parentEl: HTMLElement,
    createControls,
    updateControls,
    randomCarsButton,
    paginationButtons,
    handlers,
    updateState
  ) {
    const raceStartButton = this.getRaceStartButton(parentEl);
    updateState.raceStartButton = raceStartButton;
    const raceResetButton = this.getRaceResetButton(parentEl);

    raceStartButton.addEventListener('click', async () => {
      updateState.winnerInfo = null;
      const res = updateState.cars.map((car) =>
        handlers.startButtonHandler(car.id, car.carImage, car.startButton, car.endButton, updateState)
      );
      paginationButtons.nextButton.disabled = true;
      paginationButtons.prevButton.disabled = true;
      raceStartButton.disabled = true;
      raceResetButton.disabled = true;
      randomCarsButton.disabled = true;

      updateState.cars.forEach(car => {
        car.endButton.disabled = true;
        car.selectButton.disabled = true;
        car.removeButton.disabled = true;
      });

      Object.values(updateControls).forEach((control) => {
        control.disabled = true;
      });

      Object.values(createControls).forEach((control) => {
        control.disabled = true;
      });

      if ((await Promise.all(res)).every(async (r) => (await r.status) === 200)) {
        raceResetButton.disabled = false;
        randomCarsButton.disabled = false;

        updateState.cars.forEach(car => {
          car.endButton.disabled = false;
          car.selectButton.disabled = false;
          car.removeButton.disabled = false;
        });

        Object.values(updateControls).forEach((control) => {
          control.disabled = false;
        });

        Object.values(createControls).forEach((control) => {
          control.disabled = false;
        });

        if (paginationButtons.prevButton instanceof HTMLButtonElement) {
          if (updateState.page === updateState.firstPage) {
            paginationButtons.prevButton.disabled = true;
          } else {
            paginationButtons.prevButton.disabled = false;
          }
        }

        if (updateState.page === updateState.getLastPage() || updateState.getLastPage() === 0) {
          paginationButtons.nextButton.disabled = true;
        } else {
          paginationButtons.nextButton.disabled = false;
        }
      }
    });

    raceResetButton.addEventListener('click', async () => {
      const res = updateState.cars.map((car) =>
        handlers.stopButtonHandler(car.id, car.startButton, car.endButton, car.carImage)
      );
      raceResetButton.disabled = true;

      if ((await Promise.all(res)).every(async (r) => (await r.status) === 200)) {
        raceStartButton.disabled = false;
      }
    });
  }

  getRaceStartButton(parentEl: HTMLElement) {
    return this.textComponent.getTextComponent('button', parentEl, 'root__update', 'Race');
  }

  getRaceResetButton(parentEl: HTMLElement) {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__update', 'Reset');
    button.disabled = true;
    return button;
  }

  getPaginationButtons(parentEl: HTMLElement, containerParent: HTMLElement, handlers, updateState) {
    const pagination = this.component.getComponent('div', parentEl, 'root__pagination');
    const prevButton = this.getPaginationPrevButton(pagination, updateState);
    prevButton.addEventListener('click', async () => {
      if (updateState.page > updateState.firstPage) {
        updateState.page -= 1;
        const { cars, carsCount, pageValue } = await handlers.garageHandler(updateState.page);
        containerParent.innerHTML = '';
        this.renderGarage(cars, containerParent, carsCount, pageValue, handlers, updateState);
      }
    });
    const nextButton = this.getPaginationNextButton(pagination, updateState);
    nextButton.addEventListener('click', async () => {
      if (updateState.page < updateState.getLastPage()) {
        updateState.page += 1;
        const { cars, carsCount, pageValue } = await handlers.garageHandler(updateState.page);
        containerParent.innerHTML = '';
        this.renderGarage(cars, containerParent, carsCount, pageValue, handlers, updateState);
      }
    });
    return { prevButton, nextButton };
  }

  getPaginationPrevButton(parentEl: HTMLElement, updateState) {
    const prevButton = this.textComponent.getTextComponent('button', parentEl, 'root__pagination-prev', 'Prev');
    if (prevButton instanceof HTMLButtonElement) {
      if (updateState.page === updateState.firstPage) {
        prevButton.disabled = true;
      } else {
        prevButton.disabled = false;
      }
    }
    return prevButton;
  }

  getPaginationNextButton(parentEl: HTMLElement, updateState) {
    const nextButton = this.textComponent.getTextComponent('button', parentEl, 'root__pagination-next', 'Next');
    if (updateState.page === updateState.getLastPage() || updateState.getLastPage() === 0) {
      nextButton.disabled = true;
    }
    return nextButton;
  }

  getGenerateRandomCarsButton(parentEl: HTMLElement, containerParent, updateState, handlers): HTMLElement {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__generate-cars', 'Generate cars');

    button.addEventListener('click', async () => {
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

      try {
        const requests = randomCars.map((car) => handlers.createHandler(car.name, car.color));
        const responses = await Promise.all(requests);

        if (responses.every(async (res) => (await res.status) === 201)) {
          const { cars, carsCount, pageValue } = await handlers.garageHandler(updateState.page);
          containerParent.innerHTML = '';
          this.renderGarage(cars, containerParent, carsCount, pageValue, handlers, updateState);
        }
      } catch (e) {
        console.error(e);
      }
    });

    return button;
  }

  renderGarage(
    cars,
    containerParent: HTMLElement,
    garageSize: number,
    garagePage: number,
    handlers,
    updateState
  ): void {
    updateState.size = garageSize;
    updateState.page = garagePage;

    const container = this.getGarageContainer(containerParent);
    const titleText = `Garage (${garageSize})`;
    const pageTitleText = `Page #${garagePage}`;
    const title = this.getTitle(container, titleText);
    const garage = this.getGarage(container);
    const paginationButtons = this.getPaginationButtons(container, containerParent, handlers, updateState);
    const createControls = this.getCreateControls(garage, containerParent, handlers, updateState);
    const updateControls = this.getUpdateControls(garage, containerParent, handlers, updateState);
    const randomCarsButton = this.getGenerateRandomCarsButton(garage, containerParent, updateState, handlers);
    this.getRaceButtons(
      garage,
      createControls,
      updateControls,
      randomCarsButton,
      paginationButtons,
      handlers,
      updateState
    );
    const pageTitle = this.getPageTitle(garage, pageTitleText);

    const carContainer = this.getCarContainer(garage);

    this.cars.renderCars(
      cars,
      title,
      pageTitle,
      updateControls,
      updateState,
      handlers,
      carContainer,
      paginationButtons
    );
  }
}
