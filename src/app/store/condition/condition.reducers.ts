import { createReducer, on } from '@ngrx/store';
import { Condition } from 'src/app/models/condition/Condition';
import {
  closeUpsertCondition,
  createCondition,
  createConditionFailure,
  createConditionSuccess,
  deleteCondition,
  deleteConditionFailure,
  deleteConditionSuccess,
  loadConditions,
  loadConditionsFailure,
  loadConditionsSuccess,
  openUpsertCondition,
  searchConditionsByQuery,
  searchConditionsByQueryFailure,
  searchConditionsByQuerySuccess,
  updateCondition,
  updateConditionFailure,
  updateConditionSuccess,
} from './condition.actions';

export interface ConditionState {
  conditions: Condition[];
  loadingConditions: boolean;
  upsertConditionOpen: boolean;
  upsertConditionData: Condition | null;
  loadingUpsertCondition: boolean;
  activeDeleteConditionId: string | null;
  loadingSearchConditionsByQuery: boolean;
  foundConditionsByQuery: Condition[];
}

export const initialState: ConditionState = {
  conditions: [],
  loadingConditions: false,
  upsertConditionOpen: false,
  upsertConditionData: null,
  loadingUpsertCondition: false,
  activeDeleteConditionId: null,
  loadingSearchConditionsByQuery: false,
  foundConditionsByQuery: [],
};

export const conditionReducer = createReducer(
  initialState,
  on(loadConditions, (state) => ({ ...state, loadingConditions: true })),
  on(loadConditionsSuccess, (state, { conditions }) => ({
    ...state,
    conditions,
    loadingConditions: false,
  })),
  on(loadConditionsFailure, (state) => ({
    ...state,
    loadingConditions: false,
  })),
  on(openUpsertCondition, (state, { condition }) => ({
    ...state,
    upsertConditionData: condition,
    upsertConditionOpen: true,
  })),
  on(closeUpsertCondition, (state) => ({
    ...state,
    upsertConditionData: null,
    upsertConditionOpen: false,
  })),
  on(createCondition, (state) => ({
    ...state,
    loadingUpsertCondition: true,
  })),
  on(createConditionSuccess, (state) => ({
    ...state,
    loadingUpsertCondition: false,
  })),
  on(createConditionFailure, (state) => ({
    ...state,
    loadingUpsertCondition: false,
  })),
  on(updateCondition, (state) => ({
    ...state,
    loadingUpsertCondition: true,
  })),
  on(updateConditionSuccess, (state) => ({
    ...state,
    loadingUpsertCondition: false,
  })),
  on(updateConditionFailure, (state) => ({
    ...state,
    loadingUpsertCondition: false,
  })),
  on(deleteCondition, (state, { condition }) => ({
    ...state,
    activeDeleteConditionId: condition.id,
  })),
  on(deleteConditionSuccess, (state) => ({
    ...state,
    activeDeleteConditionId: null,
  })),
  on(deleteConditionFailure, (state) => ({
    ...state,
    activeDeleteConditionId: null,
  })),
  on(searchConditionsByQuery, (state) => ({
    ...state,
    loadingSearchConditionsByQuery: true,
  })),
  on(searchConditionsByQuerySuccess, (state, { conditions }) => ({
    ...state,
    loadingSearchConditionsByQuery: false,
    foundConditionsByQuery: conditions,
  })),
  on(searchConditionsByQueryFailure, (state) => ({
    ...state,
    loadingSearchConditionsByQuery: false,
  }))
);
