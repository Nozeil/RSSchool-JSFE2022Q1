import Component from '../component/component';
import TextComponentI from './textComponentI';

export default class TextComponent extends Component implements TextComponentI {
  getTextComponent(elName: string, parentEl: HTMLElement, elClassName: string, text: string): HTMLElement {
    const el: HTMLElement = super.getComponent(elName, parentEl, elClassName);
    el.textContent = text;
    return el;
  }
}
