import { Inject, Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
} from '@angular/common/http';
import {
  catchError,
  first,
  map,
  Observable,
  of,
  switchMap,
  throwError,
} from 'rxjs';
import { AuthService } from './services/auth.service';
import { Store } from '@ngrx/store';
import { AuthActions, AuthSelectors } from './store/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject('BASE_API_URL') private baseUrl: string,
    private store: Store
  ) {}

  addUrlAndAuthHeaders(request: HttpRequest<any>, accessToken?: string) {
    const token$ = accessToken
      ? of(accessToken)
      : this.store.select(AuthSelectors.selectToken as any);
    return token$.pipe(
      first(),
      map((token) => {
        const url = `${this.baseUrl}${request.url}`;
        const requestParams: any = { url };
        if (token) {
          requestParams.setHeaders = { Authorization: `Bearer ${token}` };
        }
        const changedRequest = request.clone(requestParams);
        return changedRequest;
      })
    );
  }

  handleResponseError(error, request?, next?) {
    if (error.status === 401 && request.url !== '/refresh') {
      return this.authService.refreshToken().pipe(
        switchMap(({ accessToken }: any) => {
          this.store.dispatch(AuthActions.updateToken({ token: accessToken }));
          return this.addUrlAndAuthHeaders(request, accessToken);
        }),
        switchMap((newRequest) => next.handle(newRequest))
      );
    }
    return throwError(error);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.addUrlAndAuthHeaders(request).pipe(
      switchMap((newRequest: any) => next.handle(newRequest)),
      catchError((error) => {
        return this.handleResponseError(error, request, next);
      })
    );
  }
}
