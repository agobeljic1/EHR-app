import { createAction, props } from '@ngrx/store';
import { LoginCredentials } from 'src/app/models/auth/LoginCredentials';
import { User } from 'src/app/models/user/User';

export const loginUser = createAction(
  '[Login Modal] Login User',
  props<{ user: LoginCredentials }>()
);

export const loginUserSuccess = createAction(
  '[Login API] User Login Success',
  props<{ token: string }>()
);

export const loginUserFailure = createAction('[Login API] User Login Failure');

export const logoutUser = createAction('[User API] Logout User');

export const logoutUserSuccess = createAction('[User API] Logout User Success');

export const refreshToken = createAction('[User API] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[User API] Refresh Token Success',
  props<{ token: string }>()
);

export const refreshTokenFailure = createAction(
  '[User API] Refresh Token Failure'
);

export const updateToken = createAction(
  '[User API] Update Token',
  props<{ token: string }>()
);

export const fetchProfile = createAction('[User API] Fetch Profile');

export const fetchProfileSuccess = createAction(
  '[User API] Fetch Profile Success',
  props<{ user: any }>()
);

export const fetchProfileFailure = createAction(
  '[User API] Fetch Profile Failure'
);

export const openLogin = createAction('[Login Modal] Open Login Modal');

export const closeLogin = createAction('[Login Modal] Close Login Modal');

export const openProfile = createAction('[Profile Modal] Open Profile Modal');

export const closeProfile = createAction('[Profile Modal] Close Profile Modal');

export const redirectToHomeSuccess = createAction(
  '[Routing] Redirect To Home Success'
);
