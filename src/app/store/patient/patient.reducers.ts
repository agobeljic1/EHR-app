import { createReducer, on } from '@ngrx/store';
import { Patient } from 'src/app/models/patient/Patient';
import {
  closeUpsertPatient,
  createPatient,
  createPatientFailure,
  createPatientSuccess,
  deletePatient,
  deletePatientFailure,
  deletePatientSuccess,
  loadPatients,
  loadPatientsFailure,
  loadPatientsSuccess,
  openUpsertPatient,
  searchPatientsByQuery,
  searchPatientsByQueryFailure,
  searchPatientsByQuerySuccess,
  updatePatient,
  updatePatientFailure,
  updatePatientSuccess,
} from './patient.actions';

export interface PatientState {
  patients: Patient[];
  loadingPatients: boolean;
  upsertPatientOpen: boolean;
  upsertPatientData: Patient | null;
  loadingUpsertPatient: boolean;
  activeDeletePatientId: string | null;
  loadingSearchPatientsByQuery: boolean;
  foundPatientsByQuery: Patient[];
}

export const initialState: PatientState = {
  patients: [],
  loadingPatients: false,
  upsertPatientOpen: false,
  upsertPatientData: null,
  loadingUpsertPatient: false,
  activeDeletePatientId: null,
  loadingSearchPatientsByQuery: false,
  foundPatientsByQuery: [],
};

export const patientReducer = createReducer(
  initialState,
  on(loadPatients, (state) => ({ ...state, loadingPatients: true })),
  on(loadPatientsSuccess, (state, { patients }) => ({
    ...state,
    patients,
    loadingPatients: false,
  })),
  on(loadPatientsFailure, (state) => ({
    ...state,
    loadingPatients: false,
  })),
  on(openUpsertPatient, (state, { patient }) => ({
    ...state,
    upsertPatientData: patient,
    upsertPatientOpen: true,
  })),
  on(closeUpsertPatient, (state) => ({
    ...state,
    upsertPatientData: null,
    upsertPatientOpen: false,
  })),
  on(createPatient, (state) => ({
    ...state,
    loadingUpsertPatient: true,
  })),
  on(createPatientSuccess, (state) => ({
    ...state,
    loadingUpsertPatient: false,
  })),
  on(createPatientFailure, (state) => ({
    ...state,
    loadingUpsertPatient: false,
  })),
  on(updatePatient, (state) => ({
    ...state,
    loadingUpsertPatient: true,
  })),
  on(updatePatientSuccess, (state) => ({
    ...state,
    loadingUpsertPatient: false,
  })),
  on(updatePatientFailure, (state) => ({
    ...state,
    loadingUpsertPatient: false,
  })),
  on(deletePatient, (state, { patient }) => ({
    ...state,
    activeDeletePatientId: patient.id,
  })),
  on(deletePatientSuccess, (state) => ({
    ...state,
    activeDeletePatientId: null,
  })),
  on(deletePatientFailure, (state) => ({
    ...state,
    activeDeletePatientId: null,
  })),
  on(searchPatientsByQuery, (state) => ({
    ...state,
    loadingSearchPatientsByQuery: true,
  })),
  on(searchPatientsByQuerySuccess, (state, { patients }) => ({
    ...state,
    loadingSearchPatientsByQuery: false,
    foundPatientsByQuery: patients,
  })),
  on(searchPatientsByQueryFailure, (state) => ({
    ...state,
    loadingSearchPatientsByQuery: false,
  }))
);
