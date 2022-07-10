import ComponentI from './componentI';

export default class Component implements ComponentI {
  createComponent(el: string, elClass: string, parentEl: HTMLElement) {
    const component: HTMLElement = document.createElement(el);
    component.className = elClass;
    parentEl.append(component);
    return component;
  }
}
