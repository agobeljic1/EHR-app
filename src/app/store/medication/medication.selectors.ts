import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MedicationState } from './medication.reducers';

export const selectMedications = (state: AppState) => state.medicationState;

export const selectAllMedications = createSelector(
  selectMedications,
  (state: MedicationState) => state.medications
);

export const selectLoadingMedications = createSelector(
  selectMedications,
  (state: MedicationState) => state.loadingMedications
);

export const selectUpsertMedicationOpen = createSelector(
  selectMedications,
  (state: MedicationState) => state.upsertMedicationOpen
);

export const selectUpsertMedicationData = createSelector(
  selectMedications,
  (state: MedicationState) => state.upsertMedicationData
);

export const selectLoadingUpsertMedication = createSelector(
  selectMedications,
  (state: MedicationState) => state.loadingUpsertMedication
);

export const selectActiveDeleteMedicationId = createSelector(
  selectMedications,
  (state: MedicationState) => state.activeDeleteMedicationId
);
