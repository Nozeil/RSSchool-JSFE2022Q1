export default interface RootI {
  getRoot(): HTMLElement;
  getRootControls(parentEl: HTMLElement): HTMLElement;
  getGarageButton(parentEl: HTMLElement): HTMLElement;
  getWinnersButton(parentEl: HTMLElement): HTMLElement;
  renderRoot(garageSize: number, garagePage: number): void;
}
