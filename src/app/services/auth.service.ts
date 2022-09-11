import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { LoginCredentials } from '../models/auth/LoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login(credentials: LoginCredentials) {
    return this.httpClient.post('/login', credentials, {
      withCredentials: true,
    });
  }

  refreshToken() {
    return this.httpClient.get('/refresh', {
      withCredentials: true,
    });
  }

  me() {
    return this.httpClient.get('/me').pipe(map(this.mapUserOrganizations));
  }

  updateUserOrganization(organization) {
    return this.httpClient.patch('/me/organization', {
      selectedOrganizationId: organization.id,
    });
  }

  logout() {
    return this.httpClient.post('/logout', null, {
      withCredentials: true,
    });
  }

  private mapUserOrganizations = ({ user }: any) => ({
    user: {
      ...user,
      organizations: user.organizations.map((organization) => ({
        ...organization,
        displayName: `[${organization.id}] ${organization.name} (${organization.line}, ${organization.city})`,
      })),
    },
  });
}
