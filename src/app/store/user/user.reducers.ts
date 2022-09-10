import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user/User';
import {
  closeUpsertUser,
  createUser,
  createUserFailure,
  createUserSuccess,
  deleteUser,
  deleteUserFailure,
  deleteUserSuccess,
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  openUpsertUser,
  searchUsersByQuery,
  searchUsersByQueryFailure,
  searchUsersByQuerySuccess,
  updateUser,
  updateUserFailure,
  updateUserSuccess,
} from './user.actions';

export interface UserState {
  users: User[];
  loadingUsers: boolean;
  upsertUserOpen: boolean;
  upsertUserData: User | null;
  loadingUpsertUser: boolean;
  activeDeleteUserId: string | null;
  loadingSearchUsersByQuery: boolean;
  foundUsersByQuery: User[];
}

export const initialState: UserState = {
  users: [],
  loadingUsers: false,
  upsertUserOpen: false,
  upsertUserData: null,
  loadingUpsertUser: false,
  activeDeleteUserId: null,
  loadingSearchUsersByQuery: false,
  foundUsersByQuery: [],
};

export const userReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loadingUsers: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loadingUsers: false,
  })),
  on(loadUsersFailure, (state) => ({
    ...state,
    loadingUsers: false,
  })),
  on(openUpsertUser, (state, { user }) => ({
    ...state,
    upsertUserData: user,
    upsertUserOpen: true,
  })),
  on(closeUpsertUser, (state) => ({
    ...state,
    upsertUserData: null,
    upsertUserOpen: false,
  })),
  on(createUser, (state) => ({
    ...state,
    loadingUpsertUser: true,
  })),
  on(createUserSuccess, (state) => ({
    ...state,
    loadingUpsertUser: false,
  })),
  on(createUserFailure, (state) => ({
    ...state,
    loadingUpsertUser: false,
  })),
  on(updateUser, (state) => ({
    ...state,
    loadingUpsertUser: true,
  })),
  on(updateUserSuccess, (state) => ({
    ...state,
    loadingUpsertUser: false,
  })),
  on(updateUserFailure, (state) => ({
    ...state,
    loadingUpsertUser: false,
  })),
  on(deleteUser, (state, { user }) => ({
    ...state,
    activeDeleteUserId: user.id,
  })),
  on(deleteUserSuccess, (state) => ({
    ...state,
    activeDeleteUserId: null,
  })),
  on(deleteUserFailure, (state) => ({
    ...state,
    activeDeleteUserId: null,
  })),
  on(searchUsersByQuery, (state) => ({
    ...state,
    loadingSearchUsersByQuery: true,
  })),
  on(searchUsersByQuerySuccess, (state, { users }) => ({
    ...state,
    loadingSearchUsersByQuery: false,
    foundUsersByQuery: users,
  })),
  on(searchUsersByQueryFailure, (state) => ({
    ...state,
    loadingSearchUsersByQuery: false,
  }))
);
