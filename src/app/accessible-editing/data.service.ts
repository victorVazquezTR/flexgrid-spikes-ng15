// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root',
// })
// export class DataService {
//   //   getData() {
//   //     let countries = [
//   //         'US',
//   //         'Germany',
//   //         'UK',
//   //         'Japan',
//   //         'Italy',
//   //         'Greece',
//   //         'Spain',
//   //         'Portugal',
//   //         'Australia',
//   //       ],
//   //       data = [];
//   //     //
//   //     for (let i = 0; i < countries.length; i++) {
//   //       data.push({
//   //         id: i + 1,
//   //         country: countries[i],
//   //         downloads: Math.round(Math.random() * 20000),
//   //         sales: Math.random() * 10000,
//   //         expenses: Math.random() * 5000,
//   //       });
//   //     }
//   //     //
//   //     return data;
//   //   }
// }
export function getData(count: number): any[] {
  var clientName =
      'Amira Salam,John Miller,Helen Charles,Charles,Daniel,John, Erik Zackerson'.split(
        ','
      ),
    products = 'Widgets,Gadgets,Yahoos'.split(','),
    data = [];
  for (var i = 0; i < count; i++) {
    var item = {
      id: i,
      clientName: pickOne(clientName),
      product: pickOne(products),
      discount: Math.random() * 0.3,
      downloads: Math.round(Math.random() * 200000),
      sales: Math.random() * 100000,
      expenses: Math.random() * 50000,
    };
    data.push(item);
  }
  return data;
}
function pickOne(items: any[]): any {
  return items[randBetween(0, items.length - 1)];
}
function randBetween(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
