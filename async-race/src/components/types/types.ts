import Cars from '../view/cars/cars';
import Garage from '../view/garage/garageView';
import Winners from '../view/winners/winners';

export type ServerResT = {
  [s: string]: string | number;
};
export type AnimationStateT = { [s: string]: { animationId: null | number } };
export type SortT = 'id' | 'wins' | 'time';
export type OrderT = 'ASC' | 'DESC';
export type UpdateStateT = {
  size: null | number;
  limit: 7;
  page: null | number;
  winnersLimit: 10;
  firstPage: 1;
  winnersPage: null | number;
  winnersSize: null | number;
  sort: SortT;
  order: OrderT;
  id: null | number;
  createInputText: null | string;
  createInputColor: null | string;
  updateInputText: null | string;
  updateInputColor: null | string;
  winnerInfo: null | ServerResT;
  cars: {
    title: string;
    carImage: HTMLElement;
    startButton: HTMLElement;
    endButton: HTMLElement;
    selectButton: HTMLElement;
    removeButton: HTMLElement;
    id: number;
  }[];
  garageContainer: null | HTMLElement;
  getLastPage: (size: number, limit: number) => number;
  raceStartButton: null | HTMLElement;
};

export type getCarsT = {
  cars: { [s: string]: string }[];
  carsCount: number;
  pageValue: number;
};

export type StatePropT = 'createInputText' | 'createInputColor' | 'updateInputText' | 'updateInputColor';

export type ControlsT = {
  [s: string]: HTMLElement;
};

export type HandlersT = {
  createHandler: (name: string, color: string) => Promise<Response>;
  carsData: (pageValue?: number | undefined, limitValue?: number | undefined) => Promise<getCarsT>;
  rootControlsHandler: (...controls: HTMLElement[]) => Promise<void>;
  vehicleInputHandler: (
    updateState: UpdateStateT,
    stateProp: StatePropT,
    input: HTMLElement | HTMLInputElement
  ) => void;
  winnersButtonHandler: (
    rootContainer: HTMLElement,
    winnersClass: Winners,
    handlers: HandlersT,
    updateState: UpdateStateT
  ) => Promise<void>;
  vehicleСreationButtonHandler: (
    controls: ControlsT,
    updateState: UpdateStateT,
    containerParent: HTMLElement,
    handlers: HandlersT,
    garage: Garage
  ) => Promise<void>;
  carHandler: (id: number) => Promise<ServerResT>;
  vehicleUpdateControlsHandler: (
    controls: ControlsT,
    updateState: UpdateStateT,
    containerParent: HTMLElement,
    handlers: HandlersT,
    garage: Garage
  ) => Promise<void>;
  deleteHandler: (id: number) => Promise<Response>;
  startButtonHandler: (
    id: number,
    carImage: HTMLElement,
    startButton: HTMLElement,
    endButton?: HTMLElement | undefined,
    updateState?: UpdateStateT | undefined
  ) => Promise<Response | undefined>;
  stopButtonHandler: (
    id: number,
    startButton: HTMLElement,
    endButton: HTMLElement,
    carImage: HTMLElement,
    raceButton?: HTMLElement | undefined
  ) => Promise<Response | undefined>;
  raceStartButtonHandler: (
    updateState: UpdateStateT,
    handlers: HandlersT,
    paginationButtons: ControlsT,
    raceStartButton: HTMLElement,
    raceResetButton: HTMLElement,
    randomVehicleGenerationButton: HTMLElement,
    creationControls: ControlsT,
    vehicleUpdateControls: ControlsT
  ) => Promise<void>;
  raceResetButtonHandler: (
    updateState: UpdateStateT,
    raceStartButton: HTMLElement,
    raceResetButton: HTMLElement
  ) => Promise<void>;
  paginationNextButtonHandler: (
    updateState: UpdateStateT,
    containerParent: HTMLElement,
    garage: Garage,
    handlers: HandlersT,
    step: number
  ) => Promise<void>;
  paginationPrevButtonHandler: (
    updateState: UpdateStateT,
    containerParent: HTMLElement,
    garage: Garage,
    handlers: HandlersT,
    step: number
  ) => Promise<void>;
  activateOrDeactivateNextPaginationButton: (
    nextButton: HTMLElement,
    updateState: UpdateStateT,
    page: number,
    size: number,
    limit: number
  ) => void;
  activateOrDeactivatePrevPaginationButton: (prevButton: HTMLElement, updateState: UpdateStateT, page: number) => void;
  randomVehiclesGenerationButtonHandler: (
    containerParent: HTMLElement,
    garage: Garage,
    updateState: UpdateStateT,
    handlers: HandlersT
  ) => Promise<void>;
  selectButtonHandler: (vehicleUpdateControls: ControlsT, updateState: UpdateStateT, id: number) => Promise<void>;
  removeButtonHandler: (
    id: number,
    vehicleUpdateControls: ControlsT,
    updateState: UpdateStateT,
    paginationButtons: ControlsT,
    carContainer: HTMLElement,
    garageTitle: HTMLElement,
    garagePageTitle: HTMLElement,
    handlers: HandlersT,
    carsClass: Cars,
    raceButtons: ControlsT
  ) => Promise<void>;
  nextWinnersButtonHandler: (
    updateState: UpdateStateT,
    containerParent: HTMLElement,
    winners: Winners,
    handlers: HandlersT,
    step: number
  ) => Promise<void>;
  prevWinnersButtonHandler: (
    updateState: UpdateStateT,
    containerParent: HTMLElement,
    winners: Winners,
    handlers: HandlersT,
    step: number
  ) => Promise<void>;
  sortWinners: (
    winnersContainer: HTMLElement,
    winners: Winners,
    handlers: HandlersT,
    updateState: UpdateStateT
  ) => Promise<void>;
};

export type WinnersT = {
  winners: { [s: string]: number }[];
  winnersCount: number;
  pageValue: number;
};
