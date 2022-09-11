import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly httpClient: HttpClient) {}

  getUsers(query: string = '') {
    console.log(query);
    let params = new HttpParams();
    if (query) {
      params = params.set('query', query);
    }
    return this.httpClient.get('/users', { params }).pipe(map(this.mapUsers));
  }

  createUser(user) {
    return this.httpClient.post('/users', user);
  }

  updateUser(user) {
    return this.httpClient.put('/users', user);
  }

  deleteUser(user) {
    return this.httpClient.delete(`/users/${user.id}`);
  }

  private mapUsers({ users }: any) {
    return {
      users: users.map((user) => ({
        ...user,
        displayName: `[${user.id}] ${user.given} ${user.family}(${user.city})`,
      })),
    };
  }
}
