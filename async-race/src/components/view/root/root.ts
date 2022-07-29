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

  renderRoot(garageSize: number, garagePage: number, handlers) {
    const root = this.getRoot();
    const rootControls = this.getRootControls(root);
    const rootContainer = this.getRootContainer(root);

    const garageButton = this.getGarageButton(rootControls);
    garageButton.addEventListener('click', async () => {
      const { cars, carsCount, pageValue } = await handlers.garageHandler();
      rootContainer.innerHTML = '';
      this.garage.renderGarage(rootContainer, carsCount, pageValue);
    });

    const winnersButton = this.getWinnersButton(rootControls);
    winnersButton.addEventListener('click', async () => {
      const { winners, winnersCount, pageValue } = await handlers.winnersHandler();
      rootContainer.innerHTML = '';
      this.winners.renderWinners(rootContainer, winnersCount, pageValue);
    });

    this.garage.renderGarage(rootContainer, garageSize, garagePage);
  }
}
