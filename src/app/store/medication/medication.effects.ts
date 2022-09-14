import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom, tap } from 'rxjs';
import { MedicationService } from '../../services/medication.service';
import { MedicationActions } from '.';
import { EncounterSelectors } from '../encounter';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MedicationEffects {
  constructor(
    private actions$: Actions,
    private medicationService: MedicationService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  medications$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.loadMedications),
      withLatestFrom(
        this.store.select(EncounterSelectors.selectEncounterId as any)
      ),
      switchMap(([, encounterId]) => {
        return this.medicationService.getMedications(encounterId).pipe(
          map(({ medications }: any) => {
            return MedicationActions.loadMedicationsSuccess({
              medications,
            });
          }),
          catchError(() => {
            return of(
              MedicationActions.loadMedicationsFailure({
                message: 'Failed to load medications',
              })
            );
          })
        );
      })
    )
  );

  createMedication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.createMedication),
      withLatestFrom(
        this.store.select(EncounterSelectors.selectEncounterId as any)
      ),
      switchMap(([{ medication }, encounterId]) => {
        return this.medicationService
          .createMedication(medication, encounterId)
          .pipe(
            map(({ medication: createdMedication }: any) => {
              return MedicationActions.createMedicationSuccess({
                medication: createdMedication,
                message: 'Successfully created medication',
              });
            }),
            catchError(() => {
              return of(
                MedicationActions.createMedicationFailure({
                  message: 'Failed to create medication',
                })
              );
            })
          );
      })
    )
  );

  updateMedication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.updateMedication),
      switchMap(({ medication }) => {
        return this.medicationService.updateMedication(medication).pipe(
          map(() => {
            return MedicationActions.updateMedicationSuccess({
              message: 'Successfully updated medication',
            });
          }),
          catchError(() => {
            return of(
              MedicationActions.updateMedicationFailure({
                message: 'Failed to update medication',
              })
            );
          })
        );
      })
    )
  );

  deleteMedication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MedicationActions.deleteMedication),
      switchMap(({ medication }) => {
        return this.medicationService.deleteMedication(medication).pipe(
          map(() => {
            return MedicationActions.deleteMedicationSuccess({
              message: 'Successfully deleted medication',
            });
          }),
          catchError(() => {
            return of(
              MedicationActions.deleteMedicationFailure({
                message: 'Failed to delete medication',
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
        MedicationActions.createMedicationSuccess,
        MedicationActions.updateMedicationSuccess,
        MedicationActions.deleteMedicationSuccess
      ),
      map(() => {
        return MedicationActions.loadMedications();
      })
    )
  );

  closeUpsertMedication$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MedicationActions.createMedicationSuccess,
        MedicationActions.updateMedicationSuccess
      ),
      map(() => {
        return MedicationActions.closeUpsertMedication();
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        MedicationActions.loadMedicationsFailure,
        MedicationActions.createMedicationSuccess,
        MedicationActions.createMedicationFailure,
        MedicationActions.updateMedicationSuccess,
        MedicationActions.updateMedicationFailure,
        MedicationActions.deleteMedicationSuccess,
        MedicationActions.deleteMedicationFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => MedicationActions.showMessageSuccess())
    )
  );
}
