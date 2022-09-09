import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducers';
import {
  organizationReducer,
  OrganizationState,
} from './organization/organization.reducers';

export interface AppState {
  authState: AuthState;
  organizationState: OrganizationState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  organizationState: organizationReducer,
};
