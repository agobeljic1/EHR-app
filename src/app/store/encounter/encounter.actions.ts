import { ActivatedRoute } from '@angular/router';
import { createAction, props } from '@ngrx/store';
import { Encounter } from 'src/app/models/encounter/Encounter';
import { Patient } from 'src/app/models/patient/Patient';
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
  '[Encounters Page] Show Patient Overview',
  props<{ encounter: Encounter }>()
);

export const setPatientForEncounter = createAction(
  '[Encounters Page] Set Patient For Encounter',
  props<{ patient: Patient }>()
);

export const showEncounterDetailsSuccess = createAction(
  '[Encounters Page] Show Patient Overview Success'
);

export const showEncountersSuccess = createAction(
  '[Patient Overview Page] Show Encounters Success'
);

export const loadEncounterByIdFromRoute = createAction(
  '[Patient Overview Page] Load Encounter By Id From Route',
  props<{ encounterId: string }>()
);

export const loadEncounterByIdFromRouteSuccess = createAction(
  '[Patient Overview Page] Load Encounter By Id From Route Success',
  props<{ encounter: Encounter }>()
);

export const loadEncounterByIdFromRouteFailure = createAction(
  '[Patient Overview Page] Load Encounter By Id From Route Failure'
);

export const setEncounterId = createAction(
  '[Patient Overview Page] Set Encounter Id',
  props<{ encounterId: string }>()
);
