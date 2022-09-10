import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { EncounterState } from './encounter.reducers';

export const selectEncounters = (state: AppState) => state.encounterState;

export const selectAllEncounters = createSelector(
  selectEncounters,
  (state: EncounterState) => state.encounters
);

export const selectLoadingEncounters = createSelector(
  selectEncounters,
  (state: EncounterState) => state.loadingEncounters
);

export const selectUpsertEncounterOpen = createSelector(
  selectEncounters,
  (state: EncounterState) => state.upsertEncounterOpen
);

export const selectUpsertEncounterData = createSelector(
  selectEncounters,
  (state: EncounterState) => state.upsertEncounterData
);

export const selectLoadingUpsertEncounter = createSelector(
  selectEncounters,
  (state: EncounterState) => state.loadingUpsertEncounter
);

export const selectLoadingDeleteEncounter = createSelector(
  selectEncounters,
  (state: EncounterState) => state.loadingDeleteEncounter
);

export const selectEncounterById = createSelector(
  selectEncounters,
  (state: EncounterState) => state.encounterById
);

export const selectLoadingEncounterById = createSelector(
  selectEncounters,
  (state: EncounterState) => state.loadingEncounterById
);

export const selectAddUserToEncounterOpen = createSelector(
  selectEncounters,
  (state: EncounterState) => state.addUserToEncounterOpen
);

export const selectAddUserToEncounterData = createSelector(
  selectEncounters,
  (state: EncounterState) => state.addUserToEncounterData
);

export const selectLoadingAddUserToEncounter = createSelector(
  selectEncounters,
  (state: EncounterState) => state.loadingAddUserToEncounter
);

export const selectActiveRemovingUserIdFromEncounter = createSelector(
  selectEncounters,
  (state: EncounterState) => state.activeRemovingUserIdFromEncounter
);

export const selectActiveUserToAddToEncounter = createSelector(
  selectEncounters,
  (state: EncounterState) => state.activeUserToAddToEncounter
);

export const selectEncounterUsersById = createSelector(
  selectEncounters,
  (state: EncounterState) => state.encounterUsersById
);

export const selectLoadingEncounterUsersById = createSelector(
  selectEncounters,
  (state: EncounterState) => state.loadingEncounterUsersById
);
