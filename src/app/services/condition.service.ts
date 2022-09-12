import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConditionService {
  constructor(private readonly httpClient: HttpClient) {}

  getConditions(encounterId, query: string = '') {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    if (encounterId) {
      params = params.set('encounterId', encounterId);
    }
    return this.httpClient
      .get('/conditions', { params })
      .pipe(map(this.mapConditions));
  }

  createCondition(condition, encounterId) {
    let params = new HttpParams();
    if (encounterId) {
      params = params.set('encounterId', encounterId);
    }
    return this.httpClient.post('/conditions', condition, { params });
  }

  updateCondition(condition) {
    return this.httpClient.put('/conditions', condition);
  }

  deleteCondition(condition) {
    return this.httpClient.delete(`/conditions/${condition.id}`);
  }

  mapConditions({ conditions }: any) {
    return {
      conditions: conditions.map((condition) => ({
        ...condition,
        displayName: `[${condition.id}] ${condition.given} ${condition.family}(${condition.city})`,
      })),
    };
  }
}
