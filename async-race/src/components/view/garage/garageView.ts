import Component from '../constructor/component/component';
import TextComponent from '../constructor/textComponent/textComponent';

export default class Garage {
  private component: Component;

  private textComponent: TextComponent;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
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

  renderGarage(containerParent: HTMLElement, garageSize: number, garagePage: number): void {
    const container = this.getGarageContainer(containerParent);
    const title = `Garage (${garageSize})`;
    const pageTitle = `Page #${garagePage}`;
    this.getTitle(container, title);
    const garage = this.getGarage(container);
    this.getPageTitle(garage, pageTitle);
  }
}
