import Component from '../component/component';
import textComponentI from './textComponentI';

export default class TextComponent extends Component implements textComponentI {
  createTextComponent(el: string, elClass: string, parentEl: HTMLElement, componentText: string): HTMLElement {
    const component: HTMLElement = super.createComponent(el, elClass, parentEl);
    component.textContent = componentText;
    return component;
  }
}
