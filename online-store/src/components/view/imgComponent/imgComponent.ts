import Component from '../component/component';
import ImgComponentI from './imgComponentI';

export default class ImgComponent extends Component implements ImgComponentI {
  img: string;

  constructor() {
    super();
    this.img = 'img';
  }

  createImgComponent(
    elClass: string,
    parentEl: HTMLElement,
    src: string,
    alt: string,
    el = this.img
  ): HTMLImageElement {
    const img: HTMLImageElement = super.createComponent(el, elClass, parentEl) as HTMLImageElement;
    img.src = src;
    img.alt = alt;
    return img;
  }
}
