import { createAction, props } from '@ngrx/store';
import { Patient } from 'src/app/models/patient/Patient';

export const loadPatients = createAction('[Patient Page] Load Patients');

export const loadPatientsSuccess = createAction(
  '[Patient API] Patients Load Success',
  props<{ patients: Patient[] }>()
);

export const loadPatientsFailure = createAction(
  '[Patient API] Patients Load Failure'
);

export const openUpsertPatient = createAction(
  '[Login Modal] Open Upsert Patient',
  props<{ patient: Patient | null }>()
);

export const closeUpsertPatient = createAction(
  '[Login Modal] Close Upsert Patient'
);

export const createPatient = createAction(
  '[Patient Page] Create Patient',
  props<{ patient: Patient }>()
);

export const createPatientSuccess = createAction(
  '[Patient API] Create Patient Success'
);

export const createPatientFailure = createAction(
  '[Patient API] Create Patient Failure'
);

export const updatePatient = createAction(
  '[Patient Page] Update Patient',
  props<{ patient: Patient }>()
);

export const updatePatientSuccess = createAction(
  '[Patient API] Update Patient Success'
);

export const updatePatientFailure = createAction(
  '[Patient API] Update Patient Failure'
);

export const deletePatient = createAction(
  '[Patient Page] Delete Patient',
  props<{ patient: Patient }>()
);

export const deletePatientSuccess = createAction(
  '[Patient API] Delete Patient Success'
);

export const deletePatientFailure = createAction(
  '[Patient API] Delete Patient Failure'
);

export const searchPatientsByQuery = createAction(
  '[Patient API] Search Patients By Query',
  props<{ query: string }>()
);

export const searchPatientsByQuerySuccess = createAction(
  '[Patient API] Search Patients By Query Success',
  props<{ patients: Patient[] }>()
);

export const searchPatientsByQueryFailure = createAction(
  '[Patient API] Search Patients By Query Failure'
);
