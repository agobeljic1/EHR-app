import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom, tap } from 'rxjs';
import { AllergyService } from '../../services/allergy.service';
import { AllergyActions } from '.';
import { EncounterSelectors } from '../encounter';
import { AuthActions } from '../auth';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AllergyEffects {
  constructor(
    private actions$: Actions,
    private allergyService: AllergyService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  allergys$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllergyActions.loadAllergys),
      withLatestFrom(
        this.store.select(EncounterSelectors.selectEncounterId as any)
      ),
      switchMap(([, encounterId]) => {
        return this.allergyService.getAllergys(encounterId).pipe(
          map(({ allergys }: any) => {
            return AllergyActions.loadAllergysSuccess({
              allergys,
            });
          }),
          catchError(() => {
            return of(
              AllergyActions.loadAllergysFailure({
                message: 'Failed to load allergies',
              })
            );
          })
        );
      })
    )
  );

  createAllergy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllergyActions.createAllergy),
      withLatestFrom(
        this.store.select(EncounterSelectors.selectEncounterId as any)
      ),
      switchMap(([{ allergy }, encounterId]) => {
        return this.allergyService.createAllergy(allergy, encounterId).pipe(
          map(({ allergy: createdAllergy }: any) => {
            return AllergyActions.createAllergySuccess({
              allergy: createdAllergy,
              message: 'Successfully created allergy',
            });
          }),
          catchError(() => {
            return of(
              AllergyActions.createAllergyFailure({
                message: 'Failed to create allergy',
              })
            );
          })
        );
      })
    )
  );

  updateAllergy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllergyActions.updateAllergy),
      switchMap(({ allergy }) => {
        return this.allergyService.updateAllergy(allergy).pipe(
          map(() => {
            return AllergyActions.updateAllergySuccess({
              message: 'Successfully updated allergy',
            });
          }),
          catchError(() => {
            return of(
              AllergyActions.updateAllergyFailure({
                message: 'Failed to update allergy',
              })
            );
          })
        );
      })
    )
  );

  deleteAllergy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllergyActions.deleteAllergy),
      switchMap(({ allergy }) => {
        return this.allergyService.deleteAllergy(allergy).pipe(
          map(() => {
            return AllergyActions.deleteAllergySuccess({
              message: 'Successfully deleted allergy',
            });
          }),
          catchError(() => {
            return of(
              AllergyActions.deleteAllergyFailure({
                message: 'Failed to delete allergy',
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
        AllergyActions.createAllergySuccess,
        AllergyActions.updateAllergySuccess,
        AllergyActions.deleteAllergySuccess
      ),
      map(() => {
        return AllergyActions.loadAllergys();
      })
    )
  );

  closeUpsertAllergy$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AllergyActions.createAllergySuccess,
        AllergyActions.updateAllergySuccess
      ),
      map(() => {
        return AllergyActions.closeUpsertAllergy();
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AllergyActions.loadAllergysFailure,
        AllergyActions.createAllergySuccess,
        AllergyActions.createAllergyFailure,
        AllergyActions.updateAllergySuccess,
        AllergyActions.updateAllergyFailure,
        AllergyActions.deleteAllergySuccess,
        AllergyActions.deleteAllergyFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => AllergyActions.showMessageSuccess())
    )
  );
}
