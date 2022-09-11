import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AuthState } from './auth.reducers';

export const selectAuth = (state: AppState) => state.authState;
export const selectUser = createSelector(
  selectAuth,
  (state: AuthState) => state.user
);

export const selectToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);

export const selectLoadingLogin = createSelector(
  selectAuth,
  (state: AuthState) => state.loadingLogin
);

export const selectLoadingProfile = createSelector(
  selectAuth,
  (state: AuthState) => state.loadingProfile
);

export const selectLoginOpen = createSelector(
  selectAuth,
  (state: AuthState) => state.loginOpen
);

export const selectProfileOpen = createSelector(
  selectAuth,
  (state: AuthState) => state.profileOpen
);

export const selectLoadingRefreshToken = createSelector(
  selectAuth,
  (state: AuthState) => state.loadingRefreshToken
);

export const selectSelectedOrganization = createSelector(
  selectAuth,
  (state: AuthState) => state.selectedOrganization
);
