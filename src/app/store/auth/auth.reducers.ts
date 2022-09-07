import { createReducer, on } from '@ngrx/store';
import {
  loadUser,
  loadUserSuccess,
  loadUserFailure,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
  registerUser,
  registerUserSuccess,
  registerUserFailure,
  logoutUser,
  refreshToken,
  refreshTokenFailure,
  refreshTokenSuccess,
  fetchProfile,
  fetchProfileSuccess,
  fetchProfileFailure,
  openLogin,
  closeLogin,
  closeProfile,
  closeRegister,
  openProfile,
  openRegister,
  updateToken,
} from './auth.actions';
import { User } from 'src/app/models/user/User';

export interface AuthState {
  user: User | null;
  token: string | null;
  loadingUser: boolean;
  loadingLogin: boolean;
  loadingRegister: boolean;
  loadingRefreshToken: boolean;
  loadingProfile: boolean;
  loginOpen: boolean;
  registerOpen: boolean;
  profileOpen: boolean;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loadingUser: false,
  loadingLogin: false,
  loadingRegister: false,
  loadingRefreshToken: false,
  loadingProfile: false,
  loginOpen: false,
  registerOpen: false,
  profileOpen: false,
};

export const authReducer = createReducer(
  initialState,
  on(loadUser, (state) => ({
    ...state,
    loadingUser: true,
  })),
  on(loadUserSuccess, (state, { user }) => ({
    ...state,
    user,
    loadingUser: false,
  })),
  on(loadUserFailure, (state) => ({
    ...state,
    loadingUser: false,
  })),
  on(registerUser, (state) => ({
    ...state,
    loadingRegister: true,
  })),
  on(registerUserSuccess, (state) => {
    return {
      ...state,
      loadingRegister: false,
      showRegisterSuccessMessage: true,
    };
  }),
  on(registerUserFailure, (state) => {
    return {
      ...state,
      loadingRegister: false,
    };
  }),
  on(loginUser, (state) => ({
    ...state,
    loadingLogin: true,
  })),
  on(loginUserSuccess, (state, { token }) => ({
    ...state,
    token,
    loadingLogin: false,
    showLoginSuccessMessage: true,
  })),
  on(loginUserFailure, (state) => ({
    ...state,
    loadingLogin: false,
  })),
  on(logoutUser, (state) => ({
    ...state,
    user: null,
    token: null,
  })),
  on(refreshToken, (state) => {
    return {
      ...state,
      loadingRefreshToken: true,
    };
  }),
  on(refreshTokenSuccess, (state, { token }) => {
    return {
      ...state,
      token,
      loadingRefreshToken: false,
    };
  }),
  on(refreshTokenFailure, (state) => {
    return {
      ...state,
      loadingRefreshToken: false,
      loadingProfile: false,
    };
  }),
  on(updateToken, (state, { token }) => {
    return {
      ...state,
      token,
    };
  }),
  on(fetchProfile, (state) => {
    return {
      ...state,
      loadingProfile: true,
    };
  }),
  on(fetchProfileSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      loadingProfile: false,
    };
  }),
  on(fetchProfileFailure, (state) => {
    return {
      ...state,
      loadingProfile: false,
    };
  }),
  on(openLogin, (state) => {
    return {
      ...state,
      loginOpen: true,
    };
  }),
  on(closeLogin, (state) => {
    return {
      ...state,
      loginOpen: false,
    };
  }),
  on(openRegister, (state) => {
    return {
      ...state,
      registerOpen: true,
    };
  }),
  on(closeRegister, (state) => {
    return {
      ...state,
      registerOpen: false,
    };
  }),
  on(openProfile, (state) => {
    return {
      ...state,
      profileOpen: true,
    };
  }),
  on(closeProfile, (state) => {
    return {
      ...state,
      profileOpen: false,
    };
  })
);
