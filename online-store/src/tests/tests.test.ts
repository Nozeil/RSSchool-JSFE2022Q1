import MinMaxAmount from '../components/controller/loader/minMaxAmount';
import MinMaxI from '../components/controller/minMaxI';
import { ProductsT } from '../types/types';

const getMinMaxAmount: (products: ProductsT, prop: string) => MinMaxI = new MinMaxAmount().getMinMax;
const products: ProductsT = [
  {
    model: 'Mercedes-Benz 300SL',
    amount: '1',
    year: '1957',
    manufacturer: 'Mercedes-Benz',
    transmission: 'manual',
    color: 'gray',
    popular: 'no',
    image: './assets/1.jpg',
  },
  {
    model: 'BMW M1',
    amount: '1',
    year: '1981',
    manufacturer: 'BMW',
    transmission: 'manual',
    color: 'white',
    popular: 'no',
    image: './assets/2.jpg',
  },
  {
    model: 'Lamborghini Countach',
    amount: '1',
    year: '1975',
    manufacturer: 'Lamborghini S.p.A',
    transmission: 'manual',
    color: 'red',
    popular: 'no',
    image: './assets/3.jpg',
  },
  {
    model: 'Mercedes-Benz W223',
    amount: '15',
    year: '2021',
    manufacturer: 'Mercedes-Benz',
    transmission: 'automatic',
    color: 'gray',
    popular: 'yes',
    image: './assets/4.jpg',
  },
  {
    model: 'Alfa Romeo 6C',
    amount: '1',
    year: '1938',
    manufacturer: 'Alfa Romeo',
    transmission: 'manual',
    color: 'red',
    popular: 'no',
    image: './assets/5.jpg',
  },
  {
    model: 'BMW 3',
    amount: '4',
    year: '2019',
    manufacturer: 'BMW',
    transmission: 'manual',
    color: 'white',
    popular: 'yes',
    image: './assets/6.jpg',
  },
  {
    model: 'BMW 5',
    amount: '12',
    year: '2020',
    manufacturer: 'BMW',
    transmission: 'automatic',
    color: 'gray',
    popular: 'yes',
    image: './assets/7.jpg',
  },
  {
    model: 'BMW 507',
    amount: '1',
    year: '1958',
    manufacturer: 'BMW',
    transmission: 'manual',
    color: 'gray',
    popular: 'no',
    image: './assets/8.jpg',
  },
  {
    model: 'BMW X5',
    amount: '2',
    year: '2018',
    manufacturer: 'BMW',
    transmission: 'automatic',
    color: 'white',
    popular: 'yes',
    image: './assets/9.jpg',
  },
  {
    model: 'Aston Martin DB4',
    amount: '1',
    year: '1960',
    manufacturer: 'Aston Martin',
    transmission: 'manual',
    color: 'red',
    popular: 'no',
    image: './assets/10.jpg',
  },
  {
    model: 'Aston Martin DB5',
    amount: '1',
    year: '1964',
    manufacturer: 'Aston Martin',
    transmission: 'automatic',
    color: 'gray',
    popular: 'no',
    image: './assets/11.jpg',
  },
  {
    model: 'DeLorean DMC-12',
    amount: '1',
    year: '1982',
    manufacturer: 'DeLorean',
    transmission: 'automatic',
    color: 'gray',
    popular: 'no',
    image: './assets/12.jpg',
  },
  {
    model: 'Mercedes-Benz G65',
    amount: '5',
    year: '2021',
    manufacturer: 'Mercedes-Benz',
    transmission: 'automatic',
    color: 'gray',
    popular: 'yes',
    image: './assets/13.jpg',
  },
  {
    model: 'Mercedes-Benz W177',
    amount: '10',
    year: '2021',
    manufacturer: 'Mercedes-Benz',
    transmission: 'manual',
    color: 'gray',
    popular: 'yes',
    image: './assets/14.jpg',
  },
  {
    model: 'Mercedes-Benz W206',
    amount: '10',
    year: '2022',
    manufacturer: 'Mercedes-Benz',
    transmission: 'automatic',
    color: 'gray',
    popular: 'yes',
    image: './assets/15.jpg',
  },
  {
    model: 'Mercedes-Benz W213',
    amount: '5',
    year: '2021',
    manufacturer: 'Mercedes-Benz',
    transmission: 'automatic',
    color: 'gray',
    popular: 'yes',
    image: './assets/16.jpg',
  },
  {
    model: 'Porsche 930',
    amount: '1',
    year: '1976',
    manufacturer: 'Porsche',
    transmission: 'manual',
    color: 'red',
    popular: 'no',
    image: './assets/17.jpg',
  },
  {
    model: 'Porsche Taycan',
    amount: '10',
    year: '2020',
    manufacturer: 'Porsche',
    transmission: 'automatic',
    color: 'white',
    popular: 'yes',
    image: './assets/18.jpg',
  },
  {
    model: 'Lamborghini Miura',
    amount: '1',
    year: '1970',
    manufacturer: 'Lamborghini S.p.A',
    transmission: 'manual',
    color: 'red',
    popular: 'no',
    image: './assets/19.jpg',
  },
  {
    model: 'Alfa Romeo Giulia',
    amount: '3',
    year: '2018',
    manufacturer: 'Alfa Romeo',
    transmission: 'manual',
    color: 'black',
    popular: 'yes',
    image: './assets/20.jpg',
  },
  {
    model: 'Mercedes-Benz E500',
    amount: '1',
    year: '1993',
    manufacturer: 'Mercedes-Benz',
    transmission: 'automatic',
    color: 'black',
    popular: 'no',
    image: './assets/21.jpg',
  },
];

const minMaxAmount = getMinMaxAmount(products, 'amount');

test('minMaxAmount not null', () => {
  expect(minMaxAmount).not.toBeNull();
});

test('object contains only min max keys', () => {
  const unexpected = ['middle'];

  expect(Object.keys(minMaxAmount)).toEqual(expect.not.arrayContaining(unexpected));
});

test('minMax returns something', () => {
  expect(minMaxAmount).toBeDefined();
});

test('have min property', () => {
  expect(minMaxAmount).toHaveProperty('min');
});

test('is min value greater than 0?', () => {
  expect(minMaxAmount.min).toBeGreaterThan(0);
});

test('is max value less or equal to 15?', () => {
  expect(minMaxAmount.min).toBeLessThan(15);
});

test('check min values', () => {
  expect(minMaxAmount.min).toBe(1);
});

test('check min and max value', () => {
  expect(minMaxAmount).toEqual({
    min: 1,
    max: 15,
  });
});

test('returns minMax twice', () => {
  const minMax = jest.fn(() => getMinMaxAmount(products, 'amount'));
  minMax();
  minMax();
  expect(minMax).toHaveReturnedTimes(2);
});

test('minMax have only two properties', () => {
  expect(Object.keys(minMaxAmount)).toHaveLength(2);
});
