import { ActivatedRoute } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import { Encounter } from 'src/app/models/encounter/Encounter';
import { User } from 'src/app/models/user/User';

export const loadEncounters = createAction('[Encounter Page] Load Encounters');

export const loadEncountersSuccess = createAction(
  '[Encounter API] Encounters Load Success',
  props<{ encounters: Encounter[] }>()
);

export const loadEncountersFailure = createAction(
  '[Encounter API] Encounters Load Failure'
);

export const openUpsertEncounter = createAction(
  '[Login Modal] Open Upsert Encounter',
  props<{ encounter: Encounter | null }>()
);

export const closeUpsertEncounter = createAction(
  '[Login Modal] Close Upsert Encounter'
);

export const createEncounter = createAction(
  '[Encounter Page] Create Encounter',
  props<{ encounter: Encounter }>()
);

export const createEncounterSuccess = createAction(
  '[Encounter API] Create Encounter Success'
);

export const createEncounterFailure = createAction(
  '[Encounter API] Create Encounter Failure'
);

export const updateEncounter = createAction(
  '[Encounter Page] Update Encounter',
  props<{ encounter: Encounter }>()
);

export const updateEncounterSuccess = createAction(
  '[Encounter API] Update Encounter Success',
  props<{ encounterId: string }>()
);

export const updateEncounterFailure = createAction(
  '[Encounter API] Update Encounter Failure'
);

export const deleteEncounter = createAction(
  '[Encounter Page] Delete Encounter',
  props<{ encounter: Encounter }>()
);

export const deleteEncounterSuccess = createAction(
  '[Encounter API] Delete Encounter Success',
  props<{ encounterId: string }>()
);

export const deleteEncounterFailure = createAction(
  '[Encounter API] Delete Encounter Failure'
);

export const showEncounterDetails = createAction(
  '[Encounters Page] Show Encounter Details',
  props<{ encounter: Encounter }>()
);

export const showEncounterDetailsSuccess = createAction(
  '[Encounters Page] Show Encounter Details Success'
);

export const showEncountersSuccess = createAction(
  '[Encounter Details Page] Show Encounters Success'
);

export const loadEncounterByIdFromRoute = createAction(
  '[Encounter Details Page] Load Encounter By Id From Route',
  props<{ encounterId: string }>()
);

export const loadEncounterByIdFromRouteSuccess = createAction(
  '[Encounter Details Page] Load Encounter By Id From Route Success',
  props<{ encounter: Encounter }>()
);

export const loadEncounterByIdFromRouteFailure = createAction(
  '[Encounter Details Page] Load Encounter By Id From Route Failure'
);

export const loadEncounterUsersByIdFromRoute = createAction(
  '[Encounter Details Page] Load Encounter Users By Id From Route',
  props<{ encounterId: string }>()
);

export const loadEncounterUsersByIdFromRouteSuccess = createAction(
  '[Encounter Details Page] Load Encounter Users By Id From Route Success',
  props<{ encounterId: string; users: User[] }>()
);

export const loadEncounterUsersByIdFromRouteFailure = createAction(
  '[Encounter Details Page] Load Encounter Users By Id From Route Failure'
);

export const openAddUserToEncounter = createAction(
  '[Encounter Details Page] Open Add User To Encounter',
  props<{ encounter: Encounter }>()
);

export const closeAddUserToEncounter = createAction(
  '[Encounter Details Page] Close Add User To Encounter'
);

export const addNewUserToEncounter = createAction(
  '[Encounter Details Page] Add New User To Encounter',
  props<{ encounter: Encounter; user: User }>()
);

export const addNewUserToEncounterSuccess = createAction(
  '[Encounter API] Add New User To Encounter Success',
  props<{ encounterId: string }>()
);

export const addNewUserToEncounterFailure = createAction(
  '[Encounter API] Add New User To Encounter Failure'
);

export const removeUserFromEncounter = createAction(
  '[Encounter Details Page] Remove User From Encounter',
  props<{ encounter: Encounter; user: User }>()
);

export const removeUserFromEncounterSuccess = createAction(
  '[Encounter API] Remove User From Encounter Success',
  props<{ encounterId: string }>()
);

export const removeUserFromEncounterFailure = createAction(
  '[Encounter API] Remove User From Encounter Failure'
);

export const setActiveUserToAddToEncounter = createAction(
  '[Encounter Details Page] Select Active User To Add To Encounter',
  props<{ user: User }>()
);

export const setEncounterId = createAction(
  '[Encounter Details Page] Set Encounter Id',
  props<{ user: User }>()
);

export const loadEncounterUsers = createAction(
  '[Encounter Details Page] Load Encounter Users',
  props<{ encounter: Encounter }>()
);
