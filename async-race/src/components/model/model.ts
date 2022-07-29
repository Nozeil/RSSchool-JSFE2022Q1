export default class Model {
  url: string;

  page: string;

  limit: string;

  constructor(url = 'http://127.0.0.1:3000/', page = '_page', limit = '_limit') {
    this.url = url;
    this.page = page;
    this.limit = limit;
  }

  getQuery(queryParam: string, pageValue: number, limitValue: number): string {
    return `${this.url}${queryParam}?${this.page}=${pageValue}&${this.limit}=${limitValue}`;
  }

  async getCarsAndCarsCount(pageValue = 1, limitValue = 7) {
    const query = this.getQuery('garage', pageValue, limitValue);
    const res = await fetch(`${query}`, {
      method: 'GET',
    });
    const cars = await res.json();
    const carsCountString = res.headers.get('X-Total-Count');
    let carsCount;

    if (carsCountString) {
      carsCount = +carsCountString;
    }

    return { cars, carsCount, pageValue };
  }

  async getWinners(pageValue = 1, limitValue = 10) {
    const query = this.getQuery('winners', pageValue, limitValue);
    const res = await fetch(`${query}`, {
      method: 'GET',
    });
    const winners = await res.json();
    const winnersCountString = res.headers.get('X-Total-Count');
    let winnersCount;

    if (winnersCountString) {
      winnersCount = +winnersCountString;
    }

    return { winners, winnersCount, pageValue };
  }

  /*   
  getCar() {

  }
  createCar() {

  }

  deleteCar() {

  } 
  
  updateCar() {

  }

  startCarsEngine() {

  }

  stopCarsEngine() {

  }

  switchCarsEngineToDriveMode() {

  }



  getWinner() {

  }

  createWinner() {

  }

  deleteWinner() {

  }

  updateWinner() {

  }

  */
}
