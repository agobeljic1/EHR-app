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

export const selectedPatientForEncounter = createSelector(
  selectEncounters,
  (state: EncounterState) => state.selectedPatientForEncounter
);

export const selectEncounterId = createSelector(
  selectEncounters,
  (state: EncounterState) => state.encounterId
);

export const selectLoadingDischargePatient = createSelector(
  selectEncounters,
  (state: EncounterState) => state.loadingDischargePatient
);
