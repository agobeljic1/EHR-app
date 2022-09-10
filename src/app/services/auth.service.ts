import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginCredentials } from '../models/auth/LoginCredentials';
import { RegisterCredentials } from '../models/auth/RegisterCredentials';

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
    return this.httpClient.get('/me');
  }

  logout() {
    return this.httpClient.post('/logout', null, {
      withCredentials: true,
    });
  }
}
