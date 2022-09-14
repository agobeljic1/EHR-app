import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ConditionState } from './condition.reducers';

export const selectConditions = (state: AppState) => state.conditionState;

export const selectAllConditions = createSelector(
  selectConditions,
  (state: ConditionState) => state.conditions
);

export const selectLoadingConditions = createSelector(
  selectConditions,
  (state: ConditionState) => state.loadingConditions
);

export const selectUpsertConditionOpen = createSelector(
  selectConditions,
  (state: ConditionState) => state.upsertConditionOpen
);

export const selectUpsertConditionData = createSelector(
  selectConditions,
  (state: ConditionState) => state.upsertConditionData
);

export const selectLoadingUpsertCondition = createSelector(
  selectConditions,
  (state: ConditionState) => state.loadingUpsertCondition
);

export const selectActiveDeleteConditionId = createSelector(
  selectConditions,
  (state: ConditionState) => state.activeDeleteConditionId
);
