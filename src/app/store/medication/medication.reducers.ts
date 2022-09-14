import { createReducer, on } from '@ngrx/store';
import { Medication } from 'src/app/models/medication/Medication';
import {
  closeUpsertMedication,
  createMedication,
  createMedicationFailure,
  createMedicationSuccess,
  deleteMedication,
  deleteMedicationFailure,
  deleteMedicationSuccess,
  loadMedications,
  loadMedicationsFailure,
  loadMedicationsSuccess,
  openUpsertMedication,
  updateMedication,
  updateMedicationFailure,
  updateMedicationSuccess,
} from './medication.actions';

export interface MedicationState {
  medications: Medication[];
  loadingMedications: boolean;
  upsertMedicationOpen: boolean;
  upsertMedicationData: Medication | null;
  loadingUpsertMedication: boolean;
  activeDeleteMedicationId: string | null;
}

export const initialState: MedicationState = {
  medications: [],
  loadingMedications: false,
  upsertMedicationOpen: false,
  upsertMedicationData: null,
  loadingUpsertMedication: false,
  activeDeleteMedicationId: null,
};

export const medicationReducer = createReducer(
  initialState,
  on(loadMedications, (state) => ({ ...state, loadingMedications: true })),
  on(loadMedicationsSuccess, (state, { medications }) => ({
    ...state,
    medications,
    loadingMedications: false,
  })),
  on(loadMedicationsFailure, (state) => ({
    ...state,
    loadingMedications: false,
  })),
  on(openUpsertMedication, (state, { medication }) => ({
    ...state,
    upsertMedicationData: medication,
    upsertMedicationOpen: true,
  })),
  on(closeUpsertMedication, (state) => ({
    ...state,
    upsertMedicationData: null,
    upsertMedicationOpen: false,
  })),
  on(createMedication, (state) => ({
    ...state,
    loadingUpsertMedication: true,
  })),
  on(createMedicationSuccess, (state) => ({
    ...state,
    loadingUpsertMedication: false,
  })),
  on(createMedicationFailure, (state) => ({
    ...state,
    loadingUpsertMedication: false,
  })),
  on(updateMedication, (state) => ({
    ...state,
    loadingUpsertMedication: true,
  })),
  on(updateMedicationSuccess, (state) => ({
    ...state,
    loadingUpsertMedication: false,
  })),
  on(updateMedicationFailure, (state) => ({
    ...state,
    loadingUpsertMedication: false,
  })),
  on(deleteMedication, (state, { medication }) => ({
    ...state,
    activeDeleteMedicationId: medication.id,
  })),
  on(deleteMedicationSuccess, (state) => ({
    ...state,
    activeDeleteMedicationId: null,
  })),
  on(deleteMedicationFailure, (state) => ({
    ...state,
    activeDeleteMedicationId: null,
  }))
);
