import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, of, tap, first, filter } from 'rxjs';
import { EncounterService } from 'src/app/services/encounter.service';
import { EncounterActions } from '.';

@Injectable()
export class EncounterEffects {
  constructor(
    private actions$: Actions,
    private encounterService: EncounterService,
    private router: Router
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

  showEncounterDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.showEncounterDetails),
      tap(({ encounter }) =>
        this.router.navigate(['encounters', encounter.id])
      ),
      map(() => {
        return EncounterActions.showEncounterDetailsSuccess();
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

  loadEncounterUsersById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.loadEncounterUsersByIdFromRoute),
      switchMap(({ encounterId }) => {
        return this.encounterService.getEncounterUsersById(encounterId).pipe(
          map(({ users }: any) => {
            return EncounterActions.loadEncounterUsersByIdFromRouteSuccess({
              users,
              encounterId,
            });
          }),
          catchError(() => {
            return of(
              EncounterActions.loadEncounterUsersByIdFromRouteFailure()
            );
          })
        );
      })
    )
  );

  addUserToEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.addNewUserToEncounter),
      switchMap(({ encounter, user }) => {
        return this.encounterService
          .addNewUserToEncounter(encounter, user)
          .pipe(
            map(() => {
              return EncounterActions.addNewUserToEncounterSuccess({
                encounterId: encounter.id,
              });
            }),
            catchError(() => {
              return of(EncounterActions.addNewUserToEncounterFailure());
            })
          );
      })
    )
  );

  closeAddUserToEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.addNewUserToEncounterSuccess),
      map(() => {
        return EncounterActions.closeAddUserToEncounter();
      })
    )
  );

  removeUserFromEncounter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EncounterActions.removeUserFromEncounter),
      switchMap(({ encounter, user }) => {
        return this.encounterService
          .removeUserFromEncounter(encounter, user)
          .pipe(
            map(() => {
              return EncounterActions.removeUserFromEncounterSuccess({
                encounterId: encounter.id,
              });
            }),
            catchError(() => {
              return of(EncounterActions.removeUserFromEncounterFailure());
            })
          );
      })
    )
  );

  refetchEncounterUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        EncounterActions.removeUserFromEncounterSuccess,
        EncounterActions.addNewUserToEncounterSuccess
      ),
      map(({ encounterId }) => {
        return EncounterActions.loadEncounterUsersByIdFromRoute({
          encounterId,
        });
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
