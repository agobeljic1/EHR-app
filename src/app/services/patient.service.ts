import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
    return this.httpClient.get('/patients', { params });
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
}
