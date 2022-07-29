import ComponentI from './componentI';

export default class Component implements ComponentI {
  getComponent(elName: string, parentEl: HTMLElement, className: string): HTMLElement {
    const component: HTMLElement = document.createElement(elName);
    component.className = className;
    parentEl.append(component);
    return component;
  }
}
