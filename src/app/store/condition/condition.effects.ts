import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, withLatestFrom } from 'rxjs';
import { Condition } from 'src/app/models/condition/Condition';
import { ConditionService } from 'src/app/services/condition.service';
import { ConditionActions } from '.';
import { EncounterActions, EncounterSelectors } from '../encounter';

@Injectable()
export class ConditionEffects {
  constructor(
    private actions$: Actions,
    private conditionService: ConditionService,
    private store: Store
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
            return of(ConditionActions.loadConditionsFailure());
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
              });
            }),
            catchError(() => {
              return of(ConditionActions.createConditionFailure());
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
            return ConditionActions.updateConditionSuccess();
          }),
          catchError(() => {
            return of(ConditionActions.updateConditionFailure());
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
            return ConditionActions.deleteConditionSuccess();
          }),
          catchError(() => {
            return of(ConditionActions.deleteConditionFailure());
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

  searchConditionsByQuery$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ConditionActions.searchConditionsByQuery),
      switchMap(({ query }) => {
        return this.conditionService.getConditions(query).pipe(
          map(({ conditions }: any) => {
            return ConditionActions.searchConditionsByQuerySuccess({
              conditions,
            });
          }),
          catchError((e) => {
            return of(ConditionActions.searchConditionsByQueryFailure());
          })
        );
      })
    )
  );
}
