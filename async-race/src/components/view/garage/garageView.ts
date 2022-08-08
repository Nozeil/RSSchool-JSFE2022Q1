import { ControlsT, HandlersT, ServerResT, UpdateStateT } from '../../types/types';
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
    const input = this.component.getComponent('input', parentEl, 'root__input_text');

    if (input instanceof HTMLInputElement) {
      input.type = 'text';
    }

    return input;
  }

  getVehicleCreationColorInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input_color');

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
    const input = this.component.getComponent('input', parentEl, 'root__input_text');

    if (input instanceof HTMLInputElement) {
      input.type = 'text';
      input.disabled = true;
    }

    return input;
  }

  getVehicleUpdateColorInput(parentEl: HTMLElement) {
    const input = this.component.getComponent('input', parentEl, 'root__input_color');

    if (input instanceof HTMLInputElement) {
      input.type = 'color';
      input.disabled = true;
    }

    return input;
  }

  getCreationControls(
    parentEl: HTMLElement,
    containerParent: HTMLElement,
    handlers: HandlersT,
    updateState: UpdateStateT
  ) {
    const controls = this.component.getComponent('div', parentEl, 'root__create-controls');
    const creationControls = {
      vehicleCreationButton: this.getVehicleCreationButton(controls),
      vehicleCreationTextInput: this.getVehicleCreationTextInput(controls),
      vehicleCreationColorInput: this.getVehicleCreationColorInput(controls),
    };

    if (updateState.createInputText && creationControls.vehicleCreationTextInput instanceof HTMLInputElement) {
      creationControls.vehicleCreationTextInput.value = updateState.createInputText;
    }

    if (updateState.createInputColor && creationControls.vehicleCreationColorInput instanceof HTMLInputElement) {
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

  getVehicleUpdateControls(
    parentEl: HTMLElement,
    containerParent: HTMLElement,
    handlers: HandlersT,
    updateState: UpdateStateT
  ) {
    const controls = this.component.getComponent('div', parentEl, 'root__update-controls');
    const vehicleUpdateControls = {
      vehicleUpdateButton: this.getVehicleUpdateButton(controls),
      vehicleUpdateTextInput: this.getVehicleUpdateTextInput(controls),
      vehicleUpdateColorInput: this.getVehicleUpdateColorInput(controls),
    };

    if (updateState.updateInputText && updateState.updateInputColor) {
      if (
        vehicleUpdateControls.vehicleUpdateButton instanceof HTMLButtonElement &&
        vehicleUpdateControls.vehicleUpdateColorInput instanceof HTMLInputElement &&
        vehicleUpdateControls.vehicleUpdateTextInput instanceof HTMLInputElement
      ) {
        vehicleUpdateControls.vehicleUpdateButton.disabled = false;
        vehicleUpdateControls.vehicleUpdateColorInput.disabled = false;
        vehicleUpdateControls.vehicleUpdateTextInput.disabled = false;
      }

      if (
        vehicleUpdateControls.vehicleUpdateColorInput instanceof HTMLInputElement &&
        vehicleUpdateControls.vehicleUpdateTextInput instanceof HTMLInputElement
      ) {
        vehicleUpdateControls.vehicleUpdateColorInput.value = updateState.updateInputColor;
        vehicleUpdateControls.vehicleUpdateTextInput.value = updateState.updateInputText;
      }
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
    creationControls: ControlsT,
    vehicleUpdateControls: ControlsT,
    randomCarsButton: HTMLElement,
    paginationButtons: ControlsT,
    handlers: HandlersT,
    updateState: UpdateStateT
  ) {
    const raceStartButton = this.getRaceStartButton(parentEl);
    const updateStateCopy = updateState;
    updateStateCopy.raceStartButton = raceStartButton;
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

    return { raceStartButton, raceResetButton };
  }

  getRaceStartButton(parentEl: HTMLElement) {
    return this.textComponent.getTextComponent('button', parentEl, 'root__update', 'Race');
  }

  getRaceResetButton(parentEl: HTMLElement) {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__update', 'Reset');
    if (button instanceof HTMLButtonElement) {
      button.disabled = true;
    }
    return button;
  }

  getPaginationButtons(parentEl: HTMLElement, handlers: HandlersT, updateState: UpdateStateT) {
    const pagination = this.component.getComponent('div', parentEl, 'root__pagination');
    const prevButton = this.getPaginationPrevButton(pagination, updateState, handlers);
    prevButton.addEventListener('click', () =>
      handlers.paginationPrevButtonHandler(updateState, parentEl, this, handlers, -1)
    );

    const nextButton = this.getPaginationNextButton(pagination, updateState, handlers);

    nextButton.addEventListener('click', () =>
      handlers.paginationNextButtonHandler(updateState, parentEl, this, handlers, 1)
    );
    return { prevButton, nextButton };
  }

  getPaginationPrevButton(parentEl: HTMLElement, updateState: UpdateStateT, handlers: HandlersT) {
    const prevButton = this.textComponent.getTextComponent('button', parentEl, 'root__pagination-prev', 'Prev');
    if (updateState.page) {
      handlers.activateOrDeactivatePrevPaginationButton(prevButton, updateState, updateState.page);
    }
    return prevButton;
  }

  getPaginationNextButton(parentEl: HTMLElement, updateState: UpdateStateT, handlers: HandlersT) {
    const nextButton = this.textComponent.getTextComponent('button', parentEl, 'root__pagination-next', 'Next');
    if (updateState.page && updateState.size) {
      handlers.activateOrDeactivateNextPaginationButton(
        nextButton,
        updateState,
        updateState.page,
        updateState.size,
        updateState.limit
      );
    }
    return nextButton;
  }

  getGenerateRandomCarsButton(
    parentEl: HTMLElement,
    containerParent: HTMLElement,
    updateState: UpdateStateT,
    handlers: HandlersT
  ): HTMLElement {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__generate-cars', 'Generate cars');

    button.addEventListener('click', () =>
      handlers.randomVehiclesGenerationButtonHandler(containerParent, this, updateState, handlers)
    );

    return button;
  }

  renderGarage(
    cars: ServerResT[],
    containerParent: HTMLElement,
    garageSize: number,
    garagePage: number,
    handlers: HandlersT,
    updateState: UpdateStateT
  ): HTMLElement {
    const copyUpdateState = updateState;
    copyUpdateState.size = garageSize;
    copyUpdateState.page = garagePage;

    const container = containerParent.classList.contains('root__garage-container')
      ? containerParent
      : this.getGarageContainer(containerParent);
    const titleText = `Garage (${garageSize})`;
    const pageTitleText = `Page #${garagePage}`;
    const title = this.getTitle(container, titleText);
    const garage = this.getGarage(container);
    const paginationButtons = this.getPaginationButtons(container, handlers, updateState);
    const creationControls = this.getCreationControls(garage, container, handlers, updateState);
    const vehicleUpdateControls = this.getVehicleUpdateControls(garage, container, handlers, updateState);
    const randomCarsButton = this.getGenerateRandomCarsButton(garage, container, updateState, handlers);
    const raceButtons = this.getRaceButtons(
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
      paginationButtons,
      raceButtons
    );

    return container;
  }
}
