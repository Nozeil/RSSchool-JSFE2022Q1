import AppViewI from './appViewI';
import Component from './component/component';
import Header from './header/header';

export default class AppView implements AppViewI {
  wrapper: Component;
  header: Header;
  main: Component;
  footer: Component;

  constructor() {
    this.wrapper = new Component();
    this.header = new Header();
    this.main = new Component();
    this.footer = new Component();
  }

  render() {
    const wrapper: HTMLElement = this.wrapper.createComponent('div', 'wrapper', document.body);
    this.header.renderHeader(wrapper);
    const main = this.main.createComponent('main', 'main', wrapper);

    const footer = this.main.createComponent('footer', 'main', wrapper);
  }
}
