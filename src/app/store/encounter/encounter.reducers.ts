import { createReducer, on } from '@ngrx/store';
import { Encounter } from 'src/app/models/encounter/Encounter';
import { User } from 'src/app/models/user/User';
import {
  addNewUserToEncounter,
  addNewUserToEncounterFailure,
  addNewUserToEncounterSuccess,
  closeAddUserToEncounter,
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
  loadEncounterUsersByIdFromRoute,
  loadEncounterUsersByIdFromRouteFailure,
  loadEncounterUsersByIdFromRouteSuccess,
  openAddUserToEncounter,
  openUpsertEncounter,
  removeUserFromEncounter,
  removeUserFromEncounterFailure,
  removeUserFromEncounterSuccess,
  setActiveUserToAddToEncounter,
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
  loadingEncounterUsersById: boolean;
  encounterById: Encounter | null;
  encounterUsersById: User[] | null;
  addUserToEncounterOpen: boolean;
  addUserToEncounterData: Encounter | null;
  activeRemovingUserIdFromEncounter: string | null;
  loadingAddUserToEncounter: boolean;
  activeUserToAddToEncounter: User | null;
}

export const initialState: EncounterState = {
  encounters: [],
  loadingEncounters: false,
  upsertEncounterOpen: false,
  upsertEncounterData: null,
  loadingUpsertEncounter: false,
  loadingDeleteEncounter: false,
  loadingEncounterById: false,
  loadingEncounterUsersById: false,
  encounterById: null,
  encounterUsersById: null,
  addUserToEncounterOpen: false,
  addUserToEncounterData: null,
  activeRemovingUserIdFromEncounter: null,
  loadingAddUserToEncounter: false,
  activeUserToAddToEncounter: null,
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
  })),
  on(closeUpsertEncounter, (state) => ({
    ...state,
    upsertEncounterData: null,
    upsertEncounterOpen: false,
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
  on(loadEncounterUsersByIdFromRoute, (state) => ({
    ...state,
    loadingEncounterUsersById: true,
  })),
  on(loadEncounterUsersByIdFromRouteSuccess, (state, { users }) => ({
    ...state,
    loadingEncounterUsersById: false,
    encounterUsersById: users,
  })),
  on(loadEncounterUsersByIdFromRouteFailure, (state) => ({
    ...state,
    loadingEncounterUsersById: false,
    encounterUsersById: null,
  })),
  on(openAddUserToEncounter, (state, { encounter }) => ({
    ...state,
    addUserToEncounterOpen: true,
    addUserToEncounterData: encounter,
  })),
  on(closeAddUserToEncounter, (state) => ({
    ...state,
    addUserToEncounterOpen: false,
    addUserToEncounterData: null,
    activeUserToAddToEncounter: null,
  })),
  on(addNewUserToEncounter, (state) => ({
    ...state,
    loadingAddUserToEncounter: true,
  })),
  on(addNewUserToEncounterSuccess, (state) => ({
    ...state,
    loadingAddUserToEncounter: false,
    activeUserToAddToEncounter: null,
  })),
  on(addNewUserToEncounterFailure, (state) => ({
    ...state,
    loadingAddUserToEncounter: false,
  })),
  on(removeUserFromEncounter, (state, { user }) => ({
    ...state,
    activeRemovingUserIdFromEncounter: user.id,
  })),
  on(removeUserFromEncounterSuccess, (state) => ({
    ...state,
    activeRemovingUserIdFromEncounter: null,
  })),
  on(removeUserFromEncounterFailure, (state) => ({
    ...state,
    activeRemovingUserIdFromEncounter: null,
  })),
  on(setActiveUserToAddToEncounter, (state, { user }) => ({
    ...state,
    activeUserToAddToEncounter: user,
  }))
);
