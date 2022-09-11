import { createReducer, on } from '@ngrx/store';
import {
  loginUser,
  loginUserSuccess,
  loginUserFailure,
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
  openProfile,
  updateToken,
  logoutUserSuccess,
  selectOrganization,
} from './auth.actions';
import { User } from 'src/app/models/user/User';
import { Organization } from 'src/app/models/organization/Organization';

export interface AuthState {
  user: User | null;
  token: string | null;
  loadingUser: boolean;
  loadingLogin: boolean;
  loadingRefreshToken: boolean;
  loadingProfile: boolean;
  loginOpen: boolean;
  profileOpen: boolean;
  selectedOrganization: Organization | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  loadingUser: false,
  loadingLogin: false,
  loadingRefreshToken: true,
  loadingProfile: true,
  loginOpen: false,
  profileOpen: false,
  selectedOrganization: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginUser, (state) => ({
    ...state,
    loadingLogin: true,
  })),
  on(loginUserSuccess, (state, { token }) => ({
    ...state,
    token,
    loadingLogin: false,
    loginOpen: false,
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
  on(logoutUserSuccess, (state) => ({
    ...state,
    profileOpen: false,
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
      user: {
        ...user,
        nurse: user?.role === 'Nurse',
        doctor: user?.role === 'Doctor',
        admin: user?.role === 'Admin',
      },
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
  }),
  on(selectOrganization, (state, { organization }) => {
    return {
      ...state,
      selectedOrganization: organization,
      user: {
        ...(state.user as any),
        selectedOrganizationId: organization.id,
      },
    };
  })
);
