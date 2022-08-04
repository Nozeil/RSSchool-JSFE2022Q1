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
      firstPage: 1,
      id: null,
      createInputText: null,
      createInputColor: null,
      updateInputText: null,
      updateInputColor: null,
      winnerInfo: null,
      cars: [],
      getLastPage(): number {
        return Math.ceil(this.size / this.limit);
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

    return button;
  }

  getWinnersButton(parentEl: HTMLElement): HTMLElement {
    const button = this.textComponent.getTextComponent('button', parentEl, 'root__button', 'To winners');

    return button;
  }

  renderRoot(cars, garageSize: number, garagePage: number, handlers) {
    const root = this.getRoot();
    const rootControls = this.getRootControls(root);
    const rootContainer = this.getRootContainer(root);
    const garageButton = this.getGarageButton(rootControls);
    const winnersButton = this.getWinnersButton(rootControls);

    garageButton.addEventListener('click', () =>
      handlers.garageButtonHandler(this.updateState, rootContainer, this.garage, handlers)
    );

    winnersButton.addEventListener('click', () => handlers.winnersButtonHandler(rootContainer, this.winners));

    this.garage.renderGarage(cars, rootContainer, garageSize, garagePage, handlers, this.updateState);
  }
}
