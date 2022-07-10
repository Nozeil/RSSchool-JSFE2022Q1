import AppView from '../view/appView';
import AppI from './appI';

export default class App implements AppI {
  view: AppView;

  constructor() {
    this.view = new AppView();
  }

  start() {
    this.view.render();
  }
}
