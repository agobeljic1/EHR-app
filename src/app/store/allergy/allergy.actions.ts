import { createAction, props } from '@ngrx/store';
import { Allergy } from 'src/app/models/allergy/Allergy';

export const loadAllergys = createAction('[Allergy Page] Load Allergys');

export const loadAllergysSuccess = createAction(
  '[Allergy API] Allergys Load Success',
  props<{ allergys: Allergy[] }>()
);

export const loadAllergysFailure = createAction(
  '[Allergy API] Allergys Load Failure',
  props<{ message: string }>()
);

export const openUpsertAllergy = createAction(
  '[Login Modal] Open Upsert Allergy',
  props<{ allergy: Allergy | null }>()
);

export const closeUpsertAllergy = createAction(
  '[Login Modal] Close Upsert Allergy'
);

export const createAllergy = createAction(
  '[Allergy Page] Create Allergy',
  props<{ allergy: Allergy }>()
);

export const createAllergySuccess = createAction(
  '[Allergy API] Create Allergy Success',
  props<{ allergy: Allergy; message: string }>()
);

export const createAllergyFailure = createAction(
  '[Allergy API] Create Allergy Failure',
  props<{ message: string }>()
);

export const updateAllergy = createAction(
  '[Allergy Page] Update Allergy',
  props<{ allergy: Allergy }>()
);

export const updateAllergySuccess = createAction(
  '[Allergy API] Update Allergy Success',
  props<{ message: string }>()
);

export const updateAllergyFailure = createAction(
  '[Allergy API] Update Allergy Failure',
  props<{ message: string }>()
);

export const deleteAllergy = createAction(
  '[Allergy Page] Delete Allergy',
  props<{ allergy: Allergy }>()
);

export const deleteAllergySuccess = createAction(
  '[Allergy API] Delete Allergy Success',
  props<{ message: string }>()
);

export const deleteAllergyFailure = createAction(
  '[Allergy API] Delete Allergy Failure',
  props<{ message: string }>()
);

export const showMessageSuccess = createAction(
  '[Allergy API] Show Message Success'
);
