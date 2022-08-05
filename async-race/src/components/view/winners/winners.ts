import Component from '../constructor/component/component';
import TextComponent from '../constructor/textComponent/textComponent';

export default class Winners {
  private component: Component;

  private textComponent: TextComponent;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
  }

  getWinnersContainer(parentEl: HTMLElement, elName = 'div', elClassName = 'root__winners-container'): HTMLElement {
    return this.component.getComponent(elName, parentEl, elClassName);
  }

  getTitle(parentEl: HTMLElement, text: string, elName = 'h2', elClassName = 'root__title'): HTMLElement {
    return this.textComponent.getTextComponent(elName, parentEl, elClassName, text);
  }

  getPageTitle(parentEl: HTMLElement, text: string, elName = 'h3', elClassName = 'root__page-title'): HTMLElement {
    return this.textComponent.getTextComponent(elName, parentEl, elClassName, text);
  }

  getWinners(parentEl: HTMLElement, elName = 'div', elClassName = 'root__winners'): HTMLElement {
    return this.component.getComponent(elName, parentEl, elClassName);
  }

  renderWinners(container: HTMLElement, winnersSize: number, winnersPage: number): void {
    container.innerHTML = '';
    const title = `Winners (${winnersSize})`;
    const pageTitle = `Page #${winnersPage}`;
    this.getTitle(container, title);
    const garage = this.getWinners(container);
    this.getPageTitle(garage, pageTitle);
  }
}
