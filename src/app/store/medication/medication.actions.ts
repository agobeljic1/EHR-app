import { createAction, props } from '@ngrx/store';
import { Medication } from 'src/app/models/medication/Medication';

export const loadMedications = createAction(
  '[Medication Page] Load Medications'
);

export const loadMedicationsSuccess = createAction(
  '[Medication API] Medications Load Success',
  props<{ medications: Medication[] }>()
);

export const loadMedicationsFailure = createAction(
  '[Medication API] Medications Load Failure',
  props<{ message: string }>()
);

export const openUpsertMedication = createAction(
  '[Login Modal] Open Upsert Medication',
  props<{ medication: Medication | null }>()
);

export const closeUpsertMedication = createAction(
  '[Login Modal] Close Upsert Medication'
);

export const createMedication = createAction(
  '[Medication Page] Create Medication',
  props<{ medication: Medication }>()
);

export const createMedicationSuccess = createAction(
  '[Medication API] Create Medication Success',
  props<{ medication: Medication; message: string }>()
);

export const createMedicationFailure = createAction(
  '[Medication API] Create Medication Failure',
  props<{ message: string }>()
);

export const updateMedication = createAction(
  '[Medication Page] Update Medication',
  props<{ medication: Medication }>()
);

export const updateMedicationSuccess = createAction(
  '[Medication API] Update Medication Success',
  props<{ message: string }>()
);

export const updateMedicationFailure = createAction(
  '[Medication API] Update Medication Failure',
  props<{ message: string }>()
);

export const deleteMedication = createAction(
  '[Medication Page] Delete Medication',
  props<{ medication: Medication }>()
);

export const deleteMedicationSuccess = createAction(
  '[Medication API] Delete Medication Success',
  props<{ message: string }>()
);

export const deleteMedicationFailure = createAction(
  '[Medication API] Delete Medication Failure',
  props<{ message: string }>()
);

export const showMessageSuccess = createAction(
  '[Medication API] Show Message Success'
);
