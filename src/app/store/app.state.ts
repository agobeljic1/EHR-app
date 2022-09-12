import { ActionReducerMap } from '@ngrx/store';
import { authReducer, AuthState } from './auth/auth.reducers';
import {
  conditionReducer,
  ConditionState,
} from './condition/condition.reducers';
import {
  encounterReducer,
  EncounterState,
} from './encounter/encounter.reducers';
import {
  organizationReducer,
  OrganizationState,
} from './organization/organization.reducers';
import { patientReducer, PatientState } from './patient/patient.reducers';
import { userReducer, UserState } from './user/user.reducers';

export interface AppState {
  authState: AuthState;
  organizationState: OrganizationState;
  userState: UserState;
  encounterState: EncounterState;
  patientState: PatientState;
  conditionState: ConditionState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  organizationState: organizationReducer,
  userState: userReducer,
  encounterState: encounterReducer,
  patientState: patientReducer,
  conditionState: conditionReducer,
};
