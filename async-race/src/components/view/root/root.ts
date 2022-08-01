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
    garageButton.addEventListener('click', async () => {
      const { cars, carsCount, pageValue } = this.updateState.page
        ? await handlers.garageHandler(this.updateState.page)
        : await handlers.garageHandler();
      rootContainer.innerHTML = '';
      this.garage.renderGarage(cars, rootContainer, carsCount, pageValue, handlers, this.updateState);
    });

    const winnersButton = this.getWinnersButton(rootControls);
    winnersButton.addEventListener('click', async () => {
      const { winners, winnersCount, pageValue } = await handlers.winnersHandler();
      rootContainer.innerHTML = '';
      this.winners.renderWinners(rootContainer, winnersCount, pageValue);
    });

    this.garage.renderGarage(cars, rootContainer, garageSize, garagePage, handlers, this.updateState);
  }
}
