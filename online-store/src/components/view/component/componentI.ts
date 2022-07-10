export default interface ComponentI {
  createComponent: (el: string, elClass: string, parentEl: HTMLElement) => void;
}
