import AppViewI from './appViewI';
import Component from './component/component';

export default class AppView implements AppViewI {
  wrapper: Component;
  header: Component;
  main: Component;
  footer: Component;

  constructor() {
    this.wrapper = new Component();
    this.header = new Component();
    this.main = new Component();
    this.footer = new Component();
  }

  render() {
    const wrapper = this.wrapper.createComponent('div', 'wrapper', document.body);
    const header = this.header.createComponent('header', 'header', wrapper);
    const main = this.main.createComponent('main', 'main', wrapper);
    const footer = this.main.createComponent('footer', 'main', wrapper);
  }
}
