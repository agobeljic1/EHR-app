import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginUser),
      switchMap(({ user }) => {
        return this.authService.login(user).pipe(
          map((response: any) => {
            return AuthActions.loginUserSuccess({
              token: response.accessToken,
              message: 'Successfully logged in',
            });
          }),
          catchError(() =>
            of(AuthActions.loginUserFailure({ message: 'Failed to login' }))
          )
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
      map(() =>
        AuthActions.logoutUserSuccess({ message: 'Successfully logged out' })
      )
    )
  );

  closeProfile$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logoutUserSuccess),
      map(() => AuthActions.closeProfile())
    )
  );

  redirectToHome$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.logoutUserSuccess,
        AuthActions.fetchProfileFailure,
        AuthActions.refreshTokenFailure,
        AuthActions.selectOrganizationSuccess
      ),
      tap(() => this.router.navigateByUrl('')),
      map(() => AuthActions.redirectToHomeSuccess())
    )
  );

  selectOrganization$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.selectOrganization),
      switchMap(({ organization }) => {
        return this.authService.updateUserOrganization(organization).pipe(
          map(() => {
            return AuthActions.selectOrganizationSuccess({
              message: 'Successfully selected organization',
            });
          }),
          catchError(() =>
            of(
              AuthActions.selectOrganizationFailure({
                message: 'Failed to select organization',
              })
            )
          )
        );
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AuthActions.loginUserSuccess,
        AuthActions.loginUserFailure,
        AuthActions.logoutUserSuccess,
        AuthActions.selectOrganizationSuccess,
        AuthActions.selectOrganizationFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => AuthActions.showMessageSuccess())
    )
  );
}
