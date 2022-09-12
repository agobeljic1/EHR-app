import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { Allergy } from 'src/app/models/allergy/Allergy';
import { AllergyService } from '../../services/allergy.service';
import { AllergyActions } from '.';
import { EncounterActions, EncounterSelectors } from '../encounter';

@Injectable()
export class AllergyEffects {
  constructor(
    private actions$: Actions,
    private allergyService: AllergyService,
    private store: Store
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
            return of(AllergyActions.loadAllergysFailure());
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
            });
          }),
          catchError(() => {
            return of(AllergyActions.createAllergyFailure());
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
            return AllergyActions.updateAllergySuccess();
          }),
          catchError(() => {
            return of(AllergyActions.updateAllergyFailure());
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
            return AllergyActions.deleteAllergySuccess();
          }),
          catchError(() => {
            return of(AllergyActions.deleteAllergyFailure());
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

  searchAllergysByQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllergyActions.searchAllergysByQuery),
      switchMap(({ query }) => {
        return this.allergyService.getAllergys(query).pipe(
          map(({ allergys }: any) => {
            return AllergyActions.searchAllergysByQuerySuccess({
              allergys,
            });
          }),
          catchError((e) => {
            return of(AllergyActions.searchAllergysByQueryFailure());
          })
        );
      })
    )
  );
}
