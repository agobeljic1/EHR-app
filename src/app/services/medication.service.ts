import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicationService {
  constructor(private readonly httpClient: HttpClient) {}

  getMedications(encounterId, query: string = '') {
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    if (encounterId) {
      params = params.set('encounterId', encounterId);
    }
    return this.httpClient
      .get('/medications', { params })
      .pipe(map(this.mapMedications));
  }

  createMedication(medication, encounterId) {
    let params = new HttpParams();
    if (encounterId) {
      params = params.set('encounterId', encounterId);
    }
    return this.httpClient.post('/medications', medication, { params });
  }

  updateMedication(medication) {
    return this.httpClient.put('/medications', medication);
  }

  deleteMedication(medication) {
    return this.httpClient.delete(`/medications/${medication.id}`);
  }

  mapMedications({ medications }: any) {
    return {
      medications: medications.map((medication) => ({
        ...medication,
        displayName: `[${medication.id}] ${medication.given} ${medication.family}(${medication.city})`,
      })),
    };
  }
}
