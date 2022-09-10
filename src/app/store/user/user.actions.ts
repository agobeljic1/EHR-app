import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user/User';

export const loadUsers = createAction('[User Page] Load Users');

export const loadUsersSuccess = createAction(
  '[User API] Users Load Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction('[User API] Users Load Failure');

export const openUpsertUser = createAction(
  '[Login Modal] Open Upsert User',
  props<{ user: User | null }>()
);

export const closeUpsertUser = createAction('[Login Modal] Close Upsert User');

export const createUser = createAction(
  '[User Page] Create User',
  props<{ user: User }>()
);

export const createUserSuccess = createAction('[User API] Create User Success');

export const createUserFailure = createAction('[User API] Create User Failure');

export const updateUser = createAction(
  '[User Page] Update User',
  props<{ user: User }>()
);

export const updateUserSuccess = createAction('[User API] Update User Success');

export const updateUserFailure = createAction('[User API] Update User Failure');

export const deleteUser = createAction(
  '[User Page] Delete User',
  props<{ user: User }>()
);

export const deleteUserSuccess = createAction('[User API] Delete User Success');

export const deleteUserFailure = createAction('[User API] Delete User Failure');

export const searchUsersByQuery = createAction(
  '[User API] Search Users By Query',
  props<{ query: string }>()
);

export const searchUsersByQuerySuccess = createAction(
  '[User API] Search Users By Query Success',
  props<{ users: User[] }>()
);

export const searchUsersByQueryFailure = createAction(
  '[User API] Search Users By Query Failure'
);
