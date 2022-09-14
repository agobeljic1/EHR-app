import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EncounterService {
  constructor(private readonly httpClient: HttpClient) {}

  getEncounters() {
    return this.httpClient.get('/encounters');
  }

  getEncounterById(id: string) {
    return this.httpClient.get(`/encounters/${id}`);
  }

  getEncounterUsersById(id: string) {
    return this.httpClient.get(`/encounters/${id}/users`);
  }

  createEncounter(encounter) {
    return this.httpClient.post('/encounters', encounter);
  }

  updateEncounter(encounter) {
    return this.httpClient.put('/encounters', encounter);
  }

  dischargePatient(encounter) {
    return this.httpClient.post(`/encounters/${encounter.id}/discharge`, {});
  }

  deleteEncounter(encounter) {
    return this.httpClient.delete(`/encounters/${encounter.id}`);
  }

  addNewUserToEncounter(encounter, user) {
    return this.httpClient.post(
      `/encounters/${encounter.id}/users/${user.id}`,
      {}
    );
  }

  removeUserFromEncounter(encounter, user) {
    return this.httpClient.delete(
      `/encounters/${encounter.id}/users/${user.id}`
    );
  }
}
