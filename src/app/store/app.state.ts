import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducers';

export interface AppState {
  authState: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
};
