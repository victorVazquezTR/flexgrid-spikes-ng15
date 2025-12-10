import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() {}

  getColors() {
    return 'Red,Green,Blue,White,Black,Yellow,Orange'.split(',');
  }
}

