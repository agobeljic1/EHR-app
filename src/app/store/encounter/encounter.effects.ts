import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, tap, withLatestFrom } from 'rxjs';
import { EncounterService } from 'src/app/services/encounter.service';
import { EncounterActions } from '.';
import { AuthSelectors } from '../auth';
import { PatientActions } from '../patient';

@Injectable()
export class EncounterEffects {
  constructor(
    private actions$: Actions,
    private encounterService: EncounterService,
    private router: Router,
    private store: Store
  ) {}

  encounters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.loadEncounters),
      switchMap(() => {
        return this.encounterService.getEncounters().pipe(
          map(({ encounters }: any) => {
            return EncounterActions.loadEncountersSuccess({
              encounters,
            });
          }),
          catchError(() => {
            return of(EncounterActions.loadEncountersFailure());
          })
        );
      })
    )
  );

  createEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.createEncounter),
      switchMap(({ encounter }) => {
        return this.encounterService.createEncounter(encounter).pipe(
          map(() => {
            return EncounterActions.createEncounterSuccess();
          }),
          catchError(() => {
            return of(EncounterActions.createEncounterFailure());
          })
        );
      })
    )
  );

  updateEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.updateEncounter),
      switchMap(({ encounter }) => {
        return this.encounterService.updateEncounter(encounter).pipe(
          map(() => {
            return EncounterActions.updateEncounterSuccess({
              encounterId: encounter.id,
            });
          }),
          catchError(() => {
            return of(EncounterActions.updateEncounterFailure());
          })
        );
      })
    )
  );

  deleteEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.deleteEncounter),
      switchMap(({ encounter }) => {
        return this.encounterService.deleteEncounter(encounter).pipe(
          map(() => {
            return EncounterActions.deleteEncounterSuccess({
              encounterId: encounter.id,
            });
          }),
          catchError(() => {
            return of(EncounterActions.deleteEncounterFailure());
          })
        );
      })
    )
  );

  refetch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.createEncounterSuccess),
      map(() => {
        return EncounterActions.loadEncounters();
      })
    )
  );

  closeUpsertEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EncounterActions.createEncounterSuccess,
        EncounterActions.updateEncounterSuccess
      ),
      map(() => {
        return EncounterActions.closeUpsertEncounter();
      })
    )
  );

  loadEncounterById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.loadEncounterByIdFromRoute),
      switchMap(({ encounterId }) => {
        return this.encounterService.getEncounterById(encounterId).pipe(
          map(({ encounter }: any) => {
            return EncounterActions.loadEncounterByIdFromRouteSuccess({
              encounter,
            });
          }),
          catchError(() => {
            return of(EncounterActions.loadEncounterByIdFromRouteFailure());
          })
        );
      })
    )
  );

  //Patient overview

  showPatientOverview$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.showPatientOverview),
      tap(({ encounter }) =>
        this.router.navigate(['patient-overview'], {
          queryParams: { encounterId: encounter.id },
        })
      ),
      map(() => {
        return EncounterActions.showPatientOverviewSuccess();
      })
    )
  );

  showEncounters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.deleteEncounterSuccess),
      tap(() => this.router.navigate(['encounters'])),
      map(() => {
        return EncounterActions.showEncountersSuccess();
      })
    )
  );

  refetchEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.updateEncounterSuccess),
      map(({ encounterId }) => {
        return EncounterActions.loadEncounterByIdFromRoute({
          encounterId,
        });
      })
    )
  );
}
