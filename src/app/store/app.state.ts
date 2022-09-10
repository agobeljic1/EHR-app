import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducers';
import {
  organizationReducer,
  OrganizationState,
} from './organization/organization.reducers';
import { userReducer, UserState } from './user/user.reducers';

export interface AppState {
  authState: AuthState;
  organizationState: OrganizationState;
  userState: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  organizationState: organizationReducer,
  userState: userReducer,
};
