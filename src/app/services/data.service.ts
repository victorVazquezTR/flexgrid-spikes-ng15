import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getData() {
    return new Promise((resolve, reject) => {
      try {
        resolve([
          {
            consentId: '33e0378',
            provider: 'Client Keys',
            authorizationStatus: 'Received',
            iconStatus: 'check-circle',
            iconColor: 'green',
            validUntil: 'Actions',
          },
          {
            consentId: '58ba9efz',
            provider: 'Bank Simple',
            authorizationStatus: 'Soon to expire',
            iconColor: 'orange',
            iconStatus: 'exclamation-triangle',
            validUntil: 'Actions',
          },
          {
            consentId: '6f437da9',
            provider: 'Client Keys',
            authorizationStatus: 'Expired',
            iconStatus: 'exclamation-circle',
            iconColor: 'red',
            validUntil: 'Actions',
          },
          {
            consentId: '9fu02m7',
            provider: 'Client Bank',
            authorizationStatus: 'Transaction Error',
            iconStatus: 'ban',
            iconColor: 'red',
            validUntil: 'Actions',
          },
        ]);
      } catch(error) {
        reject(`Error fetching data: ${error}`)
      }
    });
  }
}

