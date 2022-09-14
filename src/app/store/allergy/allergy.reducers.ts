import { createReducer, on } from '@ngrx/store';
import { Allergy } from 'src/app/models/allergy/Allergy';
import {
  closeUpsertAllergy,
  createAllergy,
  createAllergyFailure,
  createAllergySuccess,
  deleteAllergy,
  deleteAllergyFailure,
  deleteAllergySuccess,
  loadAllergys,
  loadAllergysFailure,
  loadAllergysSuccess,
  openUpsertAllergy,
  updateAllergy,
  updateAllergyFailure,
  updateAllergySuccess,
} from './allergy.actions';

export interface AllergyState {
  allergys: Allergy[];
  loadingAllergys: boolean;
  upsertAllergyOpen: boolean;
  upsertAllergyData: Allergy | null;
  loadingUpsertAllergy: boolean;
  activeDeleteAllergyId: string | null;
}

export const initialState: AllergyState = {
  allergys: [],
  loadingAllergys: false,
  upsertAllergyOpen: false,
  upsertAllergyData: null,
  loadingUpsertAllergy: false,
  activeDeleteAllergyId: null,
};

export const allergyReducer = createReducer(
  initialState,
  on(loadAllergys, (state) => ({ ...state, loadingAllergys: true })),
  on(loadAllergysSuccess, (state, { allergys }) => ({
    ...state,
    allergys,
    loadingAllergys: false,
  })),
  on(loadAllergysFailure, (state) => ({
    ...state,
    loadingAllergys: false,
  })),
  on(openUpsertAllergy, (state, { allergy }) => ({
    ...state,
    upsertAllergyData: allergy,
    upsertAllergyOpen: true,
  })),
  on(closeUpsertAllergy, (state) => ({
    ...state,
    upsertAllergyData: null,
    upsertAllergyOpen: false,
  })),
  on(createAllergy, (state) => ({
    ...state,
    loadingUpsertAllergy: true,
  })),
  on(createAllergySuccess, (state) => ({
    ...state,
    loadingUpsertAllergy: false,
  })),
  on(createAllergyFailure, (state) => ({
    ...state,
    loadingUpsertAllergy: false,
  })),
  on(updateAllergy, (state) => ({
    ...state,
    loadingUpsertAllergy: true,
  })),
  on(updateAllergySuccess, (state) => ({
    ...state,
    loadingUpsertAllergy: false,
  })),
  on(updateAllergyFailure, (state) => ({
    ...state,
    loadingUpsertAllergy: false,
  })),
  on(deleteAllergy, (state, { allergy }) => ({
    ...state,
    activeDeleteAllergyId: allergy.id,
  })),
  on(deleteAllergySuccess, (state) => ({
    ...state,
    activeDeleteAllergyId: null,
  })),
  on(deleteAllergyFailure, (state) => ({
    ...state,
    activeDeleteAllergyId: null,
  }))
);
