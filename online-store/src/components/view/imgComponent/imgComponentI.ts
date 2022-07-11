export default interface ImgComponentI {
  createImgComponent: (
    elClass: string,
    parentEl: HTMLElement,
    src: string,
    alt: string,
    el: string
  ) => HTMLImageElement;
}
