import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of } from 'rxjs';
import { Patient } from 'src/app/models/patient/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { PatientActions } from '.';
import { EncounterActions } from '../encounter';

@Injectable()
export class PatientEffects {
  constructor(
    private actions$: Actions,
    private patientService: PatientService
  ) {}

  patients$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.loadPatients),
      switchMap(() => {
        return this.patientService.getPatients().pipe(
          map(({ patients }: any) => {
            return PatientActions.loadPatientsSuccess({
              patients,
            });
          }),
          catchError(() => {
            return of(PatientActions.loadPatientsFailure());
          })
        );
      })
    )
  );

  createPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.createPatient),
      switchMap(({ patient }) => {
        return this.patientService.createPatient(patient).pipe(
          map(({ patient: createdPatient }: any) => {
            return PatientActions.createPatientSuccess({
              patient: createdPatient,
            });
          }),
          catchError(() => {
            return of(PatientActions.createPatientFailure());
          })
        );
      })
    )
  );

  updatePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.updatePatient),
      switchMap(({ patient }) => {
        return this.patientService.updatePatient(patient).pipe(
          map(() => {
            return PatientActions.updatePatientSuccess();
          }),
          catchError(() => {
            return of(PatientActions.updatePatientFailure());
          })
        );
      })
    )
  );

  deletePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.deletePatient),
      switchMap(({ patient }) => {
        return this.patientService.deletePatient(patient).pipe(
          map(() => {
            return PatientActions.deletePatientSuccess();
          }),
          catchError(() => {
            return of(PatientActions.deletePatientFailure());
          })
        );
      })
    )
  );

  refetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PatientActions.createPatientSuccess,
        PatientActions.updatePatientSuccess,
        PatientActions.deletePatientSuccess
      ),
      map(() => {
        return PatientActions.loadPatients();
      })
    )
  );

  closeUpsertPatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PatientActions.createPatientSuccess,
        PatientActions.updatePatientSuccess
      ),
      map(() => {
        return PatientActions.closeUpsertPatient();
      })
    )
  );

  searchPatientsByQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.searchPatientsByQuery),
      switchMap(({ query }) => {
        return this.patientService.getPatients(query).pipe(
          map(({ patients }: any) => {
            console.log('patients');
            console.log(patients);
            return PatientActions.searchPatientsByQuerySuccess({
              patients,
            });
          }),
          catchError((e) => {
            console.log('patientssss');
            console.log(e);
            return of(PatientActions.searchPatientsByQueryFailure());
          })
        );
      })
    )
  );

  setPatientForEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PatientActions.createPatientSuccess),
      map(({ patient }) => {
        return EncounterActions.setPatientForEncounter({ patient });
      })
    )
  );
}
