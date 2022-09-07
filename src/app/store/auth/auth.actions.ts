import { createAction, props } from '@ngrx/store';
import { LoginCredentials } from 'src/app/models/auth/LoginCredentials';
import { RegisterCredentials } from 'src/app/models/auth/RegisterCredentials';
import { User } from 'src/app/models/user/User';

export const registerUser = createAction(
  '[Register Modal] User Register',
  props<{ user: RegisterCredentials }>()
);

export const registerUserSuccess = createAction(
  '[Register API] User Register Success'
);

export const registerUserFailure = createAction(
  '[Register API] User Register Failure'
);

export const loginUser = createAction(
  '[Login Modal] Load User',
  props<{ user: LoginCredentials }>()
);

export const loginUserSuccess = createAction(
  '[Login API] User Login Success',
  props<{ token: string }>()
);

export const loginUserFailure = createAction('[Login API] User Login Failure');

export const loadUser = createAction('[Profile Modal] Load User');

export const loadUserSuccess = createAction(
  '[User API] User Load Success',
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  '[User API] User Load Failure',
  props<{ error: string }>()
);

export const logoutUser = createAction('[User API] Logout User');

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

export const openRegister = createAction(
  '[Register Modal] Open Register Modal'
);

export const closeRegister = createAction(
  '[Register Modal] Close Register Modal'
);

export const openProfile = createAction('[Profile Modal] Open Profile Modal');

export const closeProfile = createAction('[Profile Modal] Close Profile Modal');
