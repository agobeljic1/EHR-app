import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { AllergyState } from './allergy.reducers';

export const selectAllergys = (state: AppState) => state.allergyState;

export const selectAllAllergys = createSelector(
  selectAllergys,
  (state: AllergyState) => state.allergys
);

export const selectLoadingAllergys = createSelector(
  selectAllergys,
  (state: AllergyState) => state.loadingAllergys
);

export const selectUpsertAllergyOpen = createSelector(
  selectAllergys,
  (state: AllergyState) => state.upsertAllergyOpen
);

export const selectUpsertAllergyData = createSelector(
  selectAllergys,
  (state: AllergyState) => state.upsertAllergyData
);

export const selectLoadingUpsertAllergy = createSelector(
  selectAllergys,
  (state: AllergyState) => state.loadingUpsertAllergy
);

export const selectActiveDeleteAllergyId = createSelector(
  selectAllergys,
  (state: AllergyState) => state.activeDeleteAllergyId
);

export const selectLoadingSearchAllergysByQuery = createSelector(
  selectAllergys,
  (state: AllergyState) => state.loadingSearchAllergysByQuery
);

export const selectFoundAllergysByQuery = createSelector(
  selectAllergys,
  (state: AllergyState) => state.foundAllergysByQuery
);
