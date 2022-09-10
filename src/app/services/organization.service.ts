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

  getOrganizationById(id: string) {
    return this.httpClient.get(`/organizations/${id}`);
  }

  getOrganizationUsersById(id: string) {
    return this.httpClient.get(`/organizations/${id}/users`);
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

  addNewUserToOrganization(organization, user) {
    return this.httpClient.post(
      `/organizations/${organization.id}/users/${user.id}`,
      {}
    );
  }

  removeUserFromOrganization(organization, user) {
    return this.httpClient.delete(
      `/organizations/${organization.id}/users/${user.id}`
    );
  }
}
