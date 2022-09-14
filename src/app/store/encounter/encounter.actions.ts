import { createAction, props } from '@ngrx/store';
import { Encounter } from 'src/app/models/encounter/Encounter';
import { Patient } from 'src/app/models/patient/Patient';

export const loadEncounters = createAction('[Encounter Page] Load Encounters');

export const loadEncountersSuccess = createAction(
  '[Encounter API] Encounters Load Success',
  props<{ encounters: Encounter[] }>()
);

export const loadEncountersFailure = createAction(
  '[Encounter API] Encounters Load Failure',
  props<{ message: string }>()
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
  '[Encounter API] Create Encounter Success',
  props<{ message: string }>()
);

export const createEncounterFailure = createAction(
  '[Encounter API] Create Encounter Failure',
  props<{ message: string }>()
);

export const updateEncounter = createAction(
  '[Encounter Page] Update Encounter',
  props<{ encounter: Encounter }>()
);

export const updateEncounterSuccess = createAction(
  '[Encounter API] Update Encounter Success',
  props<{ encounterId: string; message: string }>()
);

export const updateEncounterFailure = createAction(
  '[Encounter API] Update Encounter Failure',
  props<{ message: string }>()
);

export const deleteEncounter = createAction(
  '[Encounter Page] Delete Encounter',
  props<{ encounter: Encounter }>()
);

export const deleteEncounterSuccess = createAction(
  '[Encounter API] Delete Encounter Success',
  props<{ encounterId: string; message: string }>()
);

export const deleteEncounterFailure = createAction(
  '[Encounter API] Delete Encounter Failure',
  props<{ message: string }>()
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
  '[Patient Overview Page] Load Encounter By Id From Route Failure',
  props<{ message: string }>()
);

export const setEncounterId = createAction(
  '[Patient Overview Page] Set Encounter Id',
  props<{ encounterId: string }>()
);

export const dischargePatient = createAction(
  '[Encounter Details Page] Discharge Patient',
  props<{ encounter: Encounter }>()
);

export const dischargePatientSuccess = createAction(
  '[Encounter API] Discharge Patient Success',
  props<{ encounter: Encounter; message: string }>()
);

export const dischargePatientFailure = createAction(
  '[Encounter API] Discharge Patient Failure',
  props<{ message: string }>()
);

export const showMessageSuccess = createAction(
  '[Encounter API] Show Message Success'
);
