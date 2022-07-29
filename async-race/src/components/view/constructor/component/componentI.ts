export default interface ComponentI {
  getComponent(elName: string, parentEl: HTMLElement, className: string): HTMLElement;
}
