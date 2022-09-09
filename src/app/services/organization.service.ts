import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrganizationService {
  constructor(private readonly httpClient: HttpClient) {}

  getOrganizations() {
    return this.httpClient.get('/organizations');
  }

  createOrganization(organization) {
    return this.httpClient.post('/organizations', organization);
  }

  updateOrganization(organization) {
    return this.httpClient.put('/organizations', organization);
  }

  deleteOrganization(organization) {
    return this.httpClient.delete(`/organizations/${organization.id}`);
  }
}
