import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import wNumb from 'wnumb';
import { SliderHandlerT } from '../../../types/types';
import AppController from '../../controller/appController';
import AmointI from '../../controller/minMaxI';
import Component from '../component/component';
import TextComponent from '../textComponent/textComponent';

export default class Slider {
  component: Component;
  textComponent: TextComponent;
  controller: AppController;

  constructor() {
    this.component = new Component();
    this.textComponent = new TextComponent();
    this.controller = new AppController();
  }

  renderSlider(parentEl: HTMLElement, title: 'Amount' | 'Year', minMax: AmointI, handler: SliderHandlerT) {
    const filters: HTMLElement = this.component.createComponent('div', 'filters__range', parentEl);
    this.textComponent.createTextComponent('h3', 'filters__title', filters, title);

    const filterRangeSlider = this.component.createComponent(
      'div',
      'filters__range-slider',
      filters
    ) as noUiSlider.target;
    this.createUiSlider(filterRangeSlider, [minMax.min, minMax.max], minMax.min, minMax.max);

    switch (title) {
      case 'Amount':
        if (this.controller.getFromLocalStorage('cars-store-amount-slider')) {
          this.setFiltersTooltips(filterRangeSlider, 'cars-store-amount-slider');
        }
        break;
      case 'Year':
        if (this.controller.getFromLocalStorage('cars-store-year-slider')) {
          this.setFiltersTooltips(filterRangeSlider, 'cars-store-year-slider');
        }
        break;
      default:
        break;
    }

    (filterRangeSlider.noUiSlider as noUiSlider.API).on('update', handler);
  }

  createUiSlider(parentEl: HTMLElement, startRange: number[], min: number, max: number): void {
    noUiSlider.create(parentEl, {
      start: startRange,
      step: 1,
      connect: true,
      tooltips: [wNumb({ decimals: 0 }), wNumb({ decimals: 0 })],
      range: {
        min: min,
        max: max,
      },
    });
  }

  setFiltersTooltips(slider: noUiSlider.target, key: 'cars-store-amount-slider' | 'cars-store-year-slider'): void {
    const [min, max] = this.controller.getFromLocalStorage(key);
    slider.noUiSlider?.set([+min, +max]);
  }
}
