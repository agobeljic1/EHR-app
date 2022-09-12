import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AllergyService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllergys(encounterId, query: string = '') {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    if (encounterId) {
      params = params.set('encounterId', encounterId);
    }
    return this.httpClient
      .get('/allergys', { params })
      .pipe(map(this.mapAllergys));
  }

  createAllergy(allergy, encounterId) {
    let params = new HttpParams();
    if (encounterId) {
      params = params.set('encounterId', encounterId);
    }
    return this.httpClient.post('/allergys', allergy, { params });
  }

  updateAllergy(allergy) {
    return this.httpClient.put('/allergys', allergy);
  }

  deleteAllergy(allergy) {
    return this.httpClient.delete(`/allergys/${allergy.id}`);
  }

  mapAllergys({ allergys }: any) {
    return {
      allergys: allergys.map((allergy) => ({
        ...allergy,
        displayName: `[${allergy.id}] ${allergy.given} ${allergy.family}(${allergy.city})`,
      })),
    };
  }
}
