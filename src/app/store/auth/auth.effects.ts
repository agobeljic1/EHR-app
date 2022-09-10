import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from '.';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      switchMap(({ user }) => {
        return this.authService.login(user).pipe(
          map((response: any) => {
            return AuthActions.loginUserSuccess({
              token: response.accessToken,
            });
          }),
          catchError(() => of(AuthActions.loginUserFailure()))
        );
      })
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() => {
        return this.authService.refreshToken().pipe(
          map((response: any) => {
            return AuthActions.refreshTokenSuccess({
              token: response.accessToken,
            });
          }),
          catchError(() => of(AuthActions.refreshTokenFailure()))
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshTokenSuccess, AuthActions.loginUserSuccess),
      map(() => AuthActions.fetchProfile())
    )
  );

  fetchProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.fetchProfile),
      switchMap(() => {
        return this.authService.me().pipe(
          map((response: any) => {
            console.log('response');
            console.log(response);
            return AuthActions.fetchProfileSuccess(response);
          }),
          catchError(() => of(AuthActions.fetchProfileFailure()))
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUser),
      switchMap(() => this.authService.logout()),
      map(() => AuthActions.logoutUserSuccess())
    )
  );

  redirectToHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.logoutUserSuccess,
        AuthActions.fetchProfileFailure,
        AuthActions.refreshTokenFailure
      ),
      tap(() => this.router.navigateByUrl('')),
      map(() => AuthActions.redirectToHomeSuccess())
    )
  );
}
