import { createAction, props } from '@ngrx/store';
import { Condition } from 'src/app/models/condition/Condition';

export const loadConditions = createAction('[Condition Page] Load Conditions');

export const loadConditionsSuccess = createAction(
  '[Condition API] Conditions Load Success',
  props<{ conditions: Condition[] }>()
);

export const loadConditionsFailure = createAction(
  '[Condition API] Conditions Load Failure',
  props<{ message: string }>()
);

export const openUpsertCondition = createAction(
  '[Login Modal] Open Upsert Condition',
  props<{ condition: Condition | null }>()
);

export const closeUpsertCondition = createAction(
  '[Login Modal] Close Upsert Condition'
);

export const createCondition = createAction(
  '[Condition Page] Create Condition',
  props<{ condition: Condition }>()
);

export const createConditionSuccess = createAction(
  '[Condition API] Create Condition Success',
  props<{ condition: Condition; message: string }>()
);

export const createConditionFailure = createAction(
  '[Condition API] Create Condition Failure',
  props<{ message: string }>()
);

export const updateCondition = createAction(
  '[Condition Page] Update Condition',
  props<{ condition: Condition }>()
);

export const updateConditionSuccess = createAction(
  '[Condition API] Update Condition Success',
  props<{ message: string }>()
);

export const updateConditionFailure = createAction(
  '[Condition API] Update Condition Failure',
  props<{ message: string }>()
);

export const deleteCondition = createAction(
  '[Condition Page] Delete Condition',
  props<{ condition: Condition }>()
);

export const deleteConditionSuccess = createAction(
  '[Condition API] Delete Condition Success',
  props<{ message: string }>()
);

export const deleteConditionFailure = createAction(
  '[Condition API] Delete Condition Failure',
  props<{ message: string }>()
);

export const showMessageSuccess = createAction(
  '[Condition API] Show Message Success'
);
