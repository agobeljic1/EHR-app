import { createAction, props } from '@ngrx/store';
import { Allergy } from 'src/app/models/allergy/Allergy';

export const loadAllergys = createAction('[Allergy Page] Load Allergys');

export const loadAllergysSuccess = createAction(
  '[Allergy API] Allergys Load Success',
  props<{ allergys: Allergy[] }>()
);

export const loadAllergysFailure = createAction(
  '[Allergy API] Allergys Load Failure'
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
  props<{ allergy: Allergy }>()
);

export const createAllergyFailure = createAction(
  '[Allergy API] Create Allergy Failure'
);

export const updateAllergy = createAction(
  '[Allergy Page] Update Allergy',
  props<{ allergy: Allergy }>()
);

export const updateAllergySuccess = createAction(
  '[Allergy API] Update Allergy Success'
);

export const updateAllergyFailure = createAction(
  '[Allergy API] Update Allergy Failure'
);

export const deleteAllergy = createAction(
  '[Allergy Page] Delete Allergy',
  props<{ allergy: Allergy }>()
);

export const deleteAllergySuccess = createAction(
  '[Allergy API] Delete Allergy Success'
);

export const deleteAllergyFailure = createAction(
  '[Allergy API] Delete Allergy Failure'
);

export const searchAllergysByQuery = createAction(
  '[Allergy API] Search Allergys By Query',
  props<{ query: string }>()
);

export const searchAllergysByQuerySuccess = createAction(
  '[Allergy API] Search Allergys By Query Success',
  props<{ allergys: Allergy[] }>()
);

export const searchAllergysByQueryFailure = createAction(
  '[Allergy API] Search Allergys By Query Failure'
);
