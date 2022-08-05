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

  getVehicleCreationButton(parentEl: HTMLElement) {
    return this.textComponent.getTextComponent('button', parentEl, 'root__create', 'Create');
  }

  getVehicleCreationTextInput(parentEl: HTMLElement): HTMLInputElement | HTMLElement {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'text';
      return input;
    }

    return input;
  }

  getVehicleCreationColorInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'color';
    }

    return input;
  }

  getVehicleUpdateButton(parentEl: HTMLElement) {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__update', 'Update');

    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
    }

    return button;
  }

  getVehicleUpdateTextInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'text';
      input.disabled = true;
    }

    return input;
  }

  getVehicleUpdateColorInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input');

    if (input instanceof HTMLInputElement) {
      input.type = 'color';
      input.disabled = true;
    }

    return input;
  }

  getCreationControls(parentEl: HTMLElement, containerParent: HTMLElement, handlers, updateState) {
    const controls = this.component.getComponent('div', parentEl, 'root__create-controls');
    const creationControls = {
      vehicleCreationButton: this.getVehicleCreationButton(controls),
      vehicleCreationTextInput: this.getVehicleCreationTextInput(controls),
      vehicleCreationColorInput: this.getVehicleCreationColorInput(controls),
    };

    if (updateState.createInputText) {
      creationControls.vehicleCreationTextInput.value = updateState.createInputText;
    }

    if (updateState.createInputColor) {
      creationControls.vehicleCreationColorInput.value = updateState.createInputColor;
    }

    creationControls.vehicleCreationButton.addEventListener('click', () =>
      handlers.vehicleСreationButtonHandler(creationControls, updateState, containerParent, handlers, this)
    );

    creationControls.vehicleCreationTextInput.addEventListener('input', () =>
      handlers.vehicleInputHandler(updateState, 'createInputText', creationControls.vehicleCreationTextInput)
    );

    creationControls.vehicleCreationColorInput.addEventListener('input', () =>
      handlers.vehicleInputHandler(updateState, 'createInputColor', creationControls.vehicleCreationColorInput)
    );

    return creationControls;
  }

  getVehicleUpdateControls(parentEl: HTMLElement, containerParent: HTMLElement, handlers, updateState) {
    const controls = this.component.getComponent('div', parentEl, 'root__update-controls');
    const vehicleUpdateControls = {
      vehicleUpdateButton: this.getVehicleUpdateButton(controls),
      vehicleUpdateTextInput: this.getVehicleUpdateTextInput(controls),
      vehicleUpdateColorInput: this.getVehicleUpdateColorInput(controls),
    };

    if (updateState.updateInputText && updateState.updateInputColor) {
      vehicleUpdateControls.vehicleUpdateButton.disabled = false;
      vehicleUpdateControls.vehicleUpdateColorInput.disabled = false;
      vehicleUpdateControls.vehicleUpdateTextInput.disabled = false;

      vehicleUpdateControls.vehicleUpdateColorInput.value = updateState.updateInputColor;
      vehicleUpdateControls.vehicleUpdateTextInput.value = updateState.updateInputText;
    }

    vehicleUpdateControls.vehicleUpdateButton.addEventListener('click', () =>
      handlers.vehicleUpdateControlsHandler(vehicleUpdateControls, updateState, containerParent, handlers, this)
    );

    vehicleUpdateControls.vehicleUpdateColorInput.addEventListener('input', () =>
      handlers.vehicleInputHandler(updateState, 'updateInputColor', vehicleUpdateControls.vehicleUpdateColorInput)
    );

    vehicleUpdateControls.vehicleUpdateTextInput.addEventListener('input', () =>
      handlers.vehicleInputHandler(updateState, 'updateInputText', vehicleUpdateControls.vehicleUpdateTextInput)
    );

    return vehicleUpdateControls;
  }

  getCarContainer(parentEl: HTMLElement) {
    return this.component.getComponent('div', parentEl, 'root__cars');
  }

  getRaceButtons(
    parentEl: HTMLElement,
    creationControls,
    vehicleUpdateControls,
    randomCarsButton,
    paginationButtons,
    handlers,
    updateState
  ) {
    const raceStartButton = this.getRaceStartButton(parentEl);
    updateState.raceStartButton = raceStartButton;
    const raceResetButton = this.getRaceResetButton(parentEl);

    raceStartButton.addEventListener('click', () =>
      handlers.raceStartButtonHandler(
        updateState,
        handlers,
        paginationButtons,
        raceStartButton,
        raceResetButton,
        randomCarsButton,
        creationControls,
        vehicleUpdateControls
      )
    );

    raceResetButton.addEventListener('click', () =>
      handlers.raceResetButtonHandler(updateState, raceStartButton, raceResetButton)
    );
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
    const prevButton = this.getPaginationPrevButton(pagination, updateState, handlers);

    prevButton.addEventListener('click', () =>
      handlers.paginationPrevButtonHandler(updateState, containerParent, this, handlers, -1)
    );

    const nextButton = this.getPaginationNextButton(pagination, updateState, handlers);

    nextButton.addEventListener('click', () =>
      handlers.paginationNextButtonHandler(updateState, containerParent, this, handlers, 1)
    );
    return { prevButton, nextButton };
  }

  getPaginationPrevButton(parentEl: HTMLElement, updateState, handlers) {
    const prevButton = this.textComponent.getTextComponent('button', parentEl, 'root__pagination-prev', 'Prev');
    handlers.activateOrDeactivatePrevPaginationButton(prevButton, updateState);
    return prevButton;
  }

  getPaginationNextButton(parentEl: HTMLElement, updateState, handlers) {
    const nextButton = this.textComponent.getTextComponent('button', parentEl, 'root__pagination-next', 'Next');
    handlers.activateOrDeactivateNextPaginationButton(nextButton, updateState, handlers);
    return nextButton;
  }

  getGenerateRandomCarsButton(parentEl: HTMLElement, containerParent: HTMLElement, updateState, handlers): HTMLElement {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__generate-cars', 'Generate cars');

    button.addEventListener('click', () =>
      handlers.randomVehiclesGenerationButtonHandler(containerParent, this, updateState, handlers)
    );

    return button;
  }

  renderGarage(
    cars,
    containerParent: HTMLElement,
    garageSize: number,
    garagePage: number,
    handlers,
    updateState
  ): HTMLElement {
    updateState.size = garageSize;
    updateState.page = garagePage;

    const container = this.getGarageContainer(containerParent);
    const titleText = `Garage (${garageSize})`;
    const pageTitleText = `Page #${garagePage}`;
    const title = this.getTitle(container, titleText);
    const garage = this.getGarage(container);
    const paginationButtons = this.getPaginationButtons(container, containerParent, handlers, updateState);
    const creationControls = this.getCreationControls(garage, container, handlers, updateState);
    const vehicleUpdateControls = this.getVehicleUpdateControls(garage, containerParent, handlers, updateState);
    const randomCarsButton = this.getGenerateRandomCarsButton(garage, containerParent, updateState, handlers);
    this.getRaceButtons(
      garage,
      creationControls,
      vehicleUpdateControls,
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
      vehicleUpdateControls,
      updateState,
      handlers,
      carContainer,
      paginationButtons
    );

    return container;
  }
}
