import { getCarsT, ServerResT, WinnersT } from '../types/types';

export default class Model {
  url: string;

  page: string;

  limit: string;

  constructor(url = 'https://delicious-observant-thrush.glitch.me/', page = '_page', limit = '_limit') {
    this.url = url;
    this.page = page;
    this.limit = limit;
  }

  getQuery(queryParam: string, pageValue?: number, limitValue?: number): string {
    const baseUrl = `${this.url}${queryParam}`;
    return pageValue && limitValue ? `${baseUrl}?${this.page}=${pageValue}&${this.limit}=${limitValue}` : baseUrl;
  }

  async getCarsAndCarsCount(pageValue = 1, limitValue = 7): Promise<getCarsT> {
    const query = this.getQuery('garage', pageValue, limitValue);
    const res = await fetch(query, {
      method: 'GET',
    });
    const cars = await res.json();
    const carsCountString = res.headers.get('X-Total-Count');
    let carsCount = 0;

    if (carsCountString) {
      carsCount = +carsCountString;
    }

    return { cars, carsCount, pageValue };
  }

  async getWinners(
    sort: 'id' | 'wins' | 'time',
    order: 'ASC' | 'DESC',
    pageValue = 1,
    limitValue = 10
  ): Promise<WinnersT> {
    const query = `${this.getQuery('winners', pageValue, limitValue)}&_sort=${sort}&_order=${order}`;
    const res = await fetch(query, {
      method: 'GET',
    });
    const winners = await res.json();
    const winnersCountString = res.headers.get('X-Total-Count');
    let winnersCount = 0;

    if (winnersCountString) {
      winnersCount = +winnersCountString;
    }

    return { winners, winnersCount, pageValue };
  }

  async createCar(name: string, color: string) {
    const query = this.getQuery('garage');
    const res = await fetch(query, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    return res;
  }

  async getCar(id: number) {
    const query = `${this.getQuery('garage')}/${id}`;
    const res = await fetch(query, {
      method: 'GET',
    });
    const car: ServerResT = await res.json();
    return car;
  }

  async updateCar(name: string, color: string, id: number) {
    const query = `${this.getQuery('garage')}/${id}`;
    const res = await fetch(query, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, color }),
    });
    return res;
  }

  async deleteCar(id: number) {
    const query = `${this.getQuery('garage')}/${id}`;
    const res = await fetch(query, {
      method: 'DELETE',
    });
    return res;
  }

  async startCarsEngine(id: number, status = 'started') {
    const query = `${this.getQuery('engine')}?id=${id}&status=${status}`;
    const res = await fetch(query, {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    });
    const params = await res.json();
    return { res, params };
  }

  async switchCarsEngineToDriveMode(id: number, status = 'drive') {
    const query = `${this.getQuery('engine')}?id=${id}&status=${status}`;
    const res = await fetch(query, {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    });
    return res;
  }

  async stopCarsEngine(id: number, status = 'stopped') {
    const query = `${this.getQuery('engine')}?id=${id}&status=${status}`;
    const res = await fetch(query, {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
    });
    return res;
  }

  async createWinner(id: number, wins: number, time: number) {
    const query = this.getQuery('winners');
    const res = await fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, wins, time }),
    });
    return res;
  }

  async getWinner(id: number) {
    const query = `${this.getQuery('winners')}/${id}`;
    const res = await fetch(query, {
      method: 'GET',
    });
    return res.json();
  }

  async updateWinner(id: number, wins: number, time: number) {
    const query = `${this.getQuery('winners')}/${id}`;
    await fetch(query, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ wins, time }),
    });
  }

  async deleteWinner(id: number) {
    const query = `${this.getQuery('winners')}/${id}`;
    const res = await fetch(query, {
      method: 'DELETE',
    });
    return res;
  }
}
