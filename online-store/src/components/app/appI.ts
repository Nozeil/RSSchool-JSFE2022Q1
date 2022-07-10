import AppView from '../view/appView';

export default interface AppI {
  view: AppView;
  start: () => void;
}
