import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { User } from 'src/app/models/user/User';
import { UserService } from 'src/app/services/user.service';
import { UserActions } from '.';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

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
            return of(UserActions.loadUsersFailure());
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
            return UserActions.createUserSuccess();
          }),
          catchError(() => {
            return of(UserActions.createUserFailure());
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
            return UserActions.updateUserSuccess();
          }),
          catchError(() => {
            return of(UserActions.updateUserFailure());
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
            return UserActions.deleteUserSuccess();
          }),
          catchError(() => {
            return of(UserActions.deleteUserFailure());
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
            return of(UserActions.searchUsersByQueryFailure());
          })
        );
      })
    )
  );
}
