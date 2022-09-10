import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserState } from './user.reducers';

export const selectUsers = (state: AppState) => state.userState;

export const selectAllUsers = createSelector(
  selectUsers,
  (state: UserState) => state.users
);

export const selectLoadingUsers = createSelector(
  selectUsers,
  (state: UserState) => state.loadingUsers
);

export const selectUpsertUserOpen = createSelector(
  selectUsers,
  (state: UserState) => state.upsertUserOpen
);

export const selectUpsertUserData = createSelector(
  selectUsers,
  (state: UserState) => state.upsertUserData
);

export const selectLoadingUpsertUser = createSelector(
  selectUsers,
  (state: UserState) => state.loadingUpsertUser
);

export const selectActiveDeleteUserId = createSelector(
  selectUsers,
  (state: UserState) => state.activeDeleteUserId
);

export const selectLoadingSearchUsersByQuery = createSelector(
  selectUsers,
  (state: UserState) => state.loadingSearchUsersByQuery
);

export const selectFoundUsersByQuery = createSelector(
  selectUsers,
  (state: UserState) => state.foundUsersByQuery
);
