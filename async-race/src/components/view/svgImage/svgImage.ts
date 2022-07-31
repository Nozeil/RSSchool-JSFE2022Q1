import Component from '../constructor/component/component';

export default class SvgImageComponent extends Component {
  getSvgImage(elName: string, parentEl: HTMLElement, className: string, svg: string) {
    const el = super.getComponent(elName, parentEl, className);
    el.insertAdjacentHTML('afterbegin', svg);
    return el;
  }
}
