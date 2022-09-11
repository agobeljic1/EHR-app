import { createReducer, on } from '@ngrx/store';
import { Encounter } from 'src/app/models/encounter/Encounter';
import { Patient } from 'src/app/models/patient/Patient';
import {
  closeUpsertEncounter,
  createEncounter,
  createEncounterFailure,
  createEncounterSuccess,
  deleteEncounter,
  deleteEncounterFailure,
  deleteEncounterSuccess,
  loadEncounterByIdFromRoute,
  loadEncounterByIdFromRouteFailure,
  loadEncounterByIdFromRouteSuccess,
  loadEncounters,
  loadEncountersFailure,
  loadEncountersSuccess,
  openUpsertEncounter,
  setPatientForEncounter,
  updateEncounter,
  updateEncounterFailure,
  updateEncounterSuccess,
} from './encounter.actions';

export interface EncounterState {
  encounters: Encounter[];
  loadingEncounters: boolean;
  upsertEncounterOpen: boolean;
  upsertEncounterData: Encounter | null;
  loadingUpsertEncounter: boolean;
  loadingDeleteEncounter: boolean;
  loadingEncounterById: boolean;
  encounterById: Encounter | null;
  selectedPatientForEncounter: Patient | null;
}

export const initialState: EncounterState = {
  encounters: [],
  loadingEncounters: false,
  upsertEncounterOpen: false,
  upsertEncounterData: null,
  loadingUpsertEncounter: false,
  loadingDeleteEncounter: false,
  loadingEncounterById: false,
  encounterById: null,
  selectedPatientForEncounter: null,
};

export const encounterReducer = createReducer(
  initialState,
  on(loadEncounters, (state) => ({ ...state, loadingEncounters: true })),
  on(loadEncountersSuccess, (state, { encounters }) => ({
    ...state,
    encounters,
    loadingEncounters: false,
  })),
  on(loadEncountersFailure, (state) => ({
    ...state,
    loadingEncounters: false,
  })),
  on(openUpsertEncounter, (state, { encounter }) => ({
    ...state,
    upsertEncounterData: encounter,
    upsertEncounterOpen: true,
    selectedPatientForEncounter: null,
  })),
  on(closeUpsertEncounter, (state) => ({
    ...state,
    upsertEncounterData: null,
    upsertEncounterOpen: false,
    selectedPatientForEncounter: null,
  })),
  on(createEncounter, (state) => ({
    ...state,
    loadingUpsertEncounter: true,
  })),
  on(createEncounterSuccess, (state) => ({
    ...state,
    loadingUpsertEncounter: false,
  })),
  on(createEncounterFailure, (state) => ({
    ...state,
    loadingUpsertEncounter: false,
  })),
  on(updateEncounter, (state) => ({
    ...state,
    loadingUpsertEncounter: true,
  })),
  on(updateEncounterSuccess, (state) => ({
    ...state,
    loadingUpsertEncounter: false,
  })),
  on(updateEncounterFailure, (state) => ({
    ...state,
    loadingUpsertEncounter: false,
  })),
  on(deleteEncounter, (state, { encounter }) => ({
    ...state,
    activeDeleteEncounterId: encounter.id,
  })),
  on(deleteEncounterSuccess, (state) => ({
    ...state,
    activeDeleteEncounterId: null,
  })),
  on(deleteEncounterFailure, (state) => ({
    ...state,
    activeDeleteEncounterId: null,
  })),
  on(loadEncounterByIdFromRoute, (state) => ({
    ...state,
    loadingEncounterById: true,
  })),
  on(loadEncounterByIdFromRouteSuccess, (state, { encounter }) => ({
    ...state,
    loadingEncounterById: false,
    encounterById: encounter,
  })),
  on(loadEncounterByIdFromRouteFailure, (state) => ({
    ...state,
    loadingEncounterById: false,
    encounterById: null,
  })),
  on(setPatientForEncounter, (state, { patient }) => ({
    ...state,
    selectedPatientForEncounter: patient,
  }))
);
