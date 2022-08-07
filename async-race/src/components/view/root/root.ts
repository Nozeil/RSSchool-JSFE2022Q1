import TextComponent from '../constructor/textComponent/textComponent';
import Component from '../constructor/component/component';
import RootI from './rootI';
import Garage from '../garage/garageView';
import Winners from '../winners/winners';

export default class Root implements RootI {
  private component: Component;

  private textComponent: TextComponent;

  private garage: Garage;

  private winners: Winners;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
    this.garage = new Garage();
    this.winners = new Winners();
    this.updateState = {
      size: null,
      limit: 7,
      page: null,
      winnersLimit: 10,
      firstPage: 1,
      winnersPage: null,
      winnersSize: null,
      sort: 'id',
      order: 'ASC',
      id: null,
      createInputText: null,
      createInputColor: null,
      updateInputText: null,
      updateInputColor: null,
      winnerInfo: null,
      cars: [],
      garageContainer: null,
      getLastPage(size: number, limit: number): number {
        return Math.ceil(size / limit);
      },
    };
  }

  getRoot(): HTMLElement {
    return this.component.getComponent('div', document.body, 'root');
  }

  getRootControls(parentEl: HTMLElement): HTMLElement {
    return this.component.getComponent('div', parentEl, 'root__controls');
  }

  getRootContainer(parentEl: HTMLElement): HTMLElement {
    return this.component.getComponent('div', parentEl, 'root__container');
  }

  getGarageButton(parentEl: HTMLElement): HTMLElement {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__button', 'To garage');
    button.disabled = true;
    return button;
  }

  getWinnersButton(parentEl: HTMLElement): HTMLElement {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__button', 'To winners');

    return button;
  }

  async renderRoot(cars, garageSize: number, garagePage: number, handlers) {
    const root = this.getRoot();
    const rootControls = this.getRootControls(root);
    const rootContainer = this.getRootContainer(root);

    const garageButton = this.getGarageButton(rootControls);
    const winnersButton = this.getWinnersButton(rootControls);
    const winnersContainer = this.component.getComponent('div', rootContainer, 'root__winners-container hidden');

    const garageContainer = this.garage.renderGarage(
      cars,
      rootContainer,
      garageSize,
      garagePage,
      handlers,
      this.updateState
    );

    this.updateState.garageContainer = garageContainer;

    garageButton.addEventListener('click', () => {
      winnersButton.disabled = false;
      garageButton.disabled = true;
      handlers.rootControlsHandler(garageContainer, winnersContainer);
    });

    winnersButton.addEventListener('click', () => {
      winnersButton.disabled = true;
      garageButton.disabled = false;
      handlers.rootControlsHandler(garageContainer, winnersContainer);
      handlers.winnersButtonHandler(winnersContainer, this.winners, handlers, this.updateState);
    });
  }
}
