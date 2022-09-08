import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { AuthActions } from '.';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerUser),
      switchMap(({ user }) => {
        return this.authService.register(user).pipe(
          map(() => {
            return AuthActions.registerUserSuccess();
          }),
          catchError(() => of(AuthActions.registerUserFailure()))
        );
      })
    )
  );

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
}
