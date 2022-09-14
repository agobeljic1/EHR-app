import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom, tap } from 'rxjs';
import { ConditionService } from 'src/app/services/condition.service';
import { ConditionActions } from '.';
import { EncounterSelectors } from '../encounter';

@Injectable()
export class ConditionEffects {
  constructor(
    private actions$: Actions,
    private conditionService: ConditionService,
    private store: Store,
    private snackBar: MatSnackBar
  ) {}

  conditions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConditionActions.loadConditions),
      withLatestFrom(
        this.store.select(EncounterSelectors.selectEncounterId as any)
      ),
      switchMap(([, encounterId]) => {
        return this.conditionService.getConditions(encounterId).pipe(
          map(({ conditions }: any) => {
            return ConditionActions.loadConditionsSuccess({
              conditions,
            });
          }),
          catchError(() => {
            return of(
              ConditionActions.loadConditionsFailure({
                message: 'Failed to load conditions',
              })
            );
          })
        );
      })
    )
  );

  createCondition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConditionActions.createCondition),
      withLatestFrom(
        this.store.select(EncounterSelectors.selectEncounterId as any)
      ),
      switchMap(([{ condition }, encounterId]) => {
        return this.conditionService
          .createCondition(condition, encounterId)
          .pipe(
            map(({ condition: createdCondition }: any) => {
              return ConditionActions.createConditionSuccess({
                condition: createdCondition,
                message: 'Successfully created condition',
              });
            }),
            catchError(() => {
              return of(
                ConditionActions.createConditionFailure({
                  message: 'Failed to create condition',
                })
              );
            })
          );
      })
    )
  );

  updateCondition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConditionActions.updateCondition),
      switchMap(({ condition }) => {
        return this.conditionService.updateCondition(condition).pipe(
          map(() => {
            return ConditionActions.updateConditionSuccess({
              message: 'Successfully updated condition',
            });
          }),
          catchError(() => {
            return of(
              ConditionActions.updateConditionFailure({
                message: 'Failed to update condition',
              })
            );
          })
        );
      })
    )
  );

  deleteCondition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConditionActions.deleteCondition),
      switchMap(({ condition }) => {
        return this.conditionService.deleteCondition(condition).pipe(
          map(() => {
            return ConditionActions.deleteConditionSuccess({
              message: 'Successfully deleted condition',
            });
          }),
          catchError(() => {
            return of(
              ConditionActions.deleteConditionFailure({
                message: 'Failed to delete condition',
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
        ConditionActions.createConditionSuccess,
        ConditionActions.updateConditionSuccess,
        ConditionActions.deleteConditionSuccess
      ),
      map(() => {
        return ConditionActions.loadConditions();
      })
    )
  );

  closeUpsertCondition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ConditionActions.createConditionSuccess,
        ConditionActions.updateConditionSuccess
      ),
      map(() => {
        return ConditionActions.closeUpsertCondition();
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        ConditionActions.loadConditionsFailure,
        ConditionActions.createConditionSuccess,
        ConditionActions.createConditionFailure,
        ConditionActions.updateConditionSuccess,
        ConditionActions.updateConditionFailure,
        ConditionActions.deleteConditionSuccess,
        ConditionActions.deleteConditionFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => ConditionActions.showMessageSuccess())
    )
  );
}
