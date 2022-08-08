import { HandlersT, ServerResT } from '../../types/types';

export default interface RootI {
  getRoot(): HTMLElement;
  getRootControls(parentEl: HTMLElement): HTMLElement;
  getGarageButton(parentEl: HTMLElement): HTMLElement;
  getWinnersButton(parentEl: HTMLElement): HTMLElement;
  renderRoot(cars: ServerResT[], garageSize: number, garagePage: number, handlers: HandlersT): Promise<void>;
}
