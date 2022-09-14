import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { Patient } from 'src/app/models/patient/Patient';
import { PatientService } from 'src/app/services/patient.service';
import { PatientActions } from '.';
import { EncounterActions } from '../encounter';

@Injectable()
export class PatientEffects {
  constructor(
    private actions$: Actions,
    private patientService: PatientService,
    private snackBar: MatSnackBar
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
            return of(
              PatientActions.loadPatientsFailure({
                message: 'Failed to load patients',
              })
            );
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
              message: 'Successfully created patient',
            });
          }),
          catchError(() => {
            return of(
              PatientActions.createPatientFailure({
                message: 'Failed to update patient',
              })
            );
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
            return PatientActions.updatePatientSuccess({
              message: 'Successfully updated patient',
            });
          }),
          catchError(() => {
            return of(
              PatientActions.updatePatientFailure({
                message: 'Failed to update patient',
              })
            );
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
            return PatientActions.deletePatientSuccess({
              message: 'Successfully deleted patient',
            });
          }),
          catchError(() => {
            return of(
              PatientActions.deletePatientFailure({
                message: 'Failed to delete patient',
              })
            );
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
            return PatientActions.searchPatientsByQuerySuccess({
              patients,
            });
          }),
          catchError((e) => {
            return of(
              PatientActions.searchPatientsByQueryFailure({
                message: 'Failed to search patients',
              })
            );
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

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        PatientActions.loadPatientsFailure,
        PatientActions.createPatientSuccess,
        PatientActions.createPatientFailure,
        PatientActions.updatePatientSuccess,
        PatientActions.updatePatientFailure,
        PatientActions.deletePatientSuccess,
        PatientActions.deletePatientFailure,
        PatientActions.searchPatientsByQueryFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => PatientActions.showMessageSuccess())
    )
  );
}
