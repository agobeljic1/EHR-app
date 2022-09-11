import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  constructor(private readonly httpClient: HttpClient) {}

  getPatients(query: string = '') {
    console.log(query);
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    return this.httpClient
      .get('/patients', { params })
      .pipe(map(this.mapPatients));
  }

  createPatient(patient) {
    return this.httpClient.post('/patients', patient);
  }

  updatePatient(patient) {
    return this.httpClient.put('/patients', patient);
  }

  deletePatient(patient) {
    return this.httpClient.delete(`/patients/${patient.id}`);
  }

  mapPatients({ patients }: any) {
    return {
      patients: patients.map((patient) => ({
        ...patient,
        displayName: `[${patient.id}] ${patient.given} ${patient.family}(${patient.city})`,
      })),
    };
  }
}
