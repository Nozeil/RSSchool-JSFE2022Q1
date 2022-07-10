export default interface textComponentI {
  createTextComponent: (el: string, elClass: string, parentEl: HTMLElement, componentText: string) => HTMLElement;
}
