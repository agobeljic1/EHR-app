import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { UserActions } from '.';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  users$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() => {
        return this.userService.getUsers().pipe(
          map(({ users }: any) => {
            console.log(users);
            return UserActions.loadUsersSuccess({
              users,
            });
          }),
          catchError(() => {
            return of(
              UserActions.loadUsersFailure({
                message: 'Failed to load users',
              })
            );
          })
        );
      })
    )
  );

  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      switchMap(({ user }) => {
        return this.userService.createUser(user).pipe(
          map(() => {
            return UserActions.createUserSuccess({
              message: 'Successfully created user',
            });
          }),
          catchError(() => {
            return of(
              UserActions.createUserFailure({
                message: 'Failed to create user',
              })
            );
          })
        );
      })
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.updateUser),
      switchMap(({ user }) => {
        return this.userService.updateUser(user).pipe(
          map(() => {
            return UserActions.updateUserSuccess({
              message: 'Successfully updated user',
            });
          }),
          catchError(() => {
            return of(
              UserActions.updateUserFailure({
                message: 'Failed to update user',
              })
            );
          })
        );
      })
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({ user }) => {
        return this.userService.deleteUser(user).pipe(
          map(() => {
            return UserActions.deleteUserSuccess({
              message: 'Successfully deleted user',
            });
          }),
          catchError(() => {
            return of(
              UserActions.deleteUserFailure({
                message: 'Failed to delete user',
              })
            );
          })
        );
      })
    )
  );

  refetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.createUserSuccess,
        UserActions.updateUserSuccess,
        UserActions.deleteUserSuccess
      ),
      map(() => {
        return UserActions.loadUsers();
      })
    )
  );

  closeUpsertUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUserSuccess, UserActions.updateUserSuccess),
      map(() => {
        return UserActions.closeUpsertUser();
      })
    )
  );

  searchUsersByQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.searchUsersByQuery),
      switchMap(({ query }) => {
        return this.userService.getUsers(query).pipe(
          map(({ users }: any) => {
            return UserActions.searchUsersByQuerySuccess({
              users,
            });
          }),
          catchError(() => {
            return of(
              UserActions.searchUsersByQueryFailure({
                message: 'Failed to search user',
              })
            );
          })
        );
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        UserActions.loadUsersFailure,
        UserActions.createUserSuccess,
        UserActions.createUserFailure,
        UserActions.updateUserSuccess,
        UserActions.updateUserFailure,
        UserActions.deleteUserSuccess,
        UserActions.deleteUserFailure,
        UserActions.searchUsersByQueryFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => UserActions.showMessageSuccess())
    )
  );
}
