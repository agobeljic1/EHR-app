import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, map, catchError, of, tap } from 'rxjs';
import { EncounterService } from 'src/app/services/encounter.service';
import { EncounterActions } from '.';

@Injectable()
export class EncounterEffects {
  constructor(
    private actions$: Actions,
    private encounterService: EncounterService,
    private router: Router,
    private store: Store,
    private snackBar: MatSnackBar
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
            return of(
              EncounterActions.loadEncountersFailure({
                message: 'Failed to load admissions',
              })
            );
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
            return EncounterActions.createEncounterSuccess({
              message: 'Successfully created admission',
            });
          }),
          catchError(() => {
            return of(
              EncounterActions.createEncounterFailure({
                message: 'Failed to create admission',
              })
            );
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
              message: 'Successfully updated admission',
            });
          }),
          catchError(() => {
            return of(
              EncounterActions.updateEncounterFailure({
                message: 'Failed to update admisson',
              })
            );
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
              message: 'Successfully deleted admission',
            });
          }),
          catchError(() => {
            return of(
              EncounterActions.deleteEncounterFailure({
                message: 'Failed to delete admission',
              })
            );
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
            return of(
              EncounterActions.loadEncounterByIdFromRouteFailure({
                message: 'Failed to load admission',
              })
            );
          })
        );
      })
    )
  );

  showEncounterDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.showEncounterDetails),
      tap(({ encounter }) =>
        this.router.navigate(['admissions', encounter.id])
      ),
      map(() => {
        return EncounterActions.showEncounterDetailsSuccess();
      })
    )
  );

  showEncounters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EncounterActions.deleteEncounterSuccess,
        EncounterActions.loadEncounterByIdFromRouteFailure
      ),
      tap(() => this.router.navigate(['admissions'])),
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

  dischargePatient$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.dischargePatient),
      switchMap(({ encounter }) => {
        return this.encounterService.dischargePatient(encounter).pipe(
          map(({ encounter }: any) => {
            return EncounterActions.dischargePatientSuccess({
              encounter,
              message: 'Successfully discharged patient',
            });
          }),
          catchError(() => {
            return of(
              EncounterActions.dischargePatientFailure({
                message: 'Failed to discharge patient',
              })
            );
          })
        );
      })
    )
  );

  showMessage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EncounterActions.loadEncountersFailure,
        EncounterActions.createEncounterSuccess,
        EncounterActions.createEncounterFailure,
        EncounterActions.updateEncounterSuccess,
        EncounterActions.updateEncounterFailure,
        EncounterActions.deleteEncounterSuccess,
        EncounterActions.deleteEncounterFailure,
        EncounterActions.loadEncounterByIdFromRouteFailure,
        EncounterActions.dischargePatientSuccess,
        EncounterActions.dischargePatientFailure
      ),
      tap(({ message }) => this.snackBar.open(message)),
      map(() => EncounterActions.showMessageSuccess())
    )
  );
}
