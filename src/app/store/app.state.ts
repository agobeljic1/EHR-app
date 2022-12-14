import { ActionReducerMap } from '@ngrx/store';
import { allergyReducer, AllergyState } from './allergy/allergy.reducers';
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
  medicationReducer,
  MedicationState,
} from './medication/medication.reducers';
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
  allergyState: AllergyState;
  medicationState: MedicationState;
}

export const reducers: ActionReducerMap<AppState> = {
  authState: authReducer,
  organizationState: organizationReducer,
  userState: userReducer,
  encounterState: encounterReducer,
  patientState: patientReducer,
  conditionState: conditionReducer,
  allergyState: allergyReducer,
  medicationState: medicationReducer,
};
