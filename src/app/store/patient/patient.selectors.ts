import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { PatientState } from './patient.reducers';

export const selectPatients = (state: AppState) => state.patientState;

export const selectAllPatients = createSelector(
  selectPatients,
  (state: PatientState) => state.patients
);

export const selectLoadingPatients = createSelector(
  selectPatients,
  (state: PatientState) => state.loadingPatients
);

export const selectUpsertPatientOpen = createSelector(
  selectPatients,
  (state: PatientState) => state.upsertPatientOpen
);

export const selectUpsertPatientData = createSelector(
  selectPatients,
  (state: PatientState) => state.upsertPatientData
);

export const selectLoadingUpsertPatient = createSelector(
  selectPatients,
  (state: PatientState) => state.loadingUpsertPatient
);

export const selectActiveDeletePatientId = createSelector(
  selectPatients,
  (state: PatientState) => state.activeDeletePatientId
);

export const selectLoadingSearchPatientsByQuery = createSelector(
  selectPatients,
  (state: PatientState) => state.loadingSearchPatientsByQuery
);

export const selectFoundPatientsByQuery = createSelector(
  selectPatients,
  (state: PatientState) => state.foundPatientsByQuery
);
